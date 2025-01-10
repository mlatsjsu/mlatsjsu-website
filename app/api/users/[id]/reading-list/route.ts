import { getServerSession } from 'next-auth';
import pool from '@/lib/db';
import { Session } from 'next-auth';

// Extend the Session type to include google_id
declare module 'next-auth' {
  interface Session {
    google_id: string;
  }
}

// Async GET function to retrieve reading list
export async function GET(req: Request) {
  try {
    const session = await getServerSession();

    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const user_id: string = session.google_id;
    const url = new URL(req.url);
    const limit: number = parseInt(url.searchParams.get('limit') as string) || 10;
    const page: number = parseInt(url.searchParams.get('page') as string) || 1;
    const offset: number = (page - 1) * limit;

    // Retrieve reading list for the authenticated user
    const readingList: { rows: { post_id: string }[] } = await pool.query(
      'SELECT post_id FROM reading_list WHERE user_id = $1 LIMIT $2 OFFSET $3',
      [user_id, limit, offset]
    );

    if (!readingList.rows.length) {
      return new Response(JSON.stringify({ error: 'Reading list empty or user not found' }), { status: 404 });
    }

    const totalRecords: { rows: { count: string }[] } = await pool.query(
      'SELECT COUNT(*) FROM reading_list WHERE user_id = $1',
      [user_id]
    );
    const totalPages: number = Math.ceil(parseInt(totalRecords.rows[0].count) / limit);

    return new Response(JSON.stringify({
      reading_list: readingList.rows.map(row => row.post_id),
      page: page,
      total_pages: totalPages
    }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}