import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const userString = sessionStorage.getItem("user");
    let accessToken = "";

    if (userString) {
      const user = JSON.parse(userString);
      accessToken = user.accessToken;
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// import axios, { AxiosError } from "axios";

// interface BaseQueryArgs {
//   url: string;
//   method: string;
//   data?: any;
//   params?: string;
//   headers?: any;
// }

// export const axiosBaseQuery =
//   ({ baseUrl }: { baseUrl: string }) =>
//   async ({ url, method, data, params, headers }: BaseQueryArgs) => {
//     try {
//       const response = await axios({
//         url: `${baseUrl}/${url}`,
//         method,
//         data,
//         params,
//       });
//       return { data: response.data };
//     } catch (axiosError) {
//       const error = axiosError as AxiosError;
//       return {
//         error: error.response ? error.response.data : error.message,
//       };
//     }
//   };
