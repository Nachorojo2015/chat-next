"use client";

import { usePathname } from "next/navigation";

export const SidebarContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const location = usePathname();
  const chatId = location.split("/").pop();

  return (
    <aside
      className={`relative flex flex-col xl:w-[25%] xl:flex w-full bg-base-200 ${
        chatId ? "hidden" : "flex"
      }`}
    >
      {children}
    </aside>
  );
};
