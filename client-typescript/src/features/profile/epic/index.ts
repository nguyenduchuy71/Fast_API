import { create } from "zustand";
import axios from "axios";
import { configHeaders } from "@/utils/helpers";
const BASEURL = import.meta.env.VITE_BACKEND_URL;

export const useProfileStore = create((set, get) => ({
  userInfo: {},
  error: null,
  getUserEpic: async () => {
    const accessToken = sessionStorage.getItem("auth");
    const headers = configHeaders(accessToken);
    const res = await axios.get(`${BASEURL}/users/profile/me`, { headers });
    set({ userInfo: res.data });
  },
  updateUserInfoEpic: async (userUpdate) => {
    const accessToken = sessionStorage.getItem("auth");
    const headers = configHeaders(accessToken);
    const res = await axios.patch(
      `${BASEURL}/users/update/me`,
      { ...userUpdate },
      { headers }
    );
    set({ userInfo: res.data });
  },
}));
