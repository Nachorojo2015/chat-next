"use server";

import { auth } from "@/lib/auth";
import { pool } from "@/lib/db";
import { Group } from "@/types/interfaces";

export const getGroup = async ({ chatId }: { chatId: string }): Promise<Group> => {
  const session = await auth();

  try {
    const response = await pool.query(
      `
      SELECT 
      c.title, 
      c.picture,
      c.is_public, 
      c.description,
      (SELECT COUNT(*) FROM chat_members WHERE chat_id = c.id) AS quantity_members,
      ch.role
      FROM chats c
      LEFT JOIN chat_members ch ON c.id = ch.chat_id AND ch.user_id = $2
      WHERE c.id = $1
    `,
      [chatId, session?.user?.id]
    );

    return response.rows[0]
  } catch (error) {
    console.error(error);
    
    throw new Error("Grupo no encontrado o eliminado")
  }
};
