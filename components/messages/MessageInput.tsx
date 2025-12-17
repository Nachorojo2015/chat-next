"use client";

import { sendMessage } from "@/actions/messages/send-message";
import { SendHorizontal } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

interface Props {
  chatId: string;
}

export const MessageInput = ({ chatId }: Props) => {
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
      ></textarea>

      <button className="btn" onClick={onSendMessage}>
        <SendHorizontal />
      </button>
    </>
  );
};
