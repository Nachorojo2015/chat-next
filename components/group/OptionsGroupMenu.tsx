import {
  EllipsisVertical,
  Info,
  SquareArrowOutDownLeft,
  Trash,
} from "lucide-react";
import { InfoGroupModal } from "./InfoGroupModal";
import DeleteGroupModal from "./DeleteGroupModal";
import { LeaveGroupModal } from "./LeaveGroupModal";

interface Props {
  chatId: string
  groupRole: "member" | "owner";
  groupTitle: string;
  groupMembers: number;
  groupDescription: string;
  groupImage: string;
}

export const OptionsGroupMenu = ({
  chatId,
  groupRole,
  groupTitle,
  groupMembers,
  groupDescription,
  groupImage,
}: Props) => {
  if (groupRole === "owner") {
    return (
      <>
        <div className="dropdown dropdown-end ml-auto">
          <div tabIndex={0} role="button" className="btn m-1">
            <EllipsisVertical />
          </div>
          <ul
            tabIndex={-1}
            className="dropdown-content menu bg-base-100 rounded-box z-1 m-1 w-52 p-2 shadow-sm"
          >
            <li>
              <label htmlFor="info_group_modal">
                <Info />
                Ver info
              </label>
            </li>
            <li>
              <label htmlFor="delete_group_modal" className="text-red-500">
                <Trash />
                Eliminar grupo
              </label>
            </li>
          </ul>
        </div>

        {/* Modal para mostrar la información del grupo - Rel: info_group_modal */}
        <InfoGroupModal
          groupTitle={groupTitle}
          groupMembers={groupMembers}
          groupDescription={groupDescription}
          groupImage={groupImage}
        />

        {/* Modal para eliminar el grupo - Rel: delete_group_modal */}
        <DeleteGroupModal chatId={chatId} groupTitle={groupTitle} />
      </>
    );
  }

  if (groupRole === "member") {
    return (
      <>
        <div className="dropdown dropdown-end ml-auto">
          <div tabIndex={0} role="button" className="btn m-1">
            <EllipsisVertical />
          </div>
          <ul
            tabIndex={-1}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <label htmlFor="info_group_modal">
                <Info />
                Ver info
              </label>
            </li>
            <li>
              <label htmlFor="leave_group_modal" className="text-red-500">
                <SquareArrowOutDownLeft />
                Salir del grupo
              </label>
            </li>
          </ul>
        </div>

        {/* Modal para mostrar la información del grupo - Rel: info_group_modal */}
        <InfoGroupModal
          groupTitle={groupTitle}
          groupMembers={groupMembers}
          groupDescription={groupDescription}
          groupImage={groupImage}
        />

        {/* TODO: hacer la modal para salir del grupo */}
        <LeaveGroupModal chatId={chatId} groupTitle={groupTitle} />
      </>
    );
  }
};
