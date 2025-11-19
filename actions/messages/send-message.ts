"use server";

import { auth } from "@/lib/auth";
import { uploadImageOrVideo } from "@/utils/upload-image-or-video";
import { pool } from "@/lib/db";
import { pusherServer } from "@/lib/pusher-server";

interface Props {
  chatId: string;
  content: string | null;
  type: string;
  file: File | null;
}

export const sendMessage = async ({ chatId, content, type, file }: Props) => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    let pictureUrl: string | null = null;
    let imageWidth: number | null = null;
    let imageHeight: number | null = null;

    if (file) {
      const { url, width, height } = await uploadImageOrVideo({ mediaFile: file });
      pictureUrl = url;
      imageWidth = width;
      imageHeight = height;
    }

    const response = await pool.query(
    `
    INSERT INTO messages (chat_id, sender_id, content, type, file_url, width, height)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id`,
    [chatId, session.user?.id, content, type, pictureUrl, imageWidth, imageHeight]
    );

    if (!response.rowCount) {
      return {
        ok: false,
        message: "Error al enviar el mensaje",
      };
    }

    pusherServer.trigger(chatId, "send-message", {
      chat_id: chatId,
      message_id: response.rows[0].id,
      content: content,
      type: type,
      file_url: pictureUrl,
      width: imageWidth,
      height: imageHeight,
      sent_at: new Date(),
      sender_id: session.user?.id,
      sender_name: session.user?.fullname,
      sender_avatar: session.user?.profile_picture,
      sender_username: session.user?.username,
    });

    return {
      ok: true,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "Error al enviar el mensaje",
    };
  }
};
