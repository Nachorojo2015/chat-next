"use client";

import { getMessages } from "@/actions/messages/get-messages";
import { toast } from "sonner";
import { MessageCard } from "./MessageCard";
import { useEffect, useRef, useState } from "react";
import { pusherClient } from "@/lib/pusher-client";

interface Props {
  chatId: string;
}

interface Message {
  message_id: string;
  content: string;
  type: "text" | "image" | "video";
  file_url: string;
  width: number;
  height: number;
  sent_at: Date;
  sender_id: string;
  sender_name: string;
  sender_avatar: string;
  sender_username: string;
}

export const MessagesContainer = ({ chatId }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);

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

    pusherClient.bind("send-message", handler);

    return () => {
      pusherClient.unbind("send-message", handler);
      pusherClient.unsubscribe(chatId);
    };
  }, [chatId]);

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
            messageId={message.message_id}
            content={message.content}
            type={message.type}
            fileUrl={message.file_url}
            width={message.width}
            height={message.height}
            sentAt={message.sent_at}
            senderId={message.sender_id}
            senderName={message.sender_name}
            senderAvatar={message.sender_avatar}
            senderUsername={message.sender_username}
          />
        ))}
      </ul>
    </div>
  );
};
