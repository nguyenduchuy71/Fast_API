import React, { useEffect, useState } from "react";
import Login from "../components/Login";
import { useAuthStore } from "../stores/authStore";

function SignInScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [authToken] = useAuthStore((state) => [state.authToken]);
  if (authToken) {
    window.location.href = "http://localhost:3000";
  }
  useEffect(() => {
    if (window.location.href.includes("signup")) {
      setIsLogin(false);
    }
  }, []);
  return <Login isLogin={isLogin} setIsLogin={setIsLogin} />;
}

export default SignInScreen;
