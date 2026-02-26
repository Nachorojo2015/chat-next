"use server";

import { pusherServer } from "@/lib/pusher-server";

interface Params {
  chatId: string;
  userId: string;
  userImage: string;
}

export const typingMessage = async ({ chatId, userId, userImage }: Params) => {
  await pusherServer.trigger(chatId, "typing-message", { userId, userImage });
};
