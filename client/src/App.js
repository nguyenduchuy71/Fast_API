import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignInScreen from "./features/SignInScreen";
import MainScreen from "./features/MainScreen";
import { useAuthStore } from "./stores/authStore";
import { useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import ProfileScreen from "./features/ProfileScreen";
import CollectionScreen from "./features/CollectionScreen";

function App() {
  const [authToken, getAuthenTokenEpic] = useAuthStore((state) => [
    state.authToken,
    state.getAuthenTokenEpic,
  ]);
  useEffect(() => {
    getAuthenTokenEpic();
  }, []);
  return (
    <div className="min-w-full min-h-screen">
      {!authToken ? (
        <SignInScreen />
      ) : (
        <div className="flex justify-between">
          <Sidebar />
          <Routes>
            <Route path="/" index element={<MainScreen />} />
            <Route path="/collection" element={<CollectionScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/login" element={<SignInScreen />} />
            <Route path="/signup" element={<SignInScreen />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
