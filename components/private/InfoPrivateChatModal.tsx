import Image from "next/image";

interface Props {
  privateChatFullname: string;
  privateChatUsername: string;
  privateChatBio: string;
  privateChatImage: string;
}

export const InfoPrivateChatModal = ({
  privateChatFullname,
  privateChatUsername,
  privateChatBio,
  privateChatImage,
}: Props) => {
  return (
    <>
      <input
        type="checkbox"
        id="info_private_chat_modal"
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">{privateChatFullname}</h3>
          <h2>@{privateChatUsername}</h2>
          <p className="py-4">
            <b>Biografía:</b> {privateChatBio}
          </p>
          <Image
            src={privateChatImage ?? '/user-default.png'}
            alt="user-avatar"
            width={200}
            height={200}
            className="object-cover mx-auto rounded-full shadow mt-3"
          />
          <div className="modal-action">
            <label htmlFor="info_private_chat_modal" className="btn">
              Cerrar
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
