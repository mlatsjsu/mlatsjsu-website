import pool from '@/lib/db';

export async function GET(
    _req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        const { rows } = await pool.query(
            `
            SELECT post_id, title, subtitle, author_id, author_name, content_url, topics, header_img, engagement_count, created_at, updated_at
            FROM posts
            WHERE post_id = $1;
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
