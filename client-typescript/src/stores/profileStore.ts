import { create } from "zustand";
import axios from "axios";
const BASEURL = "http://localhost:8000";

export const useProfileStore = create((set, get) => ({
  userInfo: {},
  error: null,
  getUserEpic: async () => {
    const accessToken = localStorage.getItem("auth");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    const res = await axios.get(`${BASEURL}/users/profile/me`, { headers });
    set({ userInfo: res.data });
  },
}));
