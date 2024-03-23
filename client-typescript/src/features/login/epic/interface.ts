export interface IAuthenStore {
  authInfo: {
    email: string;
    userId: string;
  };
  authToken: string;
  loginEpic: (credentials: any) => void;
  signUpEpic: (credentials: any) => void;
  logoutEpic: () => void;
  getAuthenTokenEpic: () => void;
  getAuthenUserInfo: () => void;
}
