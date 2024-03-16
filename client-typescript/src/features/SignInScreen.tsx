import { useEffect, useState } from "react";
import { Login } from "../items/Login";

function SignInScreen() {
  const [isLogin, setIsLogin] = useState(true);
  useEffect(() => {
    if (window.location.href.includes("signup")) {
      setIsLogin(false);
    }
  }, []);
  return <Login isLogin={isLogin} setIsLogin={setIsLogin} />;
}

export default SignInScreen;
