"use client";

import { changeGroupType } from "@/actions/group/change-group-type";
import clsx from "clsx";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  chatId: string;
  groupType: boolean;
}

export const ChangeGroupTypeModal = ({ chatId, groupType }: Props) => {
  const [isPublic, setIsPublic] = useState(groupType);

  const setPublic = () => {
    setIsPublic(true);
  };

  const setPrivate = () => {
    setIsPublic(false);
  };

  const onSubmit = async () => {
    const { ok, message } = await changeGroupType({ chatId, groupType: isPublic });

    if (!ok) {
      return toast.error(message);
    }

    toast.success(message);
  };

  return (
    <>
      <input type="checkbox" id="change_group_type" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Cambiar el tipo de grupo</h3>
          <p className="py-4">
            Elige que tipo de visibilidad quieres darle a tu grupo.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 justify-center">
            <div
              className={clsx(
                "shadow bg-base-200 p-2 rounded-lg cursor-pointer",
                {
                  "bg-blue-300": isPublic,
                  "text-white": isPublic,
                }
              )}
              onClick={setPublic}
            >
              <div className="flex items-center gap-2">
                <b>Público</b>
                <Eye />
              </div>
              <p>
                Los grupos públicos figuran en la lista de grupos y son visibles
                para todos los usuarios, cualquiera puede unirse a ellos.
              </p>
            </div>
            <div
              className={clsx(
                "shadow bg-base-200 p-2 rounded-lg cursor-pointer",
                {
                  "bg-blue-300": !isPublic,
                  "text-white": !isPublic,
                }
              )}
              onClick={setPrivate}
            >
              <div className="flex items-center gap-2">
                <b>Privado</b>
                <EyeClosed />
              </div>
              <p>
                Los grupos privados no figuran en la lista de grupos y solo se
                pueden unir a ellos a través de su link.
              </p>
            </div>
          </div>
          <div className="modal-action">
            <label htmlFor="change_group_type" className="btn">
              Cerrar
            </label>
            <label
              htmlFor="change_group_type"
              className="btn btn-primary"
              onClick={onSubmit}
            >
              Cambiar
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
