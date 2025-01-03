import { getSessionUserId } from "@/lib/auth-user";
import pool from "@/lib/db";

export async function POST(request: Request, {params}: {params: {post_id: string}}) {
   const user_id = await getSessionUserId();

   const { rows } = await pool.query(
      
       //'DELETE FROM post_likes WHERE (post_id, user_id) VALUES ($1, $2);'
       'DELETE FROM post_likes WHERE post_id = $1 AND user_id = $2;'
       ,
       [params.post_id, user_id],
     );
  
  
   return Response.json({}, {status: 200})
}
