"use server";

import { pool } from "@/lib/db";

export const getPublicGroups = async () => {
  try {
    const response = await pool.query(
    `SELECT c.id, title, picture, COUNT(ch.user_id) AS quantity_members FROM chats c
     JOIN chat_members ch ON ch.chat_id = c.id
     WHERE is_public
     GROUP BY c.title, c.picture, c.id
    `
    );

    return {
      ok: true,
      publicGroups: response.rows
    }
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "Error al obtener los grupos públicos"
    }
  }
};
