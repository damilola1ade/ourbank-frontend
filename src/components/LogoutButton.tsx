import React from "react";
import { useLogoutMutation } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

export const LogoutButton: React.FC = () => {
  const [logout] = useLogoutMutation();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      if (accessToken) {
        await logout({ accessToken }).unwrap();
        sessionStorage.removeItem("accessToken");
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Button onClick={handleLogout} size={{ base: "sm", lg: "lg" }}>
      Logout
    </Button>
  );
};
