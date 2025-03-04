import pool from '@/lib/db';
import { getSessionUserId } from '@/lib/auth-user';

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const follower_id = await getSessionUserId();
    if (follower_id === null || follower_id === undefined) {
      throw new Error('Unauthorized');
    }
    const target_user_id = params.id;

    const targetUserResult = await pool.query(
      'SELECT id FROM users WHERE id = $1',
      [target_user_id],
    );

    if (targetUserResult.rows.length === 0) {
      throw new Error('Target user not found');
    }

    // Check whether the user is following the target user or not
    const followResult = await pool.query(
      'SELECT * FROM follows WHERE follower_id = $1 AND following_id = $2',
      [follower_id, target_user_id],
    );

    let message;
    let followerCount;

    if (followResult.rows.length > 0) {
      // Unfollow the user
      await pool.query(
        'DELETE FROM follows WHERE follower_id = $1 AND following_id = $2',
        [follower_id, target_user_id],
      );
      message = 'Unfollowed user';

      await pool.query(
        'UPDATE users SET follower_count = follower_count - 1 WHERE id = $1',
        [target_user_id],
      );
    } else {
      // Follow the user
      await pool.query(
        'INSERT INTO follows (follower_id, following_id) VALUES ($1, $2)',
        [follower_id, target_user_id],
      );
      message = 'Followed user';

      await pool.query(
        'UPDATE users SET follower_count = follower_count + 1 WHERE id = $1',
        [target_user_id],
      );
    }

    const followerCountResult = await pool.query(
      'SELECT follower_count FROM users WHERE id = $1',
      [target_user_id],
    );
    followerCount = followerCountResult.rows[0].follower_count;

    return new Response(
      JSON.stringify({
        message,
        follower_count: followerCount,
      }),
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return Response.json({ error: error.message }, { status: 401 });
    }
    if (error instanceof Error && error.message === 'Target user not found') {
      return Response.json({ error: error.message }, { status: 404 });
    }
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
    return Response.json({ error: error }, { status: 500 });
  }
}
