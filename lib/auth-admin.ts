import { getServerSession } from 'next-auth';
import pool from './db';
import { authOptions } from './auth-options';

export const isAuthorizedAdmin = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return false;
  }
  const { rows } = await pool.query(
    `
      SELECT * FROM whitelist WHERE email = $1;
    `,
    [session.user.email],
  );
  if (rows.length === 0) {
    return false;
  }
  return true;
};
