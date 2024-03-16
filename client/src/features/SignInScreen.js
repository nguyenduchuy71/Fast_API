import React, { useEffect, useState } from "react";
import Login from "../components/Login";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";

function SignInScreen() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [authToken] = useAuthStore((state) => [state.authToken]);
  useEffect(() => {
    if (authToken) {
      return navigate("/");
    }
    if (window.location.href.includes("signup")) {
      setIsLogin(false);
    }
  }, []);
  return <Login isLogin={isLogin} setIsLogin={setIsLogin} />;
}

export default SignInScreen;
