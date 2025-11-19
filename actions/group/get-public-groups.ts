"use server";

import { auth } from "@/lib/auth";
import { pool } from "@/lib/db";

export const getPublicGroups = async () => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const response = await pool.query(
    `SELECT c.id, title, picture, COUNT(ch.user_id) AS quantity_members FROM chats c
     JOIN chat_members ch ON ch.chat_id = c.id
     WHERE is_public
     GROUP BY c.title, c.picture, c.id
    `
  );

  return response.rows
};
