"use client"

import { createGroup } from "@/actions/group/create-group";
import { useSidebarStore } from "@/store/sidebar-store";
import { Camera, MoveLeft, MoveRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormData {
  title: string;
  description: string;
  picture: File | null;
}

export const CreateGroupMenu = () => {
  const closeCreateGroupMenu = useSidebarStore(
    (state) => state.closeCreateGroupMenu
  );

  const { handleSubmit, register, watch, setValue } = useForm<FormData>();

  const [loader, setLoader] = useState(false);
  const [preview, setPreview] = useState<string | null>("");

  const picture = watch("picture");

  useEffect(() => {
    if (picture instanceof File) {
      const objectUrl = URL.createObjectURL(picture);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [picture]);

  const onSubmit = async (data: FormData) => {
    setLoader(true);

    const { ok, message } = await createGroup({
      title: data.title,
      description: data.description,
      picture: data.picture,
    });

    setLoader(false);

    if (!ok) {
     return toast.error(message);
    }

    toast.success(message);

    closeCreateGroupMenu();
  };

  return (
    <>
      <nav className="flex items-center gap-6 p-2">
        <button
          onClick={closeCreateGroupMenu}
          className="cursor-pointer transition-colors duration-300 hover:bg-slate-200 p-2 rounded-full"
        >
          <MoveLeft size={24} />
        </button>
        <h2 className="text-xl font-semibold">Nuevo Grupo</h2>
      </nav>

      <form
        className="flex flex-col items-center justify-center gap-4 px-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label>
          {preview ? (
            <div className="relative cursor-pointer group">
              <Image
                src={preview}
                alt="camera"
                className="w-32 h-32 rounded-full object-cover"
                style={{ filter: "brightness(50%)" }}
                width={128}
                height={128}
              />

              <Camera
                color="white"
                size={60}
                className="absolute top-8 right-1/2 left-1/2 transform -translate-x-1/2 group-hover:scale-110 transition-transform duration-200"
              />
            </div>
          ) : (
            <div className="w-32 h-32 rounded-full group bg-blue-500 flex items-center justify-center cursor-pointer relative">
              <Camera
                color="white"
                size={60}
                className="absolute top-8 right-1/2 left-1/2 transform -translate-x-1/2 group-hover:scale-110 transition-transform duration-200"
              />
            </div>
          )}

          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setValue("picture", file);
            }}
          />
        </label>

        <div className="bg-base-200 rounded-lg w-full mt-4">
          <div className="relative bg-inherit">
            <input
              type="text"
              id="title"
              className="w-full peer bg-transparent h-10 text-xl rounded-lg placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
              placeholder="Nombre del grupo"
              autoComplete="off"
              required
              {...register("title", { required: true })}
            />
            <label
              htmlFor="title"
              className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
            >
              Nombre del grupo
            </label>
          </div>
        </div>

        
         <div className="bg-base-200 rounded-lg w-full mt-4">
          <div className="relative bg-inherit">
            <input
              type="text"
              id="description"
              className="w-full peer bg-transparent h-10 text-xl rounded-lg placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
              placeholder="Descripción del grupo"
              autoComplete="off"
              required
              {...register("description", { required: true })}
            />
            <label
              htmlFor="description"
              className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
            >
              Descripción del grupo
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loader}
          className="absolute bottom-4 right-4 bg-blue-500 text-white p-4 shadow-lg hover:bg-blue-600 transition-colors rounded-full"
        >
          {loader ? (
            <span className="loading loading-dots loading-md"></span>
          ) : (
            <MoveRight size={25} />
          )}
        </button>
      </form>

      <p className="text-xs text-center mt-5 mx-1">Por defecto el grupo creado será <b>público.</b> Podrás cambiarlo a <b>privado</b> en las opciones cuando entres a tu chat de grupo</p>
    </>
  );
};
