"use client";

import { deleteChat } from "@/actions/chats/delete-chat";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  chatId: string;
  groupTitle: string;
}

export const DeleteGroupModal = ({ chatId, groupTitle }: Props) => {

  const router = useRouter();

  const onDeleteGroup = async () => {
    const { ok, message } = await deleteChat({ chatId });

    if (!ok) {
      return toast.error(message);
    }

    router.refresh();

    toast.success(message);
  };

  return (
    <>
      <input type="checkbox" id="delete_group_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Eliminar grupo</h3>
          <p className="py-4">¿Quieres eliminar el grupo {groupTitle}?</p>
          <div className="modal-action">
            <label htmlFor="delete_group_modal" className="btn">
              Cerrar
            </label>
            <label
              htmlFor="delete_group_modal"
              className="btn btn-soft btn-error"
              onClick={onDeleteGroup}
            >
              Eliminar
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteGroupModal;
