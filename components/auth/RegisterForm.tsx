"use client";

import { registerUser } from "@/actions/auth/register-user";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormData {
  email: string;
  username: string;
  fullname: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const [loader, setLoader] = useState(false);

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    setLoader(true);

    const { ok, message } = await registerUser({
      email: data.email,
      username: data.username,
      fullname: data.fullname,
      password: data.password,
    });

    if (!ok) {
      toast.error(message);
      setLoader(false);
      return
    }

    redirect('/auth/login')
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium">
          Tu correo electrónico
        </label>
        <input
          type="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          placeholder="nombre@empresa.com"
          {...register("email", { required: true })}
        />
      </div>
      <div>
        <label htmlFor="username" className="block mb-2 text-sm font-medium">
          Tu nombre de usuario
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          placeholder="Nombre de usuario"
          {...register("username", { required: true })}
        />
      </div>
      <div>
        <label htmlFor="fullname" className="block mb-2 text-sm font-medium">
          Tu nombre completo
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          placeholder="Nombre completo"
          {...register("fullname", { required: true })}
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium">
          Contraseña
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          {...register("password", { required: true })}
        />
      </div>
      <div>
        <label
          htmlFor="confirmPassword"
          className="block mb-2 text-sm font-medium"
        >
          Confirmar contraseña
        </label>
        <input
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          {...register("confirmPassword", { required: true })}
        />
      </div>
      <button
        type="submit"
        disabled={loader}
        className="w-full cursor-pointer font-medium bg-blue-500 text-white rounded-lg text-sm px-5 py-2.5 text-center"
      >
        {loader ? (
          <span className="loading loading-dots loading-md"></span>
        ) : (
          "Crear cuenta"
        )}
      </button>
    </form>
  );
};
