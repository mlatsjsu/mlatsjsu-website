import pool from '@/lib/db';
import { getServerSession } from 'next-auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session) {
      throw new Error('Unauthorized');
    }

    const { rows } = await pool.query(`
      SELECT * FROM whitelist;
    `);
    return Response.json({ rows });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return Response.json({ error }, { status: 401 });
    }
    return Response.json({ error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();

    if (!session) {
      throw new Error('Unauthorized');
    }

    const form = await req.formData();
    const email = form.get('email');
    const { rows } = await pool.query(
      `
        INSERT INTO whitelist (email) VALUES ($1) RETURNING *;
      `,
      [email],
    );
    return Response.json({ rows });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return Response.json({ error }, { status: 401 });
    }
    return Response.json({ error }, { status: 500 });
  }
}
