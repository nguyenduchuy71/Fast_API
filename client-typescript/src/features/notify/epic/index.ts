import { create } from "zustand";
import axios from "axios";
import { configHeaders, handleErrorStatus } from "@/utils/helpers";
const BASEURL = import.meta.env.VITE_BACKEND_URL;

export const useNotifyStore = create((set) => ({
  notify: [],
  error: null,
  getNotifyEpic: async () => {
    try {
      const accessToken = sessionStorage.getItem("auth");
      const headers = configHeaders(accessToken);
      const res = await axios.get(`${BASEURL}/notifies/me`, { headers });
      set({ notify: res.data });
    } catch (error) {
      handleErrorStatus(error);
    }
  },
}));
