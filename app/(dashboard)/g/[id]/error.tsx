"use client";

import { UsersRound } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);

    document.title = "Grupo desconocido"
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-dvh gap-2">
      <UsersRound size={50} />
      <p className="mt-2">{error.message}</p>
    </div>
  );
}
