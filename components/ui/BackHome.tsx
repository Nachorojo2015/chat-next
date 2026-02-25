import { MoveLeft } from "lucide-react";
import Link from "next/link";

export const BackHome = () => {
  return (
    <Link href={"/"} className="transition-colors duration-300 hover:bg-base-300 p-2 rounded-full">
      <MoveLeft />
    </Link>
  );
};

export default BackHome;
