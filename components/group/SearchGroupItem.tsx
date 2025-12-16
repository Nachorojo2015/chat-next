import Image from "next/image";
import Link from "next/link";

interface Props {
  id: string;
  title: string;
  picture: string;
  quantity_members: number;
}

export const SearchGroupItem = ({
  id,
  title,
  picture,
  quantity_members,
}: Props) => {
  

  

  return (
    <Link 
      href={`/g/${id}`}
      className="flex items-center gap-4 hover:bg-gray-100 p-2 rounded-lg transition cursor-pointer"
    >
      <Image
        src={picture}
        alt="group-image"
        width={30}
        height={30}
        className="object-cover rounded-full w-12 h-12"
      />
      <div>
        <p>{title}</p>
        <p>
          {quantity_members > 1
            ? `${quantity_members} miembros`
            : `${quantity_members} miembro`}
        </p>
      </div>
    </Link>
  );
};
