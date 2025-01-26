import { getSessionUserId } from '@/lib/auth-user';
import pool from '@/lib/db';

export async function DELETE(
  request: Request,
  { params }: { params: { comment_id: string } },
) {
  try {
    const userId = await getSessionUserId();
    if (userId === null || userId === undefined) {
      throw new Error('Unauthorized');
    }

    const commentId = params.comment_id;

    // Check if the comment exists and if the user is the author
    const commentResult = await pool.query(
      'SELECT user_id, post_id FROM comments WHERE id = $1',
      [commentId],
    );

    if (commentResult.rows.length === 0) {
      throw new Error('Comment not found');
    }

    const comment = commentResult.rows[0];
    if (comment.user_id !== userId) {
      throw new Error('Unauthorized');
    }

    const postId = commentResult.rows[0].post_id;

    // Delete the comment, update comment_count
    await pool.query('DELETE FROM comments WHERE id = $1', [commentId]);
    await pool.query(
      'UPDATE posts SET comment_count = comment_count - 1 WHERE id = $1',
      [postId],
    );

    return new Response(
      JSON.stringify({
        comment_id: commentId,
        message: 'Comment deleted successfully',
      }),
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return Response.json({ error: error.message }, { status: 401 });
    }
    if (error instanceof Error && error.message === 'Comment not found') {
      return Response.json({ error: error.message }, { status: 404 });
    }
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
    return Response.json({ error: error }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { comment_id: string } },
) {
  try {
    const userId = await getSessionUserId();
    if (userId === null || userId === undefined) {
      throw new Error('Unauthorized');
    }

    const commentId = params.comment_id;

    const { content } = await request.json();
    if (!content || content.trim().length === 0) {
      throw new Error('Content is required');
    }

    // Check if the comment exists and if the user is the author
    const commentResult = await pool.query(
      'SELECT user_id FROM comments WHERE id = $1',
      [commentId],
    );

    if (commentResult.rows.length === 0) {
      throw new Error('Comment not found');
    }

    const comment = commentResult.rows[0];
    if (comment.user_id !== userId) {
      throw new Error('Unauthorized');
    }

    // Update the comment
    await pool.query('UPDATE comments SET content = $1 WHERE id = $2', [
      content,
      commentId,
    ]);

    return new Response(
      JSON.stringify({ message: 'Comment updated successfully' }),
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return Response.json({ error: error.message }, { status: 401 });
    }
    if (error instanceof Error && error.message === 'Content is required') {
      return Response.json({ error: error.message }, { status: 400 });
    }
    if (error instanceof Error && error.message === 'Comment not found') {
      return Response.json({ error: error.message }, { status: 404 });
    }
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
    return Response.json({ error: error }, { status: 500 });
  }
}

