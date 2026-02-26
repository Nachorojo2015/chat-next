"use server";

import { pusherServer } from "@/lib/pusher-server";

interface Params {
  chatId: string;
  userId: string;
}

export const stopTypingMessage = async ({ chatId, userId }: Params) => {
  await pusherServer.trigger(chatId, "stop-typing-message", { userId });
};
