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
    if (!id || !/^[0-9]+$/.test(id)) {
        throw new Error('Invalid ID 400');
    }
    const user_id = await getSessionUserId();
    if (user_id === null ) {
      throw new Error("User ID not found 404");
    }

    if (user_id === undefined || user_id !== parseInt(id)) {
      throw new Error("Unauthorized User ID 401");
    }

    // Retrieve limit and page from the URL
    const url = new URL(req.url);
    const limit: number = parseInt(url.searchParams.get('limit') as string) || 10;
    const page: number = parseInt(url.searchParams.get('page') as string) || 1;
    const offset: number = (page - 1) * limit;

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
    if (error instanceof Error && error.message === 'Invalid ID 400') {
      return new Response(JSON.stringify({error: 'Bad Request' }), {status: 400} );
    }
    if (error instanceof Error && error.message === 'Unauthorized User ID 401') {
      return new Response(JSON.stringify({error: 'Unauthorized' }), {status: 401} );
    }
    if (error instanceof Error && error.message === 'User ID not found 404') {
      return new Response(JSON.stringify({error: 'User not found' }), {status: 404} );
    }
    if (error instanceof Error && error.message === 'Reading list empty 404') {
      return new Response(JSON.stringify({error: 'Reading list empty' }), {status: 404} );
    }
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}