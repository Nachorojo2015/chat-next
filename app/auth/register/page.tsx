import { RegisterForm } from "@/components/auth/RegisterForm";
import { Navigation } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <section className="flex flex-col items-center justify-center px-5 h-dvh">
      <div className="w-full xl:max-w-md bg-white">
        <div>
          <Navigation size={50} className="mx-auto text-blue-500" />
          <h1 className="text-3xl text-center font-bold leading-tight tracking-tight">
            Registro
          </h1>
          <RegisterForm />
          <p className="text-sm font-light text-center mt-2 text-gray-500 dark:text-gray-400">
            ¿Ya tienes una cuenta?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-blue-500 hover:underline"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
