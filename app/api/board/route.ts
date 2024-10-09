import { isAuthorizedAdmin } from '@/lib/auth-admin';
import cloudinary from '@/lib/cloudinary';
import pool, { getBoard } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { rows } = await getBoard();
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
    const name = form.get('name');
    const role = form.get('role');
    const linkedin = form.get('linkedin');
    const image = form.get('image');
    const img = await cloudinary.uploader.upload(image as string);
    const url = img.secure_url;
    const { rows } = await pool.query(
      `
        INSERT INTO board (name, role, linkedin, image) VALUES ($1, $2, $3, $4) RETURNING *;
      `,
      [name, role, linkedin, url],
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
