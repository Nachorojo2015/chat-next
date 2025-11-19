import { getPrivateChat } from "@/actions/private/get-private-chat";
import { MediaFileMessage } from "@/components/messages/MediaFileMessage";
import { MessageInput } from "@/components/messages/MessageInput";
import { MessagesContainer } from "@/components/messages/MessagesContainer";
import OptionsPrivateChatMenu from "@/components/private/OptionsPrivateChatMenu";
import BackHome from "@/components/ui/BackHome";
import { User } from "lucide-react";
import Image from "next/image";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const { ok, privateChat } = await getPrivateChat(id);

  if (!ok) {
    return {
      title: "Grupo desconocido"
    }
  }

  return {
    title: privateChat.fullname,
    description: privateChat.bio,
  };
}

export default async function PrivatePage({ params }: Props) {
  const { id } = await params;

  const { ok, privateChat } = await getPrivateChat(id);

  if (!ok) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <User size={50} />
        <p className="mt-2">Chat no encontrado o eliminado</p>
      </div>
    );
  }

  return (
    <>
      <header className="flex items-center gap-3 bg-base-200">
        <BackHome />

        <div className="flex items-center gap-3">
          <Image
            src={privateChat?.profile_picture ?? "/user-default.png"}
            alt="user-image"
            width={30}
            height={30}
            className="w-10 h-10 object-cover rounded-full"
          />
          <div>
            <p className="text-lg">{privateChat?.fullname}</p>
            <p className="text-xs">@{privateChat?.username}</p>
          </div>
        </div>

        <OptionsPrivateChatMenu
          chatId={id}
          privateChatFullname={privateChat?.fullname}
          privateChatUsername={privateChat?.username}
          privateChatBio={privateChat?.bio}
          privateChatImage={privateChat?.profile_picture}
        />
      </header>

      <MessagesContainer chatId={id} />

      <footer className="flex items-center gap-3 bg-base-200 p-2">
        <MediaFileMessage chatId={id} />

        <MessageInput chatId={id} />
      </footer>
    </>
  );
}
