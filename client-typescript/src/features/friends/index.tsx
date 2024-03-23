import ListGroup from "react-bootstrap/ListGroup";
import { SearchItem } from "../../items/SearchItem";
import { ButtonItem } from "../../items/ButtonItem";
import { useEffect } from "react";
import { useFriendStore } from "./epic";
import { useAuthStore } from "../login/epic";
import { IFriendStore } from "./epic/interface";
import { IAuthenStore } from "../login/epic/interface";

function FriendScreen({ socket }) {
  const [friends, friendIds, getUsersEpic, addFriendEpic] = useFriendStore(
    (state: IFriendStore) => [
      state.friends,
      state.friendIds,
      state.getUsersEpic,
      state.addFriendEpic,
    ]
  );
  const [authInfo, getAuthenUserInfo] = useAuthStore((state: IAuthenStore) => [
    state.authInfo,
    state.getAuthenUserInfo,
  ]);

  useEffect(() => {
    getAuthenUserInfo();
    getUsersEpic();
  }, [getAuthenUserInfo, getUsersEpic]);

  const handleAddFriend = (userId: string) => {
    addFriendEpic(userId);
    socket.emit("addFriend", {
      userId: authInfo.userId,
      friendId: userId,
    });
  };

  return (
    <div className="w-full p-6 relative">
      <div className="absolute top-7 right-10">
        <div>
          <ButtonItem
            typeButton="button"
            classNameValue="rounded-md w-30 bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            nameButton="Add friends"
          />
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        <SearchItem type="search" placeholder="Search your friends" />
        <ListGroup className="mx-4">
          {friends.map((person) => (
            <ListGroup.Item
              key={person.email}
              className="flex justify-between gap-x-6 py-5"
            >
              <div className="flex items-center min-w-0 gap-x-4">
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={
                    person.imageUrl
                      ? person.imageUrl
                      : "https://github.com/shadcn.png"
                  }
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {person.email}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center">
                {person.isActive ? (
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full  bg-slate-800/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-slate-800" />
                    </div>
                    <p className="text-xs leading-5 text-gray-500">Offlline</p>
                  </div>
                ) : (
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-xs leading-5 text-gray-500">Online</p>
                  </div>
                )}
                {!friendIds.includes(person.id) ? (
                  <div className="ml-8">
                    <ButtonItem
                      typeButton="button"
                      classNameValue="rounded-md w-20 bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-80"
                      nameButton="Add"
                      action={() => handleAddFriend(person.id)}
                    />
                  </div>
                ) : (
                  <div className="ml-8">
                    <ButtonItem
                      typeButton="button"
                      classNameValue="rounded-md w-20 bg-slate-400 px-3 py-2 text-sm font-semibold text-white shadow-sm"
                      nameButton="Added"
                      action={() => handleAddFriend(person.id)}
                      isDisabled={true}
                    />
                  </div>
                )}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}

export default FriendScreen;
