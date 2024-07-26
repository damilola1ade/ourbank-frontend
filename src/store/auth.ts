import { createApi } from "@reduxjs/toolkit/query/react";
import { AxiosError } from "axios";
import { axiosInstance } from "../lib/axiosInstance";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  accessToken: string;
  message: string;
}

interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

interface SignInRequest {
  email: string;
  password: string;
}

interface LogoutRequest {
  accessToken: string;
}

const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string }) =>
  async ({
    url,
    method,
    data,
  }: {
    url: string;
    method: string;
    data?: any;
  }) => {
    try {
      const result = await axiosInstance({
        url: `${baseUrl}/${url}`,
        method,
        data,
      });
      return { data: result.data };
    } catch (axiosError) {
      const error = axiosError as AxiosError;
      return {
        error: error.response ? error.response.data : error.message,
      };
    }
  };

  

export const authAPI = createApi({
  reducerPath: "auth",
  baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    signUp: builder.mutation<AuthResponse, SignUpRequest>({
      query: (body) => ({
        url: "auth/signup",
        method: "POST",
        data: body,
      }),
    }),

    login: builder.mutation<AuthResponse, SignInRequest>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        data: body,
      }),
    }),

    logout: builder.mutation<void, LogoutRequest>({
      query: (body) => ({
        url: "auth/logout",
        method: "POST",
        data: body,
      }),
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation, useLogoutMutation } =
  authAPI;
