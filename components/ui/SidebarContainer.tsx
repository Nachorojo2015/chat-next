"use client";

import clsx from "clsx";
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
      className={clsx(
        "relative flex flex-col xl:w-[25%] xl:flex w-full bg-base-200",
        {
          "hidden": chatId,
        }
      )}
    >
      {children}
    </aside>
  );
};
