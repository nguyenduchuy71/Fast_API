import { create } from "zustand";
import axios from "axios";
import { configHeaders, handleErrorStatus } from "@/utils/helpers";
import { triggerNotify } from "@/utils/messages";

const BASEURL = import.meta.env.VITE_BACKEND_URL;

export const useProfileStore = create((set) => ({
  userInfo: {},
  error: null,
  getUserEpic: async () => {
    try {
      const accessToken = sessionStorage.getItem("auth");
      const headers = configHeaders(accessToken);
      const res = await axios.get(`${BASEURL}/users/profile/me`, { headers });
      set({ userInfo: res.data });
    } catch (error) {
      handleErrorStatus(error);
    }
  },
  updateUserInfoEpic: async (userUpdate) => {
    try {
      const accessToken = sessionStorage.getItem("auth");
      const headers = configHeaders(accessToken);
      const res = await axios.patch(
        `${BASEURL}/users/update/me`,
        { ...userUpdate },
        { headers }
      );
      set({ userInfo: res.data });
      triggerNotify("Save profile successfull");
    } catch (error) {
      handleErrorStatus(error);
    }
  },
}));
