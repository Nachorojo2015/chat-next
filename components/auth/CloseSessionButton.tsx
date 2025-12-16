import { CircleX } from "lucide-react";
import { signOut } from "next-auth/react";

export const CloseSessionButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className="flex items-center gap-2 text-red-500 cursor-pointer"
    >
      <CircleX size={30} />
      Cerrar sesion
    </button>
  );
};
