import { useEffect, useState } from "react";
import { Login } from "../../items/Login";
import { useAuthStore } from "../../stores/authStore";

function SignInScreen() {
  const [authToken] = useAuthStore((state: any) => [state.authToken]);
  const [isLogin, setIsLogin] = useState(true);
  useEffect(() => {
    if (authToken) {
      window.location.href = "/";
    }
    if (window.location.href.includes("signup")) {
      setIsLogin(false);
    }
  }, []);
  return <Login isLogin={isLogin} setIsLogin={setIsLogin} />;
}

export default SignInScreen;
