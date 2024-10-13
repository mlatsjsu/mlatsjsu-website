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
    console.log('board post');
    const authorized = await isAuthorizedAdmin();
    console.log('defined authorized');

    if (!authorized) {
      console.log('unauthorized');
      throw new Error('Unauthorized');
    }
    console.log('after authorization');

    const form = await req.formData();
    console.log('got form data');
    const name = form.get('name');
    console.log('got name');
    const role = form.get('role');
    console.log('got role');
    const linkedin = form.get('linkedin');
    console.log('got linkedin');
    const image = form.get('image');
    console.log('got image');
    console.log('uploading image');
    const img = await cloudinary.uploader.upload(image as string);
    console.log('uploaded image');
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
