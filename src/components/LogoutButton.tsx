import React from "react";
import { useLogoutMutation } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export const LogoutButton: React.FC = () => {
  const [logout] = useLogoutMutation();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Assuming you have the token stored somewhere (e.g., in localStorage)
      const accessToken = sessionStorage.getItem("accessToken");
      if (accessToken) {
        await logout({ accessToken }).unwrap();
        sessionStorage.removeItem("accessToken"); // Clear the token from local storage
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return <Button text="Log out" onClick={handleLogout} />;
};
