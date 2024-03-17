import { create } from "zustand";
import axios from "axios";
const BASEURL = import.meta.env.VITE_BACKEND_URL;

export const useAuthStore = create((set, get) => ({
  authInfo: {},
  authToken: null,
  error: null,
  loginEpic: async (credentials: any) => {
    const res = await axios.post(`${BASEURL}/login`, credentials);
    sessionStorage.setItem("email", credentials.email);
    sessionStorage.setItem("auth", res.data.token);
    set({ authToken: res.data.token });
    set({ authInfo: { username: credentials.email } });
  },
  signUpEpic: async (credentials: any) => {
    const res = await axios.post(`${BASEURL}/signup`, credentials);
    sessionStorage.setItem("email", credentials.email);
    sessionStorage.setItem("auth", res.data.token);
    set({ authToken: res.data.token });
    set({ authInfo: { username: credentials.email } });
  },
  logoutEpic: () => {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("auth");
  },
  getAuthenTokenEpic: () => {
    set({ authToken: sessionStorage.getItem("auth") });
  },
}));
