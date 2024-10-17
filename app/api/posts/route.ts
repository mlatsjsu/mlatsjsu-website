import pool from '@/lib/db';

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const query = url.searchParams.get('query') || '';
        const limit = parseInt(url.searchParams.get('limit') || '10');
        const page = parseInt(url.searchParams.get('page') || '1');
        const type = url.searchParams.get('type') || null;
        const topics = url.searchParams.getAll('topics[]');
        const authorIds = url.searchParams.getAll('author_ids[]');

        const offset = (page - 1) * limit;

        let queryText = `
            SELECT post_id, title, subtitle, author_id, author_name, content_url, topics, header_img, engagement_count, created_at, updated_at
            FROM posts
            WHERE (title ILIKE $1 OR subtitle ILIKE $1 OR content_url ILIKE $1)
        `;

        const queryParams: any[] = [`%${query}%`];

        if (type) {
            queryText += ' AND type = $' + (queryParams.length + 1);
            queryParams.push(type);
        }

        if (topics.length > 0) {
            queryText += ' AND topics && $' + (queryParams.length + 1);
            queryParams.push(topics);
        }

        if (authorIds.length > 0) {
            queryText += ' AND author_id = ANY($' + (queryParams.length + 1) + ')';
            queryParams.push(authorIds);
        }

        queryText += ` ORDER BY created_at DESC LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2};`;
        queryParams.push(limit, offset);

        const { rows } = await pool.query(queryText, queryParams);

        return Response.json({ posts: rows });
    } catch (error) {
        if (error instanceof Error) {
            return Response.json({ error: error.message }, { status: 500 });
        }
        return Response.json({ error: error }, { status: 500 });
    }
}
