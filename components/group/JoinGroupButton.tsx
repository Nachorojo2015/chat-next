"use client";

import { joinGroup } from "@/actions/group/join-group";
import { useSidebarStore } from "@/store/sidebar-store";
import { SquarePlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const JoinGroupButton = ({ groupId }: { groupId: string }) => {
  const closeCreateGroupMenu = useSidebarStore(
    (state) => state.closeSearchPublicGroupsMenu
  );

  const [loader, setLoader] = useState(false);

  const onJoinGroup = async () => {
    setLoader(true);

    const { ok, message } = await joinGroup(groupId);

    setLoader(false);

    if (!ok) {
      return toast.error(message);
    }

    toast.success(message);

    closeCreateGroupMenu();
  };

  return (
    <button
      disabled={loader}
      className="btn btn-primary shadow-none ml-auto"
      onClick={onJoinGroup}
    >
      {loader ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        <SquarePlus />
      )}
    </button>
  );
};
