import { LoginForm } from "@/components/auth/LoginForm";
import { Navigation } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center h-dvh px-5">
      <div>
        <Navigation size={50} className="mx-auto text-blue-500" />
        <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight">
          Iniciar sesión
        </h2>
        <p className="mt-2 text-center text-sm">
          Por favor ingresa tu nombre de usuario y contraseña
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm />

        <p className="mt-3 text-center text-sm/6 text-gray-400">
          ¿No tienes cuenta?{" "}
          <Link
            href="/auth/register"
            className="font-medium text-blue-500 hover:underline"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
