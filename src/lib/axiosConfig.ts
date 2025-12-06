import axios from "axios";

let currentToken: string | null = null;

axios.interceptors.request.use(
  (config) => {
    const isAuthEndpoint =
      config.url?.includes("/login") ||
      config.url?.includes("/register") ||
      config.url?.includes("/change-login");

    if (!isAuthEndpoint && currentToken) {
      config.headers.Authorization = `Bearer ${currentToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const setAuthToken = (token: string | null) => {
  currentToken = token;
};
