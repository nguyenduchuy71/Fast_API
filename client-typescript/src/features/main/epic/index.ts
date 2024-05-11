import { create } from 'zustand';
import axios from 'axios';
import { configHeaders, handleErrorStatus } from '@/utils/helpers';
import { IShareStore } from './interface';
const BASEURL = import.meta.env.VITE_BACKEND_URL;

export const useShareStore = create<IShareStore>((set) => ({
  friends: [],
  shareImages: [],
  error: null,
  isLoading: false,
  getFriendsEpic: async () => {
    try {
      const accessToken = sessionStorage.getItem('auth');
      const headers = configHeaders(accessToken);
      const res = await axios.get(`${BASEURL}/users/friends/me`, { headers });
      const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      const listFriend = res.data.filter((item) => item.email !== userInfo.email);
      if (res.status === 200) {
        set({ friends: listFriend });
      }
      set({ isLoading: true });
    } catch (error) {
      handleErrorStatus(error);
    }
  },
  getShareItemEpic: async (friendId: string) => {
    try {
      const accessToken = sessionStorage.getItem('auth');
      const headers = configHeaders(accessToken);
      const res = await axios.get(`${BASEURL}/users/share/${friendId}`, { headers });
      if (res.status === 200) {
        set({ shareImages: res.data });
      }
      set({ isLoading: true });
    } catch (error) {
      handleErrorStatus(error);
    }
  },
}));
