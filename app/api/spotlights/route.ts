import cloudinary from '@/lib/cloudinary';
import pool, { getSpotlights } from '@/lib/db';
import { getServerSession } from 'next-auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { rows } = await getSpotlights();
    return Response.json({ rows: rows.map(({ pos, ...rest }) => rest) });
  } catch (error) {
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
      return Response.json({ error }, { status: 401 });
    }
    return Response.json({ error }, { status: 500 });
  }
}
