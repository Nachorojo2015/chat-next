"use client";

import { ChatsContainer } from "../chats/ChatsContainer";
import { DropdownMenu } from "./DropdownMenu";
import { UserProfile } from "./UserProfile";
import { OptionsSidebarMenu } from "./OptionsSidebarMenu";
import { CreateGroupMenu } from "../group/CreateGroupMenu";
import { useSidebarStore } from "@/store/sidebar-store";
import { SearchPublicGroupsMenu } from "../group/SearchPublicGroupsMenu";
import { SearchUsersMenu } from "../private/SearchUsersMenu";

export const Sidebar = () => {
  const { isOpenCreateGroupMenu, isOpenUserProfile, isOpenSearchPublicGroupsMenu, isOpenSearchUsersMenu } = useSidebarStore()

  // --- Mostrar el perfil ---
  if (isOpenUserProfile) {
    return <UserProfile />;
  }

  // --- Mostrar creación de grupo ---
  if (isOpenCreateGroupMenu) {
    return <CreateGroupMenu />;
  }

  // --- Mostrar busqueda de grupos públicos ---
  if (isOpenSearchPublicGroupsMenu) {
    return <SearchPublicGroupsMenu />
  }

  // --- Mostrar busqueda de usuarios ---
  if (isOpenSearchUsersMenu) {
    return <SearchUsersMenu />
  }

  return (
    <>
      <nav className="flex items-center gap-4 px-4 py-1">
        <DropdownMenu />

        <h1 className="text-2xl font-bold">Mensajes</h1>
      </nav>

      <ChatsContainer />

      <OptionsSidebarMenu />
    </>
  );
};
