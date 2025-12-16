"use server";

import { auth } from "@/lib/auth";
import { pool } from "@/lib/db";

export const joinGroup = async (id: string) => {
  const session = await auth();

  if (!session) {
    return {
      ok: false,
      message: "Debes iniciar sesión para unirte a este grupo",
    }
  }

  try {
    const isMemberPool = await pool.query(
      "SELECT 1 FROM chat_members WHERE chat_id = $1 AND user_id = $2",
      [id, session.user?.id]
    );

    if (isMemberPool.rowCount && isMemberPool.rowCount > 0) {
      return {
        ok: false,
        message: "Ya te uniste a este grupo",
      };
    }

    await pool.query(
      "INSERT INTO chat_members (chat_id, user_id) VALUES ($1, $2)",
      [id, session.user?.id]
    );

    return {
      ok: true,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "Error al unirse al grupo",
    };
  }
};
