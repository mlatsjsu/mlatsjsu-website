import { isAuthorizedAdmin } from '@/lib/auth-admin';
import pool, { getLearningResources } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { rows } = await getLearningResources();
    return Response.json({ rows: rows.map(({ pos, ...rest }) => rest) });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
    return Response.json({ error: error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const authorized = await isAuthorizedAdmin();

    if (!authorized) {
      throw new Error('Unauthorized');
    }

    const form = await req.formData();
    const title = form.get('title');
    const link = form.get('link');
    const { rows } = await pool.query(
      `
        INSERT INTO learning_resources (title, link) VALUES ($1, $2) RETURNING *;
      `,
      [title, link],
    );
    return Response.json({ rows });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return Response.json({ error: error.message }, { status: 401 });
    }
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
    return Response.json({ error: error }, { status: 500 });
  }
}
