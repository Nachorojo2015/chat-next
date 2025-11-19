import { create } from "zustand";

interface Store {
  // Menu del perfil del usuario
  isOpenUserProfile: boolean;
  openUserProfile: () => void;
  closeUserProfile: () => void;

  // Menu para creación de un grupo
  isOpenCreateGroupMenu: boolean;
  openCreateGroupMenu: () => void;
  closeCreateGroupMenu: () => void;

  // Menu para la busqueda de un grupo público
  isOpenSearchPublicGroupsMenu: boolean;
  openSearchPublicGroupsMenu: () => void;
  closeSearchPublicGroupsMenu: () => void;

  // Menu para la busqueda de usuarios
  isOpenSearchUsersMenu: boolean;
  openSearchUsersMenu: () => void;
  closeSearchUsersMenu: () => void;
}

export const useSidebarStore = create<Store>()((set) => ({
  // Menu del perfil del usuario
  isOpenUserProfile: false,
  openUserProfile() {
    set({
      isOpenUserProfile: true,
    });
  },
  closeUserProfile() {
    set({
      isOpenUserProfile: false,
    });
  },

  // Menu para creación de un grupo
  isOpenCreateGroupMenu: false,
  openCreateGroupMenu() {
    set({
      isOpenCreateGroupMenu: true,
    });
  },
  closeCreateGroupMenu() {
    set({
      isOpenCreateGroupMenu: false,
    });
  },

  // Menu para la busqueda de un grupo público
  isOpenSearchPublicGroupsMenu: false,
  openSearchPublicGroupsMenu() {
    set({
      isOpenSearchPublicGroupsMenu: true,
    });
  },
  closeSearchPublicGroupsMenu() {
    set({
      isOpenSearchPublicGroupsMenu: false,
    });
  },

  // Menu para la busqueda de usuarios
  isOpenSearchUsersMenu: false,
  openSearchUsersMenu() {
    set({
      isOpenSearchUsersMenu: true,
    });
  },
  closeSearchUsersMenu() {
    set({
      isOpenSearchUsersMenu: false,
    });
  },
}));
