import { create } from "zustand";
import axios from "axios";
import { handleUpdateFriend } from "@/utils/handleFriend";
import { configHeaders } from "@/utils/helpers";
const BASEURL = import.meta.env.VITE_BACKEND_URL;

export const useFriendStore = create((set, get) => ({
  friends: [],
  friendIds: [],
  error: null,
  getUsersEpic: async () => {
    const accessToken = sessionStorage.getItem("auth");
    const headers = configHeaders(accessToken);
    const res = await axios.get(`${BASEURL}/users`, { headers });
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    const listFriend = res.data.filter((item) => item.email !== userInfo.email);
    const listFriendId = handleUpdateFriend(res.data, userInfo.email);
    set({ friends: listFriend });
    set({ friendIds: listFriendId });
  },
  addFriendEpic: async (friend_id: string) => {
    const accessToken = sessionStorage.getItem("auth");
    const headers = configHeaders(accessToken);
    const res = await axios.post(
      `${BASEURL}/users/addfriend`,
      { friend_id: friend_id },
      {
        headers: headers,
      }
    );
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    const listFriend = res.data.filter((item) => item.email !== userInfo.email);
    const listFriendId = handleUpdateFriend(res.data, userInfo.email);
    set({ friends: listFriend });
    set({ friendIds: listFriendId });
  },
}));
