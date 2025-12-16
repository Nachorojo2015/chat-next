"use client";

import { useSidebarStore } from "@/store/sidebar-store";
import { LogIn, Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { CloseSessionButton } from "../auth/CloseSessionButton";
import Link from "next/link";

export const DropdownMenu = () => {
  const { data: session } = useSession();

  const openUserProfile = useSidebarStore((state) => state.openUserProfile);

  return (
    <div className="dropdown dropdown-start">
      <div tabIndex={0} role="button" className="btn btn-ghost m-1">
        <Menu />
      </div>
      <ul
        tabIndex={-1}
        className="dropdown-content menu rounded-box z-1 w-64 p-2 shadow-sm bg-white"
      >
        {session ? (
          <>
            <li>
              <button
                className="w-full flex items-center gap-2 cursor-pointer"
                onClick={openUserProfile}
              >
                <Image
                  src={session?.user?.profile_picture || "/user-default.png"}
                  className="w-8 h-8 rounded-full object-cover"
                  alt="profile-picture"
                  width={30}
                  height={30}
                />
                <span>{session?.user?.fullname}</span>
              </button>
            </li>
            <li>
              <CloseSessionButton />
            </li>
          </>
        ) : (
          <li>
            <div>
              <LogIn />
              <Link href={"/auth/login"}>Iniciar sesión</Link>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};
