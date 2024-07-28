import { jwtDecode } from "jwt-decode";

interface jwtPayload {
  name?: string;
}

export const useGetUserDetails = () => {
  const token = sessionStorage.getItem("accessToken");

  if (!token) {
    console.warn("No access token found in sessionStorage.");
    return { user: null };
  }

  try {
    const user = jwtDecode<jwtPayload>(token);
    return { user };
  } catch (error) {
    console.error("Failed to decode token:", error);
    return { user: null };
  }
};
