import { getGroup } from "@/actions/group/get-group";
import { OptionsGroupMenu } from "@/components/group/OptionsGroupMenu";
import { MediaFileMessage } from "@/components/messages/MediaFileMessage";
import { MessageInput } from "@/components/messages/MessageInput";
import { MessagesContainer } from "@/components/messages/MessagesContainer";
import BackHome from "@/components/ui/BackHome";
import { UsersRound } from "lucide-react";
import Image from "next/image";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const { ok, group } = await getGroup({ chatId: id });

  if (!ok) {
    return {
      title: "Grupo desconocido",
    };
  }

  return {
    title: group.title,
    description: group.description,
  };
}

export default async function GroupPage({ params }: Props) {
  const { id } = await params;

  const { ok, group } = await getGroup({ chatId: id });

  if (!ok) {
    return (
      <div className="flex flex-col items-center justify-center h-dvh">
        <UsersRound size={50} />
        <p className="mt-2">Grupo no encontrado o eliminado</p>
      </div>
    );
  }

  return (
    <>
      <header className="flex items-center gap-3 bg-base-200 p-1">
        <BackHome />

        <div className="flex items-center gap-3">
          <Image
            src={group?.picture ?? "/group-default.png"}
            alt="user-image"
            width={30}
            height={30}
            className="w-10 h-10 object-cover rounded-full"
          />
          <div>
            <p className="text-lg">{group?.title}</p>
            <p className="text-xs">
              {group?.quantity_members > 1
                ? `${group.quantity_members} miembros`
                : `${group.quantity_members} miembro`}
            </p>
          </div>
        </div>

        <OptionsGroupMenu
          chatId={id}
          groupRole={group.role}
          groupTitle={group.title}
          groupMembers={group.quantity_members}
          groupDescription={group.description}
          groupImage={group.picture}
          groupType={group.is_public}
        />
      </header>

      <MessagesContainer chatId={id} />

      {group.role && (
        <footer className="flex items-center gap-3 bg-base-200 p-2">
          <MediaFileMessage chatId={id} />

          <MessageInput chatId={id} />
        </footer>
      )}
    </>
  );
}
