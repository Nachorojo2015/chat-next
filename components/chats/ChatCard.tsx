import { formatLastMessageChatTime } from "@/utils/format-last-message-chat-time";
import clsx from "clsx";
import { Image as ImageIcon, Users, Video } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
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

export const ChatCard = ({
  id,
  title,
  content,
  picture,
  type: typeChat,
  sent_at,
  message_type,
  other_fullname,
  other_profile_picture,
  fullname,
  username,
}: Props) => {
  const { data: session } = useSession();

  const location = usePathname();
  const chatId = location.split("/").pop();

  if (typeChat === "private") {
    return (
      <Link
        href={`/p/${id}`}
        className={clsx(
          "flex items-center gap-4 p-2 rounded-lg transition relative",
          {
            "bg-blue-400 text-white": chatId === id,
            "hover:bg-gray-100": chatId !== id,
          }
        )}
      >
        <span className="absolute top-2 right-2 text-sm">
          {formatLastMessageChatTime(sent_at)}
        </span>
        <Image
          src={other_profile_picture}
          alt="chat-image"
          width={40}
          height={40}
          className="w-12 h-12 object-cover rounded-full"
        />
        <div>
          <p>{other_fullname}</p>

          {/* Tipos de mensaje */}
          {message_type === "image" && (
            <div className="flex items-center gap-1">
              <ImageIcon size={20} />
              <span>Imagen</span>
            </div>
          )}

          {message_type === "video" && (
            <div className="flex items-center gap-1">
              <Video size={20} />
              <span>Video</span>
            </div>
          )}

          {message_type === "text" && (
            <p className="truncate max-w-[220px]">
              {session?.user?.username === username ? "Tú:" : ""} {content}
            </p>
          )}
        </div>
      </Link>
    );
  }

  if (typeChat === "group") {
    return (
      <Link
        href={`/g/${id}`}
        className={clsx(
          "flex items-center gap-4 p-2 rounded-lg transition relative",
          {
            "bg-blue-400 text-white": chatId === id,
            "hover:bg-gray-100": chatId !== id,
          }
        )}
      >
        <span className="absolute top-2 right-2 text-sm">
          {formatLastMessageChatTime(sent_at)}
        </span>

        <Users className="absolute bottom-2 right-2" size={18} />

        <Image
          src={picture}
          alt="chat-image"
          width={40}
          height={40}
          className="w-12 h-12 object-cover rounded-full"
        />
        <div>
          <p>{title}</p>

          {/* Tipos de mensaje */}
          {message_type === "image" && (
            <div className="flex items-center gap-1">
              <ImageIcon size={20} />
              <span>Imagen</span>
            </div>
          )}

          {message_type === "video" && (
            <div className="flex items-center gap-1">
              <Video size={20} />
              <span>Video</span>
            </div>
          )}

          {message_type === "text" && (
            <p className="truncate max-w-[220px]">
              {session?.user?.username === username ? "Tú" : fullname}:{" "}
              {content}
            </p>
          )}
        </div>
      </Link>
    );
  }
};
