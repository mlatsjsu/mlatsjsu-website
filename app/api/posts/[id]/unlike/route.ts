import { getSessionUserId } from "@/lib/auth-user";
import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request, {params}: {params: {id: string}}) {
   
  const user_id = await getSessionUserId();
  const post_id = params.id
  
  const { rows } = await pool.query(

       'DELETE FROM post_likes WHERE post_id = $1 AND user_id = $2;'
       ,
       [post_id, user_id],
     );


   return NextResponse.json({}, {status: 200})
}

