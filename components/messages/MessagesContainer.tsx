"use client";

import { getMessages } from "@/actions/messages/get-messages";
import { toast } from "sonner";
import { MessageCard } from "./MessageCard";
import { useEffect, useRef, useState } from "react";
import { pusherClient } from "@/lib/pusher-client";
import { Message } from "@/types/interfaces";

interface Props {
  chatId: string;
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
      </ul>
    </div>
  );
};
