"use server";

import { auth } from "@/lib/auth";
import { pool } from "@/lib/db";

export const createPrivateChat = async (id: string) => {
  const session = await auth();
  if (!session) {
    return {
      ok: false,
      message: "Debes iniciar sesión para conversar con el usuario",
    };
  }

  const client = await pool!.connect();

  try {
    await client.query("BEGIN");

    const hasBeenCreatedChatBeforePool = await client.query(
      `
        SELECT c.id
        FROM chats c
        JOIN chat_members cm ON c.id = cm.chat_id
        WHERE c.type = 'private'
        AND cm.user_id IN ($1, $2)
        GROUP BY c.id
        HAVING COUNT(*) = 2;
        `,
      [session.user?.id, id]
    );

    const createdPrivateChatId = hasBeenCreatedChatBeforePool.rows[0]?.id;

    if (createdPrivateChatId) {
      return {
        ok: true,
        privateChatId: createdPrivateChatId,
      };
    }

    const result = await client.query(`
    INSERT INTO chats (type)
    VALUES ('private')
    RETURNING id`);

    if (result.rowCount === 0) {
      return {
        ok: false,
        message: "Error al crear el chat privado",
      };
    }

    const privateChatId = result.rows[0]?.id;

    const insertMyUserPool = await client.query(
      `
        INSERT INTO chat_members (chat_id, user_id)
        VALUES ($1, $2)
        `,
      [privateChatId, session.user?.id]
    );

    if (insertMyUserPool.rowCount === 0) {
      return {
        ok: false,
        message: "Error al crear el chat privado",
      };
    }

    const insertOtherUserPool = await client.query(
      `
     INSERT INTO chat_members (chat_id, user_id)
     VALUES ($1, $2)
     `,
      [privateChatId, id]
    );

    if (insertOtherUserPool.rowCount === 0) {
      return {
        ok: false,
        message: "Error al crear el chat privado",
      };
    }

    await client.query("COMMIT");

    return {
      ok: true,
      privateChatId,
    };
  } catch (error) {
    console.log(error);
    await client.query("ROLLBACK");
    return {
      ok: false,
      message: "Error al crear el chat privado",
    };
  } finally {
    client.release();
  }
};
