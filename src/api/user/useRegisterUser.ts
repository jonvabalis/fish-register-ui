import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface RegisterData {
  email: string;
  username: string;
  password: string;
}

interface RegisterResponse {
  message: string;
}

export const useRegisterUser = () => {
  return useMutation<RegisterResponse, Error, RegisterData>({
    mutationFn: async (registerData: RegisterData) => {
      const { data } = await axios.post<RegisterResponse>(
        `${import.meta.env.VITE_BASE_URL}/register`,
        registerData
      );
      return data;
    },
  });
};
