"use server";

import { pool } from "@/lib/db";

interface Props {
  chatId: string;
}

export const getMessages = async ({ chatId }: Props) => {
  try {
    const result = await pool.query(
      `
    SELECT
      m.id AS message_id,
      m.content,
      m.type,
      m.file_url,
      m.width,
      m.height,
      m.sent_at,

      -- Usuario que envió el mensaje
      u.id AS sender_id,
      u.fullname AS sender_name,
      u.profile_picture AS sender_avatar,
      u.username AS sender_username

      FROM messages m
      JOIN users u ON m.sender_id = u.id

      WHERE m.chat_id = $1
      GROUP BY
       m.id,
       u.id
      ORDER BY m.sent_at ASC
    `,
      [chatId]
    );

    return {
      ok: true,
      messages: result.rows,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "Error al obtener los mensajes",
    };
  }
};
