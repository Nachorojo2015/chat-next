"use client";

import { sendMessage } from "@/actions/messages/send-message";
import { stopTypingMessage } from "@/actions/messages/stop-typing-message";
import { typingMessage } from "@/actions/messages/typing-message";
import { SendHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import { toast } from "sonner";

interface Props {
  chatId: string;
}

export const MessageInput = ({ chatId }: Props) => {
  const { data: session } = useSession();

  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const isTyping = useRef(false);

  const onSendMessage = async () => {
    if (!textareaRef.current?.value.trim()) {
      return;
    }

    const { ok, message } = await sendMessage({
      chatId: chatId,
      content: textareaRef.current?.value,
      type: "text",
      file: null,
    });

    if (!ok) {
      return toast.error(message);
    }

    textareaRef.current.value = "";
  };

  const onWriteMessage = () => {
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    if (!isTyping.current) {
      typingMessage({ chatId, userId: session?.user?.id ?? '', userImage: session?.user?.profile_picture ?? '' })
      isTyping.current = true;
    }

    typingTimeout.current = setTimeout(() => {
      stopTypingMessage({ chatId, userId: session?.user?.id ?? '' });
      isTyping.current = false;
    }, 1500);
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <>
      <textarea
        placeholder="Escribe un mensaje..."
        className="w-full p-1 field-sizing-content max-h-24 resize-none h-auto"
        ref={textareaRef}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSendMessage();
          }
        }}
        onChange={onWriteMessage}
      ></textarea>

      <button className="btn" onClick={onSendMessage}>
        <SendHorizontal />
      </button>
    </>
  );
};
