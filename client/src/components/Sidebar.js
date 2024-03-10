import React from "react";
import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import {
  UserCircleIcon,
  PowerIcon,
  FolderIcon,
  ForwardIcon,
} from "@heroicons/react/24/solid";
import { useAuthStore } from "../stores/authStore";
import CustomIconItem from "./CustomIconItem";

export function Sidebar() {
  const [logoutEpic] = useAuthStore((state) => [state.logoutEpic]);
  const listMenu = [
    {
      name: "Send images",
      icon: ForwardIcon,
      path: "/",
    },
    {
      name: "Collection",
      icon: FolderIcon,
      path: "/collection",
    },
    {
      name: "Profile",
      icon: UserCircleIcon,
      path: "/profile",
    },
  ];
  return (
    <Card className="top-0 h-[calc(100vh)] w-full max-w-[16rem] p-2 shadow-xl shadow-blue-gray-900/5 sticky">
      <div className="flex flex-col justify-between">
        <List>
          {listMenu.map((menu) => (
            <CustomIconItem
              key={menu.name}
              name={menu.name}
              CustomIconImage={menu.icon}
              path={menu.path}
            />
          ))}
        </List>
        <List>
          <ListItem className="py-3" onClick={() => logoutEpic()}>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5 mr-1" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </div>
    </Card>
  );
}
