import { getSessionUserId } from "@/lib/auth-user";
import pool from '@/lib/db';
import { NextResponse } from "next/server";

export async function POST(request: Request, {params}: {params: {id: string}}) {
  
  const user_id = await getSessionUserId();

  if (user_id === undefined) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  if (user_id === null) {
    return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
  }

  // You should have only one like per user 
  const { rows } = await pool.query(
  'INSERT INTO post_likes (post_id, user_id) VALUES ($1, $2) ON CONFLICT (post_id, user_id) DO NOTHING RETURNING *',
  [params.id, user_id],
  );

  return NextResponse.json({}, {status: 200})
  
  }

