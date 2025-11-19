import { useState, useEffect } from "react";
import Image from "next/image";
import { MoveLeft, MoveRight, Camera } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useSidebarStore } from "@/store/sidebar-store";
import { editUserProfile } from "@/actions/user/edit-user-profile";
import { toast } from "sonner";

type FormData = {
  fullname: string;
  bio: string;
  picture: File | null;
};

export const UserProfile = () => {
  const { data: session } = useSession();
  const closeUserProfile = useSidebarStore((state) => state.closeUserProfile);
  const [loader, setLoader] = useState(false);
  const [preview, setPreview] = useState<string | null>(session?.user?.profile_picture || null);

  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      fullname: session?.user?.fullname || "",
      bio: session?.user?.bio || "",
      picture: null,
    },
  });

  const picture = watch("picture");

  useEffect(() => {
    if (picture instanceof File) {
      const objectUrl = URL.createObjectURL(picture);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [picture]);

  const onSubmit = async (data: FormData) => {
    setLoader(true);

    const { ok, message } = await editUserProfile({
      fullname: data.fullname,
      bio: data.bio,
      picture: data.picture,
    });

    if (!ok) {
      toast.error(message)
    }

    toast.success(message);

    setLoader(false);
  };

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <>
      <nav className="flex items-center gap-6 p-2">
        <button
          onClick={closeUserProfile}
          className="cursor-pointer transition-colors hover:bg-slate-200 p-2 rounded-full"
        >
          <MoveLeft size={24} />
        </button>
        <h2 className="text-xl font-semibold">Editar perfil</h2>
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
                alt="preview"
                style={{ filter: "brightness(50%)" }}
                className="w-32 h-32 rounded-full object-cover"
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
              id="fullname"
              className="w-full peer bg-transparent h-10 text-xl rounded-lg placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
              placeholder="Nombre completo"
              autoComplete="off"
              {...register("fullname", { required: true })}
            />
            <label
              htmlFor="fullname"
              className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
            >
              Nombre completo
            </label>
          </div>
        </div>

        <div className="bg-base-200 rounded-lg w-full mt-4">
          <div className="relative bg-inherit">
            <input
              id="bio"
              className="w-full peer bg-transparent h-10 text-xl rounded-lg placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
              placeholder="Biografía"
              autoComplete="off"
              {...register("bio")}
            />
            <label
              htmlFor="bio"
              className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
            >
              Biografía
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
            <MoveRight size={24} />
          )}
        </button>
      </form>
    </>
  );
};
