import { EllipsisVertical, Info, Trash } from "lucide-react";
import DeletePrivateChatModal from "./DeletePrivateChatModal";
import { InfoPrivateChatModal } from "./InfoPrivateChatModal";

interface Props {
  chatId: string;
  privateChatFullname: string;
  privateChatUsername: string;
  privateChatBio: string;
  privateChatImage: string;
}

export const OptionsPrivateChatMenu = ({
  chatId,
  privateChatFullname,
  privateChatUsername,
  privateChatBio,
  privateChatImage,
}: Props) => {
  return (
    <>
      <div className="dropdown dropdown-end ml-auto">
        <div tabIndex={0} role="button" className="btn btn-ghost m-1">
          <EllipsisVertical />
        </div>
        <ul
          tabIndex={-1}
          className="dropdown-content menu bg-base-100 rounded-box z-1 m-1 w-52 p-2 shadow-sm"
        >
          <li>
            <label htmlFor="info_private_chat_modal">
              <Info />
              Ver info
            </label>
          </li>
          <li>
            <label htmlFor="delete_private_chat_modal" className="text-red-500">
              <Trash />
              Eliminar chat
            </label>
          </li>
        </ul>
      </div>

      {/* Modal para la información del chat privado */}
      <InfoPrivateChatModal
        privateChatFullname={privateChatFullname}
        privateChatUsername={privateChatUsername}
        privateChatBio={privateChatBio}
        privateChatImage={privateChatImage}
      />

      {/* Modal para eliminar el chat privado */}
      <DeletePrivateChatModal chatId={chatId} privateChatFullname={privateChatFullname} />
    </>
  );
};

export default OptionsPrivateChatMenu;
