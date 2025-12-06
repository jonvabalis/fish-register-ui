import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginData>({
    mutationFn: async (loginData: LoginData) => {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        loginData
      );
      const authHeader = response.headers["authorization"];
      const token =
        authHeader || response.data.token || response.data.access_token || "";
      return { token };
    },
  });
};
