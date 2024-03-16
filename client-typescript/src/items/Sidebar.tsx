import {
  UserCircleIcon,
  FolderIcon,
  ForwardIcon,
  UsersIcon,
  ArrowLeftEndOnRectangleIcon,
  BellAlertIcon,
} from "@heroicons/react/24/solid";
import { useAuthStore } from "../stores/authStore";
import { CustomIconItem } from "./CustomIconItem";

export function Sidebar() {
  const [logoutEpic] = useAuthStore((state: any) => [state.logoutEpic]);
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
    {
      name: "Friends",
      icon: UsersIcon,
      path: "/friends",
    },
    {
      name: "Notify",
      icon: BellAlertIcon,
      path: "/notifications",
    },
  ];
  return (
    <div className="top-0 h-[calc(100vh)] w-full max-w-[16rem] bg-sky-500 text-white p-2 shadow-xl shadow-blue-gray-900/5 sticky">
      <div className="flex flex-col justify-between">
        <ul>
          {listMenu.map((menu) => (
            <CustomIconItem
              key={menu.name}
              name={menu.name}
              CustomIconImage={menu.icon}
              path={menu.path}
            />
          ))}
        </ul>
        <ul className="fixed bottom-0">
          <div onClick={() => logoutEpic()}>
            <CustomIconItem
              name="Log Out"
              CustomIconImage={ArrowLeftEndOnRectangleIcon}
              path="/login"
            />
          </div>
        </ul>
      </div>
    </div>
  );
}
