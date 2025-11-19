"use server";

import { auth } from "@/lib/auth";
import { pool } from "@/lib/db";

export const deleteChat = async ({ chatId }: { chatId: string }) => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    await pool.query("DELETE FROM chats WHERE id = $1", [chatId]);

    return {
      ok: true,
      message: "Chat eliminado",
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "Error al eliminar el chat",
    };
  }
};
