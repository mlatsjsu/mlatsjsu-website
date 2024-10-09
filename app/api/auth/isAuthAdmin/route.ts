import { isAuthorizedAdmin } from '@/lib/auth-admin';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const authorized = await isAuthorizedAdmin();
    if (!authorized) {
      return Response.json({ authorized: false });
    }
    return Response.json({ authorized: true });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
    return Response.json({ error: error }, { status: 500 });
  }
}
