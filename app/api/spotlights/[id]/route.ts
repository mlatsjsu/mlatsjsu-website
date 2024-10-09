import { isAuthorizedAdmin } from '@/lib/auth-admin';
import cloudinary from '@/lib/cloudinary';
import pool from '@/lib/db';

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const authorized = await isAuthorizedAdmin();

    if (!authorized) {
      throw new Error('Unauthorized');
    }

    const id = params.id;
    const { rows } = await pool.query(
      `
        DELETE FROM spotlights WHERE id = $1 RETURNING *;
      `,
      [id],
    );
    const ids = rows[0].images.map((image: string) => {
      const public_id = image.split('/').pop()?.split('.')[0];
      return public_id;
    });
    await Promise.all(
      ids.forEach(async (id: string) => {
        await cloudinary.uploader.destroy(id);
      }),
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
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const authorized = await isAuthorizedAdmin();

    if (!authorized) {
      throw new Error('Unauthorized');
    }

    const id = params.id;
    const { beforeId, afterId } = await req.json();
    const { rows } = await pool.query(
      `
        UPDATE spotlights
        SET pos = (
          SELECT
            CASE
              WHEN b.id IS NULL AND a.id IS NULL THEN s.pos -- If both are NULL, no change
              WHEN b.id IS NULL THEN a.pos / 2.0          -- Only afterId found
              WHEN a.id IS NULL THEN b.pos + 1.0          -- Only beforeId found
              ELSE (b.pos + a.pos) / 2.0                  -- Both ids found
            END
          FROM spotlights AS s
            LEFT JOIN spotlights AS b ON b.id = $2
            LEFT JOIN spotlights AS a ON a.id = $3
          WHERE s.id = $1
        )
        WHERE id = $1
        RETURNING *;
      `,
      [id, beforeId, afterId],
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
