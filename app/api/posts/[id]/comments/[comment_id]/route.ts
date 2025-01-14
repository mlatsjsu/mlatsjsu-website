import { getSessionUserId } from '@/lib/auth-user';
import pool from '@/lib/db';

export async function DELETE(
  request: Request,
  { params }: { params: { comment_id: string } },
) {
  try {
    const userId = await getSessionUserId();
    if (userId === null || userId === undefined) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
      });
    }

    const commentId = params.comment_id;
    if (!commentId || commentId === '') {
      return new Response(JSON.stringify({ error: 'Comment ID is required' }), { status: 400 });
    }

    const commentResult = await pool.query(
      'SELECT user_id, post_id FROM comments WHERE id = $1',
      [commentId]
    );

    if (commentResult.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Comment not found' }), { status: 404 });
    }

    const comment = commentResult.rows[0];
    if (comment.user_id !== userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const postId = commentResult.rows[0].post_id;

    await pool.query('DELETE FROM comments WHERE id = $1', [commentId]);
    await pool.query('UPDATE posts SET comment_count = comment_count - 1 WHERE id = $1', [postId]);

    return new Response(JSON.stringify({
      comment_id: commentId,
      message: 'Comment deleted successfully'
    }), { status: 200 });
  } catch (error) {
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
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
      });
    }

    const commentId = params.comment_id;
    if (!commentId || commentId === '') {
      return new Response(JSON.stringify({ error: 'Comment ID is required' }), { status: 400 });
    }

    const { content } = await request.json();
    if (!content || content.trim().length === 0) {
      return new Response(JSON.stringify({ error: 'Content is required' }), { status: 400 });
    }

    // Check if the comment exists and if the user is the author
    const commentResult = await pool.query(
      'SELECT user_id FROM comments WHERE id = $1',
      [commentId]
    );

    if (commentResult.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Comment not found' }), { status: 404 });
    }

    const comment = commentResult.rows[0];
    if (comment.user_id !== userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    // Update the comment
    await pool.query(
      'UPDATE comments SET content = $1 WHERE id = $2',
      [content, commentId]
    );

    return new Response(JSON.stringify({ message: 'Comment updated successfully' }), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
    return Response.json({ error: error }, { status: 500 });
  }
}