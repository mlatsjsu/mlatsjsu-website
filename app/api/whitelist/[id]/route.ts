import pool from '@/lib/db';
import { getServerSession } from 'next-auth';

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession();

    if (!session) {
      throw new Error('Unauthorized');
    }

    const id = params.id;

    const { rows } = await pool.query(
      `
        DELETE FROM whitelist WHERE id = $1 RETURNING *;
      `,
      [id],
    );

    return Response.json({ rows });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return Response.json({ error: error.message }, { status: 401 });
    }
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
