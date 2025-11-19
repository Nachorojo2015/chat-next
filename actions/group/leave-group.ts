"use server";

import { auth } from "@/lib/auth";
import { pool } from "@/lib/db";

export const leaveGroup = async ({ chatId }: { chatId: string }) => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    await pool.query(
      "DELETE FROM chat_members WHERE user_id = $1 AND chat_id = $2",
      [session.user?.id, chatId]
    );

    return {
      ok: true,
      message: "Abandonaste el grupo",
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "Error al salir del grupo",
    };
  }
};
