import pool from '@/lib/db';
import { getSessionUserId } from '@/lib/auth-user';

// Async GET function to retrieve reading list
export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    // Validate user ID
    const id = params.id;
    if (!id || isNaN(parseInt(id)) || parseInt(id).toString() !== id) {
      throw new Error('Invalid ID 400');
    }
    const user_id = await getSessionUserId();
    if (user_id === null) {
      throw new Error('User ID not found 404');
    }
    if (user_id !== parseInt(id)) {
      throw new Error('Unauthorized User ID 401');
    }

    // Retrieve limit and page from the URL
    const url = new URL(req.url);
    const rawLimit = parseInt(url.searchParams.get('limit') || '10');
    const rawPage = parseInt(url.searchParams.get('page') || '1');

    // Enforce bounds
    const limit = Math.min(Math.max(rawLimit, 1), 100); // Between 1 and 100
    const page = Math.max(rawPage, 1); // Minimum page is 1
    const offset = (page - 1) * limit;

    if (isNaN(rawLimit) || isNaN(rawPage)) {
      throw new Error('Invalid limit or page 400');
    }

    // Retrieve reading list for the authenticated user
    const readingList: { rows: { post_id: string }[] } = await pool.query(
      'SELECT post_id FROM reading_lists WHERE user_id = $1 LIMIT $2 OFFSET $3;',
      [user_id, limit, offset]
    );

    if (!readingList.rows.length) {
      throw new Error('Reading list empty 404');
    }

    // Calculate total pages based on the total number of records
    const totalRecords: { rows: { count: string }[] } = await pool.query(
      'SELECT COUNT(*) FROM reading_lists WHERE user_id = $1;',
      [user_id]
    );
    const totalPages: number = Math.ceil(parseInt(totalRecords.rows[0].count) / limit);

    return new Response(JSON.stringify({
      reading_list: readingList.rows.map(row => row.post_id),
      page: page,
      total_pages: totalPages
    }), { status: 200 });
  }
  
  catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case 'Invalid ID 400':
        case 'Invalid limit or page 400':
          return new Response(JSON.stringify({ error: 'Bad Request' }), { status: 400 });
        case 'Unauthorized User ID 401':
          return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        case 'User ID not found 404':
        case 'Reading list empty 404':
          return new Response(JSON.stringify({ error: 'Not Found' }), { status: 404 });
        default:
          return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
      }
    }
  }
}