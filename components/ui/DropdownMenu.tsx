"use client";

import { useSidebarStore } from "@/store/sidebar-store";
import { CircleX, Menu } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export const DropdownMenu = () => {

  const { data: session } = useSession();

  const openUserProfile = useSidebarStore(state => state.openUserProfile);

  return (
    <div className="dropdown dropdown-start">
      <div tabIndex={0} role="button" className="btn btn-ghost m-1">
        <Menu />
      </div>
      <ul
        tabIndex={-1}
        className="dropdown-content menu rounded-box z-1 w-64 p-2 shadow-sm bg-white"
      >
        <button
          className="w-full flex items-center gap-2 py-2 cursor-pointer"
          onClick={openUserProfile}
        >
          <Image
            src={session?.user?.profile_picture || '/user-default.png'}
            className="w-8 h-8 rounded-full object-cover"
            alt="profile-picture"
            width={30}
            height={30}
          />
          <span>{session?.user?.fullname}</span>
        </button>
        <button onClick={() => signOut()} className="flex items-center gap-2 py-2 text-red-500 cursor-pointer">
          <CircleX />
          Cerrar sesion
        </button>
      </ul>
    </div>
  );
};
