import { createPrivateChat } from "@/actions/private/create-private-chat";
import { redirect } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";

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
  const onCreatePrivateChat = async () => {
    const { ok, message, privateChatId } = await createPrivateChat(id)

    if (!ok) {
      return toast.error(message);
    }

    redirect(`/p/${privateChatId}`)
  }

  return (
    <div className="flex items-center gap-4 hover:bg-gray-100 p-2 rounded-lg transition cursor-pointer" onClick={onCreatePrivateChat}>
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
