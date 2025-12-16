import { formatTimestampToHHMM } from "@/utils/format-timestamp-to-hhmm";
import Image from "next/image";
import { ImageZoom } from "../ui/ImageZoom";
import { useSession } from "next-auth/react";

interface Props {
  messageId: string;
  content: string;
  type: "text" | "image" | "video";
  fileUrl: string;
  width: number;
  height: number;
  sentAt: Date;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderUsername: string;
}

export const MessageCard = ({
  messageId,
  content,
  type,
  fileUrl,
  width,
  height,
  sentAt,
  senderId,
  senderName,
  senderAvatar,
  senderUsername,
}: Props) => {
  const { data: session } = useSession();

  if (type === "text") {
    if (senderId === session?.user?.id) {
      return (
        <div className="chat chat-end">
          <div className="chat-header">
            {senderName}
            <time className="text-xs opacity-50">
              {formatTimestampToHHMM(sentAt)}
            </time>
          </div>
          <div className="chat-bubble wrap-break-word w-fit whitespace-pre-line bg-primary text-white">
            {content}
          </div>
          <div className="chat-footer opacity-50">@{senderUsername}</div>
        </div>
      );
    } else {
      return (
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <Image
                alt="user-avatar"
                src={senderAvatar}
                width={30}
                height={30}
              />
            </div>
          </div>
          <div className="chat-header">
            {senderName}
            <time className="text-xs opacity-50">
              {formatTimestampToHHMM(sentAt)}
            </time>
          </div>
          <div className="chat-bubble wrap-break-word w-fit whitespace-pre-line">
            {content}
          </div>
          <div className="chat-footer opacity-50">@{senderUsername}</div>
        </div>
      );
    }
  }

  if (type === "image") {
    if (senderId === session?.user?.id) {
      return (
        <div className="chat chat-end">
          <div className="chat-header">
            {senderName}
            <time className="text-xs opacity-50">
              {formatTimestampToHHMM(sentAt)}
            </time>
          </div>
          <div className="chat-bubble p-1 bg-primary w-fit sm:max-w-xs">
            <ImageZoom fileUrl={fileUrl} width={width} height={height} />
          </div>
          <div className="chat-footer opacity-50">@{senderUsername}</div>
        </div>
      );
    } else {
      return (
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <Image
                alt="user-avatar"
                src={senderAvatar}
                width={30}
                height={30}
              />
            </div>
          </div>
          <div className="chat-header">
            {senderName}
            <time className="text-xs opacity-50">
              {formatTimestampToHHMM(sentAt)}
            </time>
          </div>
          <div className="chat-bubble p-1 w-fit sm:max-w-xs">
            <ImageZoom fileUrl={fileUrl} width={width} height={height} />
          </div>
          <div className="chat-footer opacity-50">@{senderUsername}</div>
        </div>
      );
    }
  }

  if (type === "video") {
    if (senderId === session?.user?.id) {
      return (
        <div className="chat chat-end">
          <div className="chat-header">
            {senderName}
            <time className="text-xs opacity-50">
              {formatTimestampToHHMM(sentAt)}
            </time>
          </div>
          <div className="chat-bubble p-1 bg-primary max-w-xs">
            <video src={fileUrl} controls></video>
          </div>
          <div className="chat-footer opacity-50">@{senderUsername}</div>
        </div>
      );
    } else {
      return (
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <Image
                alt="user-avatar"
                src={senderAvatar}
                width={30}
                height={30}
              />
            </div>
          </div>
          <div className="chat-header">
            {senderName}
            <time className="text-xs opacity-50">
              {formatTimestampToHHMM(sentAt)}
            </time>
          </div>
          <div className="chat-bubble p-1 max-w-xs">
            <video src={fileUrl} controls></video>
          </div>
          <div className="chat-footer opacity-50">@{senderUsername}</div>
        </div>
      );
    }
  }
};
