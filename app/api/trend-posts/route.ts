import pool from '@/lib/db';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const lim = parseInt(url.searchParams.get('limit') || '5');

    //Query
    const queryText =
      'SELECT * FROM posts P ORDER BY P.like_count DESC LIMIT $1;';
    const queryParams = [lim];
    const { rows } = await pool.query(queryText, queryParams);

    if (rows.length == 0) {
      return Response.json({ message: 'No Posts Available' }, { status: 404 });
    }

    return Response.json({ posts: rows });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
    return Response.json({ error: error }, { status: 500 });
  }
}
