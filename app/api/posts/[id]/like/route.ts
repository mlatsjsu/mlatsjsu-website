import { getSessionUserId } from "@/lib/auth-user";
import pool from '@/lib/db';
/* For like and unlike, just make a request where you use getSession*/

//Query Parameters
export async function POST(request: Request, {params}: {params: {post_id: string}}) {
   
   const user_id = await getSessionUserId();
  
   const { rows } = await pool.query(
      
       'INSERT INTO post_likes (post_id, user_id) VALUES ($1, $2) RETURNING *;'
       ,
       [params.post_id, user_id],
     );
  
   return Response.json({}, {status: 200})
}
