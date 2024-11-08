import { getSessionUserId } from '@/lib/auth-user';
import pool from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const userId = await getSessionUserId();

        if (userId === undefined) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (userId === null) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { query, limit = 10, page = 1, type, topics = [], author_ids = [] } = req.query;
        const offset = (Number(page) - 1) * Number(limit);

        let queryText = `
      SELECT 
        p.post_id, 
        p.title, 
        p.subtitle, 
        p.author_id, 
        u.name AS author_name, 
        p.content_url, 
        array_agg(pt.topic_name) AS topics, 
        p.header_img, 
        p.engagement_count, 
        p.created_at, 
        p.updated_at
      FROM posts p
      LEFT JOIN users u ON p.author_id = u.id
      LEFT JOIN posts_topics pt ON p.post_id = pt.post_id
    `;

        const queryParams: any[] = [];
        let whereClauses = [];

        if (query) {
            queryParams.push(`%${query}%`);
            whereClauses.push(`(p.title ILIKE $${queryParams.length} OR p.subtitle ILIKE $${queryParams.length} OR p.content_url ILIKE $${queryParams.length})`);
        }

        if (type === 'my_feed') {
            queryParams.push(userId);
            whereClauses.push(`p.author_id IN (SELECT following_id FROM follows WHERE follower_id = $${queryParams.length})`);
        } else if (type === 'author_posts' && author_ids.length > 0) {
            queryParams.push(author_ids);
            whereClauses.push(`p.author_id = ANY($${queryParams.length})`);
        } else if (type === 'author_drafts') {
            whereClauses.push(`p.author_id = $${queryParams.length + 1} AND p.is_published = FALSE`);
            queryParams.push(userId);
        } else if (type === 'trending') {
            queryText += ' ORDER BY p.engagement_count DESC';
        } else {
            queryText += ' ORDER BY p.created_at DESC';
        }

        if (topics.length > 0) {
            queryParams.push(topics);
            whereClauses.push(`p.post_id IN (SELECT post_id FROM posts_topics WHERE topic_name = ANY($${queryParams.length}))`);
        }

        if (whereClauses.length > 0) {
            queryText += ' WHERE ' + whereClauses.join(' AND ');
        }

        queryParams.push(limit, offset);
        queryText += ` GROUP BY p.post_id, u.name LIMIT $${queryParams.length - 1} OFFSET $${queryParams.length};`;

        const { rows } = await pool.query(queryText, queryParams);

        return res.status(200).json({ posts: rows.length > 0 ? rows : null });
    } catch (error) {
        return res.status(500).json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
}
