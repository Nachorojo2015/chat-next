"use client";

import { leaveGroup } from "@/actions/group/leave-group";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  chatId: string;
  groupTitle: string;
}

export const LeaveGroupModal = ({ chatId, groupTitle }: Props) => {
  const router = useRouter();

  const onLeaveGroup = async () => {
    const { ok, message } = await leaveGroup({ chatId });

    if (!ok) {
      return toast.error(message);
    }

    router.refresh();

    toast.success(message);
  };

  return (
    <>
      <input type="checkbox" id="leave_group_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Salir del grupo</h3>
          <p className="py-4">¿Quieres salir del grupo {groupTitle}?</p>
          <div className="modal-action">
            <label htmlFor="leave_group_modal" className="btn">
              Cerrar
            </label>
            <label
              htmlFor="leave_group_modal"
              className="btn btn-soft btn-error"
              onClick={onLeaveGroup}
            >
              Salir
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
