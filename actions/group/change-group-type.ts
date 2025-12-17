"use server";

import { auth } from "@/lib/auth";
import { pool } from "@/lib/db";

interface Props {
  chatId: string;
  groupType: boolean;
}

export const changeGroupType = async ({ chatId, groupType }: Props) => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "Debes iniciar sesión para cambiar el tipo de tu grupo",
    };
  }

  try {
    await pool.query(
      `
    UPDATE chats
    SET is_public = $1
    WHERE id = $2
    `,
      [groupType, chatId]
    );

    return {
      ok: true,
      message: "Grupo actualizado",
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "Error al cambiar el tipo de grupo",
    };
  }
};
