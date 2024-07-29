import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/RTKHooks";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAppSelector((store) => store.auth);
  return user ? <>{children}</> : <Navigate to="/" replace />;
};
