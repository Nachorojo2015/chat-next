import { getPublicGroups } from "@/actions/group/get-public-groups";
import { useSidebarStore } from "@/store/sidebar-store";
import { MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { SearchGroupItem } from "./SearchGroupItem";
import { toast } from "sonner";

interface SearchGroups {
  id: string;
  title: string;
  picture: string;
  quantity_members: number;
}

export const SearchPublicGroupsMenu = () => {
  const closeCreateGroupMenu = useSidebarStore(
    (state) => state.closeSearchPublicGroupsMenu
  );

  const [searchGroups, setSearchGroups] = useState<SearchGroups[]>([]);

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const getSearchGroups = async () => {
      const { ok, message, publicGroups } = await getPublicGroups();

      setLoader(false);

      if (!ok) {
        return toast.error(message);
      }

      setSearchGroups(publicGroups as SearchGroups[]);
    };

    getSearchGroups();
  }, []);

  return (
    <>
      <nav className="flex items-center gap-6 p-2">
        <button
          onClick={closeCreateGroupMenu}
          className="cursor-pointer transition-colors duration-300 hover:bg-slate-200 p-2 rounded-full"
        >
          <MoveLeft size={24} />
        </button>
        <h2 className="text-xl font-semibold">Grupos públicos</h2>
      </nav>

      <div className="relative flex flex-1">
        <ul className="overflow-y-auto scrollbar-transparent p-3 overflow-x-hidden absolute h-full w-full">
          {loader ? (
            <div className="grid place-content-center h-full">
              <span className="loading loading-dots loading-md"></span>
            </div>
          ) : (
            <>
              {searchGroups.map((group) => (
                <SearchGroupItem
                  key={group.id}
                  id={group.id}
                  title={group.title}
                  picture={group.picture}
                  quantity_members={group.quantity_members}
                />
              ))}
            </>
          )}
        </ul>
      </div>
    </>
  );
};
