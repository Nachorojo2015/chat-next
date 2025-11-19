"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  username: string;
  password: string;
}

export const LoginForm = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [loader, setLoader] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoader(true);

    await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirectTo: "/",
    });

    setLoader(false);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Nombre de usuario"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        {...register("username", { required: true })}
      />
      <input
        type="password"
        placeholder="Contraseña"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        {...register("password", { required: true })}
      />
      <button
        type="submit"
        disabled={loader}
        className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
      >
        {loader ? (
          <span className="loading loading-dots loading-md"></span>
        ) : (
          "Iniciar sesión"
        )}
      </button>
    </form>
  );
};
