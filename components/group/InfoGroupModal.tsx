import Image from "next/image";

interface Props {
  groupTitle: string;
  groupMembers: number;
  groupDescription: string;
  groupImage: string;
}

export const InfoGroupModal = ({ groupTitle, groupMembers, groupDescription, groupImage }: Props ) => {
  return (
    <>
      <input type="checkbox" id="info_group_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">{groupTitle}</h3>
          <h2>{groupMembers > 1 ? `${groupMembers} miembros` : `${groupMembers} miembro`}</h2>
          <p className="py-4">Descripción: {groupDescription} </p>
          <Image
            src={groupImage ?? "/group-default.png"}
            alt="group-image"
            width={200}
            height={200}
            className="object-cover mx-auto rounded-full shadow mt-3"
          />
          <div className="modal-action">
            <label htmlFor="info_group_modal" className="btn">
              Cerrar
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
