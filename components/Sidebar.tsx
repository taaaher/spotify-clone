"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

import { Song } from "@/types";

import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";

interface SidebarProps {
  children: React.ReactNode;
  songs: Song[];
}

const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
  //Adding a hook over here.
  const pathname = usePathname();
  //In the below route first array was an empty array and the second array is the dependency array.
  const routes = useMemo(
    () => [
      //first object of routes
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      //Second object of routes
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
    ],
    [pathname]
  );

  return (
    <div className="flex h-full">
      <div
        className="
            hidden
            md:flex
            flex-col
            gap-y-2
            bg-black
            h-full
            w-[300px]
            p-2
            "
      >
        <Box>
          <div
            className="
            flex
            flex-col
            gap-y-4
            px-5
            py-4
            "
          >
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-auto py-2">{children}</main>
    </div>
  );
};

export default Sidebar;
