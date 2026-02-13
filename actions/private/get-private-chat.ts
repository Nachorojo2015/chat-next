"use server";

import { auth } from "@/lib/auth";
import { pool } from "@/lib/db";
import { PrivateChat } from "@/types/interfaces";

export const getPrivateChat = async (privateChatId: string): Promise<PrivateChat> => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }
  
  try {
    const result = await pool.query(
      `
        SELECT 
        u.profile_picture, 
        u.fullname, 
        u.username,
        u.bio
        FROM chat_members ch
        JOIN users u ON ch.user_id = u.id
        WHERE ch.chat_id = $1
        AND ch.user_id != $2;`,
      [privateChatId, session.user?.id]
    );

    return result.rows[0];
  } catch (error) {
    console.error(error);
    
    throw new Error("Chat no encontrado o eliminado")
  }
};
