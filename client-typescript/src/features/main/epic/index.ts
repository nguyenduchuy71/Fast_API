import { create } from 'zustand';
import axios from 'axios';
import { configHeaders, handleErrorStatus } from '@/utils/helpers';
import { IShareStore } from './interface';
const BASEURL = import.meta.env.VITE_BACKEND_URL;

export const useShareStore = create<IShareStore>((set) => ({
  friends: [],
  error: null,
  isLoading: false,
  getFriendsEpic: async () => {
    try {
      const accessToken = sessionStorage.getItem('auth');
      const headers = configHeaders(accessToken);
      const res = await axios.get(`${BASEURL}/users/friends/me`, { headers });
      console.log(res.data);
      const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      const listFriend = res.data.filter((item) => item.email !== userInfo.email);
      set({ friends: listFriend });
      set({ isLoading: true });
    } catch (error) {
      handleErrorStatus(error);
    }
  },
}));
