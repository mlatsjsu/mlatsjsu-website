import { getSessionUserId } from '@/lib/auth-user';
import pool from '@/lib/db';

export async function POST(
  request: Request,
  { params }: { params: { post_id: string } },
) {
  try {
    //authentification, also gets userId var
    const userId = await getSessionUserId();
    if (userId === null || userId === undefined) {
      // error
      throw new Error('Unauthorized');
    }

    // Parse request body to get comment data
    const { commentText } = await request.json();

    // Validate the commentText
    if (!commentText || commentText.trim().length === 0) {
      throw new Error('ERROR: Comment text is empty');
    }

    const postId = params.post_id;
    if (!postId || postId == '') {
      //do i need to validate
      throw new Error('ERROR: PostID not found');
    }

    const commentId = ''; //where is this coming from
    const queryText =
      'INSERT INTO comments(user_id, post_id, context, comment_ref_id) VALUES ($1, $2, $3, $4) RETURNING comment_ref_id';
    const queryParams = [userId, postId, commentText, commentId];
    const { rows } = await pool.query(queryText, queryParams);

    return Response.json({
      comment_ref_id: rows[0].comment_ref_id,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      }),
      { status: 500 },
    );
  }
}
