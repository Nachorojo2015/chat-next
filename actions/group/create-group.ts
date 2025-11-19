"use server";

import { auth } from "@/lib/auth";
import { getDefaultPictureUser } from "@/utils/get-default-picture-user";
import { uploadImageOrVideo } from "@/utils/upload-image-or-video";
import { pool } from "@/lib/db"

interface Props {
  title: string;
  description: string;
  picture: File | null;
}

export const createGroup = async ({ title, description, picture }: Props) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const client = await pool!.connect()

  try {
    await client.query("BEGIN");

    let pictureUrl: string = getDefaultPictureUser(title);

    if (picture) {
      const { url } = await uploadImageOrVideo({ mediaFile: picture });
      pictureUrl = url;
    }

    const createGroupResult = await client.query(
      `
      INSERT INTO chats (type, picture, title, description, owner_id, is_public)
      VALUES ('group', $1, $2, $3, $4, true)
      RETURNING id
      `,
      [pictureUrl, title, description, session.user.id]
    );

    if (!createGroupResult.rowCount) {
      throw new Error("Error al crear el grupo");
    }

    const groupId = createGroupResult.rows[0].id;

    const addOwnerResult = await client.query(
      "INSERT INTO chat_members (chat_id, user_id, role) VALUES ($1, $2, $3)",
      [groupId, session.user.id, "owner"]
    );

    if (!addOwnerResult.rowCount) {
      throw new Error("Error al agregar el creador al grupo");
    }

    await client.query("COMMIT");

    return {
      ok: true,
      message: "Grupo creado con éxito!",
    };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error en transacción:", error);
    return {
      ok: false,
      message: "Error al crear el grupo",
    };
  } finally {
    client.release();
  }
};
