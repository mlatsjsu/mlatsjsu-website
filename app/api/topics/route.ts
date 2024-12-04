import pool from '@/lib/db';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const lim = parseInt(url.searchParams.get('limit') || '5');
    const page = parseInt(url.searchParams.get('page') || '0'); //added for pagination

    //Query
    const queryText =
      'SELECT * FROM topics T ORDER BY T.post_count DESC LIMIT $1 OFFSET $2;';
    const queryParams = [lim, page * lim];
    const { rows } = await pool.query(queryText, queryParams);

    if (rows.length === 0) {
      throw new Error('No Topics Found');
    }

    const qText = 'SELECT COUNT(*) FROM topics T';
    const { rows: row_count } = await pool.query(qText, []);
    console.log(row_count);

    return Response.json({
      posts: rows,
      page: page,
      total_pages: Math.ceil(row_count[0].count / lim),
    });
  } catch (error) {
    if (error instanceof Error) {
      const status = error.message === 'No Topics Found' ? 404 : 500;
      return Response.json({ error: error.message }, { status });
    }
    return Response.json({ error: error }, { status: 500 });
  }
}
