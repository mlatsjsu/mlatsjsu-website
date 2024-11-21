import { getSessionUserId } from '@/lib/auth-user';
import pool from '@/lib/db';

export async function GET(request: Request) {
    try {
      const userId = await getSessionUserId();
  
      if (userId === undefined) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
      }
  
      if (userId === null) {
        return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
      }
  
      const url = new URL(request.url);
      const query = url.searchParams.get('query') || '';
      const id = url.searchParams.get('id'); // Get the id query parameter
      const limit = Number(url.searchParams.get('limit') || 10);
      const page = Number(url.searchParams.get('page') || 1);
      const type = url.searchParams.get('type') || '';
      const topics = url.searchParams.getAll('topics[]');
      const author_ids = url.searchParams.getAll('author_ids[]');
      const offset = (page - 1) * limit;
  
      let queryText = `
        SELECT 
          p.id AS post_id, 
          p.title, 
          p.subtitle, 
          p.user_id,                    
          u.name AS author_name, 
          p.content_url, 
          array_agg(pt.topic_name) AS topics, 
          p.like_count, 
          p.comment_count, 
          p.published_at AS created_at
        FROM posts p
        LEFT JOIN users u ON p.user_id = u.id          
        LEFT JOIN posts_topics pt ON p.id = pt.post_id
      `;
  
      const queryParams: any[] = [];
      const whereClauses = [];
  
      if (id) {
        queryParams.push(id);
        whereClauses.push(`p.id = $${queryParams.length}`);
      }

      if (query) {
        queryParams.push(`%${query}%`);
        whereClauses.push(`(p.title ILIKE $${queryParams.length} OR p.subtitle ILIKE $${queryParams.length} OR p.content_url ILIKE $${queryParams.length})`);
      }
  
      if (type === 'my_feed') {
        queryParams.push(userId);
        whereClauses.push(`p.user_id IN (SELECT following_id FROM follows WHERE follower_id = $${queryParams.length})`);
      } else if (type === 'author_posts' && author_ids.length > 0) {
        queryParams.push(author_ids);
        whereClauses.push(`p.user_id = ANY($${queryParams.length})`);
      } else if (type === 'author_drafts') {
        whereClauses.push(`p.user_id = $${queryParams.length + 1} AND p.is_published = FALSE`);
        queryParams.push(userId);
      }
  
      if (topics.length > 0) {
        queryParams.push(topics);
        whereClauses.push(`p.id IN (SELECT post_id FROM posts_topics WHERE topic_name = ANY($${queryParams.length}))`);
      }
  
      if (whereClauses.length > 0) {
        queryText += ' WHERE ' + whereClauses.join(' AND ');
      }
  
      queryText += ` GROUP BY p.id, u.name`;
  
      if (type === 'trending') {
        queryText += ' ORDER BY p.like_count DESC, p.comment_count DESC';
      } else {
        queryText += ' ORDER BY p.published_at DESC';
      }
  
      queryParams.push(limit, offset);
      queryText += ` LIMIT $${queryParams.length - 1} OFFSET $${queryParams.length};`;
  
      const { rows } = await pool.query(queryText, queryParams);
  
      return new Response(JSON.stringify({ posts: rows.length > 0 ? rows : null }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }), { status: 500 });
    }
  }
  