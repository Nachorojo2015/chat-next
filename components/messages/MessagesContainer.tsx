"use client";

import { getMessages } from "@/actions/messages/get-messages";
import { toast } from "sonner";
import { MessageCard } from "./MessageCard";
import { useEffect, useRef, useState } from "react";
import { pusherClient } from "@/lib/pusher-client";
import { Message } from "@/types/interfaces";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface Props {
  chatId: string;
}

export const MessagesContainer = ({ chatId }: Props) => {
  const { data: session } = useSession();

  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<{ userId: string; userImage: string }[]>(
    [],
  );

  const messagesEndRef = useRef<HTMLUListElement>(null);

  const scrollToBottom = () => {
    const container = messagesEndRef.current;
    if (!container) return;

    container.scrollTop = container.scrollHeight;
  };

  useEffect(() => {
    const onGetMessages = async () => {
      const { ok, message, messages } = await getMessages({ chatId });

      if (!ok) {
        return toast.error(message);
      }

      setMessages(messages as Message[]);
    };

    if (!chatId) return;

    onGetMessages();
  }, [chatId]);

  // Eventos con pusher del lado del cliente
  useEffect(() => {
    pusherClient.subscribe(chatId);
    const handler = (userMessage: Message) => {
      setMessages((prev) => [...prev, userMessage]);
    };

    const handleTyping = (userData: { userId: string; userImage: string }) => {
      if (session?.user?.id === userData.userId) return;

      setUsers((prev) => [...prev, userData]);
    };

    const handleStopTyping = (userData: { userId: string }) => {
      setUsers(users.filter((u) => u.userId != userData.userId));
    };

    pusherClient.bind("send-message", handler);
    pusherClient.bind("typing-message", handleTyping);
    pusherClient.bind("stop-typing-message", handleStopTyping);

    return () => {
      pusherClient.unbind("send-message", handler);
      pusherClient.unbind("typing-message", handleTyping);
      pusherClient.unbind("stop-typing-message", handleStopTyping);
      pusherClient.unsubscribe(chatId);
    };
  }, [chatId, users, session?.user?.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="relative flex flex-1">
      <ul
        ref={messagesEndRef}
        className="overflow-y-auto overflow-x-hidden absolute h-full w-full scrollbar-transparent flex flex-col p-2"
      >
        {messages?.map((message) => (
          <MessageCard
            key={message.message_id}
            message_id={message.message_id}
            content={message.content}
            type={message.type}
            file_url={message.file_url}
            width={message.width}
            height={message.height}
            sent_at={message.sent_at}
            sender_id={message.sender_id}
            sender_name={message.sender_name}
            sender_avatar={message.sender_avatar}
            sender_username={message.sender_username}
          />
        ))}

        {users.map((u) => (
          <div className="flex items-center gap-3 mt-1" key={u.userId}>
            <Image alt="user-avatar" width={30} height={30} src={u.userImage ?? "/user-default.png"} className="w-8 h-8 rounded-full" />
            <div className="bg-base-300 px-5 py-1 rounded-full">
              <span className="loading loading-dots loading-sm"></span>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};
