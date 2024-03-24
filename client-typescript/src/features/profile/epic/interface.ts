export interface IProfileStore {
  userInfo: any;
  error: any;
  getUserEpic: () => void;
  updateUserInfoEpic: (userUpdate: any) => void;
}
