import { getServerSession } from 'next-auth';
import { authOptions } from './auth-options';
import pool from './db';

export const getSessionUserId = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return undefined; // undefined if user not logged in
  }
  const { rows } = await pool.query(
    `
      SELECT id FROM users WHERE email = $1;
    `,
    [session.user.email],
  );
  if (rows.length === 0) {
    return null; // null if user doesn't exist
  }
  return rows[0].id as number; // user id otherwise
};
