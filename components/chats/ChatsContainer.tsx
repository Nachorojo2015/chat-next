"use client";

import { useEffect, useState } from "react";
import { ChatCard } from "./ChatCard";
import { getChats } from "@/actions/chats/get-chats";
import { pusherClient } from "@/lib/pusher-client";
import { toast } from "sonner";

export interface Chats {
  id: string;
  type: string;
  title: string;
  picture: string;
  content: string | null;
  sent_at: Date | null;
  message_type: "text" | "image" | "video";
  fullname: string | null;
  username: string | null;
  other_fullname: string;
  other_username: string;
  other_profile_picture: string;
}

interface Message {
  chat_id: string;
  message_id: string;
  content: string;
  type: "text" | "image" | "video";
  file_url: string;
  file_public_id: string;
  sent_at: Date;
  sender_id: string;
  sender_name: string;
  sender_avatar: string;
  sender_username: string;
}

export const ChatsContainer = () => {
  const [chats, setChats] = useState<Chats[]>([]);

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const getUserChats = async () => {
      const { ok, message, chats } = await getChats();
      
      setLoader(false);

      if (!ok) {
        return toast.error(message);
      }

      setChats(chats as Chats[]);
    };

    getUserChats();
  }, []);

  useEffect(() => {
    chats.forEach((chat) => {
      pusherClient.subscribe(chat.id);
    });

    pusherClient.bind("send-message", (userMessage: Message) => {
      setChats((prevChats) => {
        return prevChats.map((chat) => {
          if (chat.id === userMessage.chat_id) {
            return {
              ...chat,
              content: userMessage.content,
              message_type: userMessage.type,
              sent_at: userMessage.sent_at,
              username: userMessage.sender_username,
              fullname: userMessage.sender_name,
            };
          }
          return chat;
        });
      });
    });

    return () => {
      chats.forEach((chat) => {
        pusherClient.unsubscribe(chat.id);
      });
    };
  }, [chats]);

  return (
    <div className="relative flex flex-1">
      <ul className="overflow-y-auto scrollbar-transparent p-3 overflow-x-hidden absolute h-full w-full">
        {loader ? (
          <div className="grid place-content-center h-full">
            <span className="loading loading-dots loading-md"></span>
          </div>
        ) : (
          <>
            {chats.map((chat) => (
              <ChatCard key={chat.id} {...chat} />
            ))}
          </>
        )}
      </ul>
    </div>
  );
};
