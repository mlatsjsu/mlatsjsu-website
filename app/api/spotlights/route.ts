import { isAuthorizedAdmin } from '@/lib/auth-admin';
import cloudinary from '@/lib/cloudinary';
import pool, { getSpotlights } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { rows } = await getSpotlights();
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
    const images = form.getAll('images');
    const urls = await Promise.all(
      images.map(async (base64Image) => {
        const img = await cloudinary.uploader.upload(base64Image as string);
        return img.secure_url;
      }),
    );
    const { rows } = await pool.query(
      `
        INSERT INTO spotlights (title, images) VALUES ($1, $2) RETURNING *;
      `,
      [title, urls],
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
