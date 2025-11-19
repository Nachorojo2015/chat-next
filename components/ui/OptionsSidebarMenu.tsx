import { useSidebarStore } from "@/store/sidebar-store";
import { Earth, EllipsisVertical, User, Users } from "lucide-react";

export const OptionsSidebarMenu = () => {

  const { openCreateGroupMenu, openSearchPublicGroupsMenu, openSearchUsersMenu } = useSidebarStore() 
  

  return (
    <div className="dropdown dropdown-top dropdown-end ml-auto mb-4 mr-4">
      <div tabIndex={0} role="button" className="btn btn-ghost m-1">
        <EllipsisVertical />
      </div>
      <ul
        tabIndex={-1}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-1 shadow-sm"
      >
        <li>
          <button onClick={openCreateGroupMenu}>
            <Users />
            Crear grupo
          </button>
        </li>
        <li>
          <button onClick={openSearchPublicGroupsMenu}>
            <Earth />
            Buscar grupos públicos
          </button>
        </li>
        <li>
          <button onClick={openSearchUsersMenu}>
            <User />
            Iniciar chat privado
          </button>
        </li>
      </ul>
    </div>
  );
};
