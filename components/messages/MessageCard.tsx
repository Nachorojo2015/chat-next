import { formatTimestampToHHMM } from "@/utils/format-timestamp-to-hhmm";
import Image from "next/image";
import { ImageZoom } from "../ui/ImageZoom";
import { useSession } from "next-auth/react";
import { Message } from "@/types/interfaces";

export const MessageCard = ({
  message_id,
  content,
  type,
  file_url,
  width,
  height,
  sent_at,
  sender_id,
  sender_name,
  sender_avatar,
  sender_username,
}: Message) => {
  const { data: session } = useSession();

  if (type === "text") {
    if (sender_id === session?.user?.id) {
      return (
        <div className="chat chat-end">
          <div className="chat-header">
            {sender_name}
            <time className="text-xs opacity-50">
              {formatTimestampToHHMM(sent_at)}
            </time>
          </div>
          <div className="chat-bubble wrap-break-word w-fit whitespace-pre-line bg-primary text-white">
            {content}
          </div>
          <div className="chat-footer opacity-50">@{sender_username}</div>
        </div>
      );
    } else {
      return (
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <Image
                alt="user-avatar"
                src={sender_avatar}
                width={30}
                height={30}
              />
            </div>
          </div>
          <div className="chat-header">
            {sender_name}
            <time className="text-xs opacity-50">
              {formatTimestampToHHMM(sent_at)}
            </time>
          </div>
          <div className="chat-bubble wrap-break-word w-fit whitespace-pre-line">
            {content}
          </div>
          <div className="chat-footer opacity-50">@{sender_username}</div>
        </div>
      );
    }
  }

  if (type === "image") {
    if (sender_id === session?.user?.id) {
      return (
        <div className="chat chat-end">
          <div className="chat-header">
            {sender_name}
            <time className="text-xs opacity-50">
              {formatTimestampToHHMM(sent_at)}
            </time>
          </div>
          <div className="chat-bubble p-1 bg-primary w-fit sm:max-w-xs">
            <ImageZoom fileUrl={file_url} width={width} height={height} />
          </div>
          <div className="chat-footer opacity-50">@{sender_username}</div>
        </div>
      );
    } else {
      return (
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <Image
                alt="user-avatar"
                src={sender_avatar}
                width={30}
                height={30}
              />
            </div>
          </div>
          <div className="chat-header">
            {sender_name}
            <time className="text-xs opacity-50">
              {formatTimestampToHHMM(sent_at)}
            </time>
          </div>
          <div className="chat-bubble p-1 w-fit sm:max-w-xs">
            <ImageZoom fileUrl={file_url} width={width} height={height} />
          </div>
          <div className="chat-footer opacity-50">@{sender_username}</div>
        </div>
      );
    }
  }

  if (type === "video") {
    if (sender_id === session?.user?.id) {
      return (
        <div className="chat chat-end">
          <div className="chat-header">
            {sender_name}
            <time className="text-xs opacity-50">
              {formatTimestampToHHMM(sent_at)}
            </time>
          </div>
          <div className="chat-bubble p-1 bg-primary max-w-xs">
            <video src={file_url} controls></video>
          </div>
          <div className="chat-footer opacity-50">@{sender_username}</div>
        </div>
      );
    } else {
      return (
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <Image
                alt="user-avatar"
                src={sender_avatar}
                width={30}
                height={30}
              />
            </div>
          </div>
          <div className="chat-header">
            {sender_name}
            <time className="text-xs opacity-50">
              {formatTimestampToHHMM(sent_at)}
            </time>
          </div>
          <div className="chat-bubble p-1 max-w-xs">
            <video src={file_url} controls></video>
          </div>
          <div className="chat-footer opacity-50">@{sender_username}</div>
        </div>
      );
    }
  }
};
