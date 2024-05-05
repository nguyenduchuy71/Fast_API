import { useEffect } from 'react';
import { useShareStore } from './epic';
import { IShareStore } from './epic/interface';
import DropBoxFriend from '@/components/DropBoxFriend';

function MainScreen() {
  const [friends, isLoading, getFriendsEpic] = useShareStore((state: IShareStore) => [
    state.friends,
    state.isLoading,
    state.getFriendsEpic,
  ]);
  useEffect(() => {
    getFriendsEpic();
  }, [getFriendsEpic, isLoading]);

  return (
    <div className="w-full mx-auto p-6">
      {friends.length > 0 && <DropBoxFriend friends={friends} />}
    </div>
  );
}

export default MainScreen;
