import pool from '@/lib/db';

export async function GET(
    _req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        const { rows } = await pool.query(
            `
            SELECT 
                p.id AS post_id, 
                p.title, 
                p.subtitle, 
                p.user_id, 
                u.name AS author_name, 
                p.content_url, 
                array_agg(pt.topic_name) AS topics, 
                p.like_count, 
                p.comment_count, 
                p.published_at AS created_at
            FROM posts p
            LEFT JOIN users u ON p.user_id = u.id            
            LEFT JOIN posts_topics pt ON p.id = pt.post_id
            WHERE p.id = $1
            GROUP BY p.id, u.name;
      `,
            [id]
        );

        if (rows.length === 0) {
            return Response.json({ error: 'Post not found' }, { status: 404 });
        }

        return Response.json({ post: rows[0] });
    } catch (error) {
        if (error instanceof Error) {
            return Response.json({ error: error.message }, { status: 500 });
        }
        return Response.json({ error: error }, { status: 500 });
    }
}
