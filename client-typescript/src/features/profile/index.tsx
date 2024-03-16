import { useEffect } from "react";
import { useProfileStore } from "../../stores/profileStore";
import { UploadImage } from "../../items/UploadImage";
import { ButtonItem } from "../../items/ButtonItem";
import { AvatarItem } from "@/items/AvatarItem";
import { Input } from "@/components/ui/input";

export default function ProfileScreen() {
  const [getUserEpic, userInfo] = useProfileStore((state: any) => [
    state.getUserEpic,
    state.userInfo,
  ]);
  useEffect(() => {
    getUserEpic();
  }, []);
  return (
    <form className="w-full p-6">
      <div className="border-b border-gray-900/10 pb-12">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Profile
          </h2>
          <AvatarItem />
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Username
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                <Input
                  type="text"
                  name="username"
                  id="username"
                  value={userInfo.email}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="col-span-full">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Avatar
            </label>
            <UploadImage />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <ButtonItem
          typeButton="button"
          classNameValue="rounded-md w-20 bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-500"
          nameButton="Cancel"
        />
        <ButtonItem
          typeButton="submit"
          classNameValue="rounded-md w-20 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          nameButton="Save"
        />
      </div>
    </form>
  );
}
