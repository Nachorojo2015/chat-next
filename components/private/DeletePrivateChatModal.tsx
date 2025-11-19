"use client";

import { deleteChat } from "@/actions/chats/delete-chat";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  chatId: string;
  privateChatFullname: string;
}

export const DeletePrivateChatModal = ({
  chatId,
  privateChatFullname,
}: Props) => {
  const router = useRouter();

  const onDeleteChat = async () => {
    const { ok, message } = await deleteChat({ chatId });

    if (!ok) {
      return toast.error(message);
    }

    router.refresh();

    toast.success(message);
  };

  return (
    <>
      <input
        type="checkbox"
        id="delete_private_chat_modal"
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Eliminar chat privado</h3>
          <p className="py-4">
            ¿Quieres eliminar tu chat privado con {privateChatFullname}?
          </p>
          <div className="modal-action">
            <label htmlFor="delete_private_chat_modal" className="btn">
              Cancelar
            </label>
            <label
              htmlFor="delete_private_chat_modal"
              className="btn btn-soft btn-error"
              onClick={onDeleteChat}
            >
              Eliminar
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeletePrivateChatModal;
