import { createPrivateChat } from "@/actions/private/create-private-chat";
import { redirect } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import clsx from "clsx";

interface Props {
  id: string;
  fullname: string;
  username: string;
  profile_picture: string;
}

export const SearchUsersItem = ({
  id,
  fullname,
  username,
  profile_picture,
}: Props) => {
  const { data: session } = useSession();

  const onCreatePrivateChat = async () => {
    const { ok, message, privateChatId } = await createPrivateChat(id);

    if (!ok) {
      return toast.error(message);
    }

    redirect(`/p/${privateChatId}`);
  };

  return (
    <div
      className={clsx(
        "flex items-center gap-4 hover:bg-gray-100 p-2 rounded-lg transition cursor-pointer",
        {
          "hidden": session?.user?.username === username,
        }
      )}
      onClick={onCreatePrivateChat}
    >
      <Image
        src={profile_picture}
        alt="group-image"
        width={30}
        height={30}
        className="object-cover rounded-full w-12 h-12"
      />
      <div>
        <p>{fullname}</p>
        <p>{username}</p>
      </div>
    </div>
  );
};
