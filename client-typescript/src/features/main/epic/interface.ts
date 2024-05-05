export interface IShareStore {
  friends: any[];
  error: any;
  isLoading: boolean;
  getFriendsEpic: () => void;
}
