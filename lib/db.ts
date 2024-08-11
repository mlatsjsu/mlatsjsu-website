import {
  BoardItem,
  LearningResourceItem,
  ProjectItem,
  SpotlightItem,
} from '@/types';
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
  ssl: { rejectUnauthorized: false },
});

export const getSpotlights = () =>
  pool.query<SpotlightItem>(`
    SELECT * FROM spotlights ORDER BY pos;
  `);

export const getBoard = () =>
  pool.query<BoardItem>(`
    SELECT * FROM board ORDER BY pos;
  `);

export const getProjects = () =>
  pool.query<ProjectItem>(`
    SELECT * FROM projects ORDER BY pos;
  `);

export const getLearningResources = () =>
  pool.query<LearningResourceItem>(`
    SELECT * FROM learning_resources ORDER BY pos;
  `);

export default pool;
