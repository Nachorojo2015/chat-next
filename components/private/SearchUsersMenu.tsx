import { getUsers } from "@/actions/private/get-users";
import { useSidebarStore } from "@/store/sidebar-store";
import { MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { SearchUsersItem } from "./SearchUsersItem";
import { toast } from "sonner";

interface SearchUsers {
  id: string;
  fullname: string;
  username: string;
  profile_picture: string;
}

export const SearchUsersMenu = () => {
  const closeSearchUsersMenu = useSidebarStore(
    (state) => state.closeSearchUsersMenu
  );

  const [searchUsers, setSearchUsers] = useState<SearchUsers[]>([]);

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const getSearchUsers = async () => {
      const { ok, message, users } = await getUsers();

      setLoader(false);

      if (!ok) {
        return toast.error(message)
      }

      setSearchUsers(users as SearchUsers[]);
    };

    getSearchUsers();
  }, []);

  return (
    <>
      <nav className="flex items-center gap-6 p-2">
        <button
          onClick={closeSearchUsersMenu}
          className="cursor-pointer transition-colors duration-300 hover:bg-slate-200 p-2 rounded-full"
        >
          <MoveLeft size={24} />
        </button>
        <h2 className="text-xl font-semibold">Usuarios</h2>
      </nav>

      <div className="relative flex flex-1">
        <ul className="overflow-y-auto scrollbar-transparent p-3 overflow-x-hidden absolute h-full w-full">
          {loader ? (
            <div className="grid place-content-center h-full">
              <span className="loading loading-dots loading-md"></span>
            </div>
          ) : (
            <>
              {searchUsers.map((user) => (
                <SearchUsersItem
                  key={user.id}
                  id={user.id}
                  fullname={user.fullname}
                  username={user.username}
                  profile_picture={user.profile_picture}
                />
              ))}
            </>
          )}
        </ul>
      </div>
    </>
  );
};
