import pool from '@/lib/db';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const lim = parseInt(url.searchParams.get('limit') || '5');
    const page = parseInt(url.searchParams.get('page') || '0'); //added for pagination

    //Query
    const query_text =
      'SELECT * FROM posts P ORDER BY P.like_count DESC LIMIT $1 OFFSET $2;';
    const query_params = [lim, page * lim];
    const { rows } = await pool.query(query_text, query_params);

    if (rows.length == 0) {
      return Response.json({ message: 'No Posts Available' }, { status: 404 });
    }

    const q_text = 'SELECT COUNT(*) FROM posts P';
    const { rows: row_count } = await pool.query(q_text, []);
    console.log(row_count);

    return Response.json({
      posts: rows,
      page: page,
      total_pages: Math.ceil(row_count[0].count / lim),
    });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
    return Response.json({ error: error }, { status: 500 });
  }
}