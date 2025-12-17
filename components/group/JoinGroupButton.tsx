"use client";

import { joinGroup } from "@/actions/group/join-group";
import { SquarePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const JoinGroupButton = ({ groupId }: { groupId: string }) => {
  const [loader, setLoader] = useState(false);

  const router = useRouter();

  const onJoinGroup = async () => {
    setLoader(true);

    const { ok, message } = await joinGroup(groupId);

    setLoader(false);

    if (!ok) {
      return toast.error(message);
    }

    router.refresh();
  };

  return (
    <button
      disabled={loader}
      className="btn btn-ghost shadow-none ml-auto"
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
