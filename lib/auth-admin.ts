import { getServerSession } from 'next-auth';
import pool from './db';

export const isAuthorizedAdmin = async () => {
  const session = await getServerSession();
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
