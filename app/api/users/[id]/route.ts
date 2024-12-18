import pool from '@/lib/db';

export async function GET(
    _req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        if (!id || !/^[0-9]+$/.test(id)) {
            throw new Error('invalid_id');
        }

        const { rows } = await pool.query(
            `
            SELECT 
                id, 
                name, 
                image, 
                bio, 
                link, 
                follower_count, 
                following_count 
            FROM users
            WHERE id = $1;
            `,
            [id]
        );

        if (rows.length === 0) {
            throw new Error('user_not_found');
        }

        return new Response(JSON.stringify({ user: rows[0] }), { status: 200 });
    } catch (error) {
        if (error instanceof Error && error.message === 'invalid_id') {
            return new Response(JSON.stringify({ error: 'Invalid user ID format' }), { status: 400 });
        }
        if (error instanceof Error && error.message === 'user_not_found') {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }
        if (error instanceof Error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }
        return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), { status: 500 });
    }
}
