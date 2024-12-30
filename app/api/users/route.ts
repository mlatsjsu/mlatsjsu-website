import pool from '@/lib/db';

export async function GET(request: Request) {
    try {

        const url = new URL(request.url);
        const query = url.searchParams.get('query') || '';
        const limit = Number(url.searchParams.get('limit') || 10);
        const page = Number(url.searchParams.get('page') || 1);
        const type = url.searchParams.get('type') || 'recommended';
        const topics = url.searchParams.getAll('topics');
        const author_id = url.searchParams.get('author_id') || null;
        const offset = (page - 1) * limit;

        let queryText = `
            SELECT 
                id, 
                name, 
                image, 
                bio, 
                link, 
                follower_count, 
                following_count 
            FROM users
        `;
        const queryParams: any[] = [];
        const whereClauses = [];

        if (query) {
            queryParams.push(`%${query}%`);
            whereClauses.push(`(name ILIKE $${queryParams.length} OR bio ILIKE $${queryParams.length})`);
        }

        if (topics.length > 0) {
            queryParams.push(topics);
            whereClauses.push(`id IN (SELECT user_id FROM users_topics WHERE topic_name = ANY($${queryParams.length}))`);
        }

        if (type === 'followers' && author_id) {
            queryParams.push(author_id);
            whereClauses.push(`id IN (SELECT follower_id FROM follows WHERE following_id = $${queryParams.length})`);
        } else if (type === 'following' && author_id) {
            queryParams.push(author_id);
            whereClauses.push(`id IN (SELECT following_id FROM follows WHERE follower_id = $${queryParams.length})`);
        } else if ((type === 'followers' || type === 'following') && !author_id) {
            throw new Error('missing_author_id');
        }

        if (whereClauses.length > 0) {
            queryText += ' WHERE ' + whereClauses.join(' AND ');
        }

        if (type === 'recommended') {
            queryText += ` ORDER BY follower_count DESC, following_count DESC`;
        }

        queryParams.push(limit, offset);
        queryText += ` LIMIT $${queryParams.length - 1} OFFSET $${queryParams.length};`;

        const { rows } = await pool.query(queryText, queryParams);

        return new Response(JSON.stringify({ users: rows.length > 0 ? rows : null }), { status: 200 });
    } catch (error) {
        if (error instanceof Error && error.message === 'missing_author_id') {
            return new Response(JSON.stringify({ error: 'author_id is required for followers/following type' }), { status: 400 });
        }
        if (error instanceof Error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }
        return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), { status: 500 });
    }
}
