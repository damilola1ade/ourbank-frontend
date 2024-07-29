import React from "react";
import { useLogOutMutation } from "../store/auth";
import { useAppDispatch } from "@/hooks/RTKHooks";
import { logout } from "@/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { toast } from "sonner";

export const LogoutButton: React.FC = () => {
  const [logOut, { isLoading }] = useLogOutMutation();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      const typedError = error as Error;
      toast.error(typedError.message);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      isLoading={isLoading}
      size={{ base: "sm", lg: "lg" }}
    >
      Logout
    </Button>
  );
};
