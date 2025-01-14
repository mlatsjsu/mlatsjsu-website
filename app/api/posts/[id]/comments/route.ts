import { getSessionUserId } from '@/lib/auth-user';
import pool from '@/lib/db';

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const userId = await getSessionUserId();
    if (userId === null || userId === undefined) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
      });
    }

    const { comment } = await request.json();

    if (!comment || comment.trim().length === 0) {
      return new Response(JSON.stringify({ error: 'Comment text is empty' }), {
        status: 400,
      });
    }

    const postId = params.id;
    if (!postId || postId === '') {
      return new Response(JSON.stringify({ error: 'Valid post ID is required' }), {
        status: 400,
      });
    }

    const postResult = await pool.query('SELECT id FROM posts WHERE id = $1', [
      postId,
    ]);
    if (postResult.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Post not found' }), {
        status: 404,
      });
    }

    const { rows } = await pool.query(
      `
        INSERT INTO comments (content, user_id, post_id) 
        VALUES ($1, $2, $3) 
        RETURNING id AS comment_id, content, user_id, post_id, created_at;
      `,
      [comment, userId, postId],
    );
    
    await pool.query('UPDATE posts SET comment_count = comment_count + 1 WHERE id = $1', [postId]);

    return new Response(
      JSON.stringify({
        comment_id: rows[0].comment_id,
        content: rows[0].content,
        user_id: rows[0].user_id,
        post_id: rows[0].id,
        created_at: rows[0].created_at,
        message: 'Comment added successfully',
      }),
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
    return Response.json({ error: error }, { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const userId = await getSessionUserId();
    if (userId === null || userId === undefined) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
      });
    }

    const postId = params.id;

    if (!postId || postId === '') {
      return new Response(JSON.stringify({ error: 'Valid post ID is required' }), {
        status: 400,
      });
    }

    const postResult = await pool.query('SELECT id FROM posts WHERE id = $1', [
      postId,
    ]);
    if (postResult.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Post not found' }), {
        status: 404,
      });
    }

    const commentsResult = await pool.query(
      `
      SELECT 
        c.id AS comment_id, 
        c.content, 
        c.user_id, 
        c.post_id, 
        c.created_at, 
        u.name AS user_name 
      FROM comments c
      LEFT JOIN users u ON c.user_id = u.id
      WHERE c.post_id = $1
      ORDER BY c.created_at DESC;
      `,
      [postId],
    );

    return new Response(JSON.stringify({ comments: commentsResult.rows }), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
    return Response.json({ error: error }, { status: 500 });
  }
}
