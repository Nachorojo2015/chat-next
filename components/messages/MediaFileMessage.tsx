"use client";

import { sendMessage } from "@/actions/messages/send-message";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface Props {
  chatId: string;
}

export const MediaFileMessage = ({ chatId }: Props) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
        modalRef?.current?.showModal();
      };
      reader.readAsDataURL(file);
    }
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  const onSendMessage = async () => {
    if (!file) return;

    const { ok, message } = await sendMessage({
      chatId: chatId,
      content: null,
      type: filePreview.startsWith("data:image") ? "image" : "video",
      file: file,
    });

    modalRef.current?.close();

    if (!ok) {
      return toast.error(message);
    }
  };

  return (
    <>
      <label className="btn btn-primary">
        <ImagePlus />
        <input
          type="file"
          hidden
          accept=".jpg, .png, .gif, .webp, .mp4"
          onChange={handleChange}
        />
      </label>

      {/* Modal for file */}
      <dialog ref={modalRef} className="modal sm:modal-middle">
        <div className="modal-box">
          <X className="absolute right-3 cursor-pointer" onClick={closeModal} />
          <h3 className="font-bold text-lg">Enviar foto/video</h3>
          <p className="py-4 text-center">
            Evita compartir datos como: Tarjetas de crédito, Documentos o
            Contraseñas.
          </p>
          <div className="modal-action flex flex-col items-center">
            {/* if there is a button in form, it will close the modal */}
            {filePreview.startsWith("data:image") && (
              <Image
                src={filePreview}
                alt="media-file"
                width={400}
                height={400}
                className="object-cover mx-auto w-[400px] max-h-[400px]"
              />
            )}

            {filePreview.startsWith("data:video") && (
              <video
                src={filePreview}
                controls
                className="w-[400px] max-h-[400px] rounded-md"
              ></video>
            )}

            <button className="btn btn-primary mt-4 w-full" onClick={onSendMessage}>Enviar</button>
          </div>
        </div>
      </dialog>
    </>
  );
};
