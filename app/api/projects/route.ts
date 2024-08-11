import cloudinary from '@/lib/cloudinary';
import pool, { getProjects } from '@/lib/db';
import { getServerSession } from 'next-auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { rows } = await getProjects();
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
    const description = form.get('description');
    const image = form.get('image');
    const img = await cloudinary.uploader.upload(image as string);
    const url = img.secure_url;
    const { rows } = await pool.query(
      `
        INSERT INTO projects (title, description, image) VALUES ($1, $2, $3) RETURNING *;
      `,
      [title, description, url],
    );
    return Response.json({ rows });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return Response.json({ error }, { status: 401 });
    }
    return Response.json({ error }, { status: 500 });
  }
}
