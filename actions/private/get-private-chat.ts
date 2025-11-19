"use server";

import { auth } from "@/lib/auth";
import { pool } from "@/lib/db";

export const getPrivateChat = async (privateChatId: string) => {
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

    if (!result.rowCount) {
      return {
        ok: false,
      }
    }

    return {
      ok: true,
      privateChat: result.rows[0],
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
    };
  }
};
