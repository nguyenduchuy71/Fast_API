import { create } from "zustand";
import axios from "axios";
const BASEURL = "http://localhost:8000";

export const useAuthStore = create((set, get) => ({
  authInfo: {},
  authToken: null,
  loginEpic: async (credentials) => {
    const res = await axios.post(`${BASEURL}/login`, credentials);
    localStorage.setItem("auth", res.data.token);
    set({ authToken: res.data.token });
    set({ authInfo: { username: credentials.email } });
  },
  logoutEpic: () => {
    localStorage.removeItem("auth");
    set({ authToken: null });
    set({ authInfo: {} });
  },
  getAuthenTokenEpic: () => {
    set({ authToken: localStorage.getItem("auth") });
  },
}));
