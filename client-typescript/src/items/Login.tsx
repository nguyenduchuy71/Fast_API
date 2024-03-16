import React, { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ILogin {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Login = ({ isLogin, setIsLogin }: ILogin) => {
  const [loginEpic] = useAuthStore((state: any) => [state.loginEpic]);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();
  const handleLogin = async (e) => {
    e.preventDefault();
    await loginEpic({
      email,
      password,
    });
  };
  const handleCheckLogin = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mx-auto w-full sm:max sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your share logo"
        />
        <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {isLogin ? "Login to your account" : "Create new account"}
        </h2>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Username
            </label>
            <Input
              type="email"
              placeholder="Email"
              onChange={(e: any) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <Input
              type="password"
              onChange={(e: any) => setPassword(e.target.value)}
              required
            />
          </div>
          {!isLogin && (
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
              </div>
              <div className="mt-1">
                <Input
                  type="password"
                  onChange={(e: any) => setRePassword(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <Button variant="default">{isLogin ? "Login" : "Sign up"}</Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          {isLogin ? "Don't have an account?" : "Have an account?"}
          <span
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
            onClick={() => handleCheckLogin()}
          >
            {" "}
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};
