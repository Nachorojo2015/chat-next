import { joinGroup } from "@/actions/group/join-group";
import { useSidebarStore } from "@/store/sidebar-store";
import Image from "next/image";
import { toast } from "sonner";

interface Props {
  id: string;
  title: string;
  picture: string;
  quantity_members: number;
}

export const SearchGroupItem = ({
  id,
  title,
  picture,
  quantity_members,
}: Props) => {
  const closeCreateGroupMenu = useSidebarStore(
    (state) => state.closeSearchPublicGroupsMenu
  );

  const onJoinGroup = async () => {
    const { ok, message } = await joinGroup(id);

    if (!ok) {
      return toast.error(message);
    }

    toast.success(message);

    closeCreateGroupMenu();
  };

  return (
    <div
      className="flex items-center gap-4 hover:bg-gray-100 p-2 rounded-lg transition cursor-pointer"
      onClick={onJoinGroup}
    >
      <Image
        src={picture}
        alt="group-image"
        width={30}
        height={30}
        className="object-cover rounded-full w-12 h-12"
      />
      <div>
        <p>{title}</p>
        <p>
          {quantity_members > 1
            ? `${quantity_members} miembros`
            : `${quantity_members} miembro`}
        </p>
      </div>
    </div>
  );
};
