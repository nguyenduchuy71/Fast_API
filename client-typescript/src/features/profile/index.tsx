import { useEffect, useState } from "react";
import { useProfileStore } from "./epic";
import { UploadImage } from "../../components/UploadImage";
import { ButtonItem } from "../../components/ButtonItem";
import { AvatarItem } from "@/components/AvatarItem";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IProfileStore } from "./epic/interface";

export default function ProfileScreen() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [getUserEpic, userInfo, updateUserInfoEpic] = useProfileStore(
    (state: IProfileStore) => [
      state.getUserEpic,
      state.userInfo,
      state.updateUserInfoEpic,
    ]
  );
  useEffect(() => {
    getUserEpic();
  }, [getUserEpic]);

  useEffect(() => {
    setUsername(userInfo.username);
    setBio(userInfo.bio);
  }, [userInfo]);

  const handleUpdateUserInfo = (userInfo: any) => {
    updateUserInfoEpic(userInfo);
  };
  return (
    <div className="w-full p-6">
      <div className="border-b border-gray-900/10 pb-12">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Profile
          </h2>
          <AvatarItem />
        </div>

        <div className="grid grid-cols-2">
          <div className="flex justify-between flex-col">
            <div>
              <label className="block text-sm font-medium leading-6 mb-1 text-gray-900">
                Email
              </label>
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                <Input
                  type="text"
                  name="email"
                  id="email"
                  value={userInfo.email}
                  disabled={true}
                />
              </div>
            </div>

            <div className="mt-2">
              <label className="block text-sm font-medium leading-6 mb-1 text-gray-900">
                Username
              </label>
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                <Input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  onChange={(e: any) => setUsername(e.target.value)}
                  value={username}
                />
              </div>
            </div>

            <div className="mt-2">
              <label className="block text-sm font-medium leading-6 mb-1 text-gray-900">
                BIO
              </label>
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                <Textarea
                  placeholder="Type your bio here."
                  value={bio}
                  onChange={(e: any) => setBio(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 sm:col-span-1">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Avatar
            </label>
            <UploadImage handleFileChange={() => {}} />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <ButtonItem
          typeButton="submit"
          classNameValue="rounded-md w-20 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          nameButton="Save"
          action={() =>
            handleUpdateUserInfo({ email: userInfo.email, username, bio })
          }
        />
      </div>
    </div>
  );
}
