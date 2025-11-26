import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface ChangeLoginData {
  uuid: string;
  email?: string;
  username?: string;
  password?: string;
}

interface ChangeLoginResponse {
  message: string;
}

export const useChangeLogin = () => {
  return useMutation<ChangeLoginResponse, Error, ChangeLoginData>({
    mutationFn: async (changeLoginData: ChangeLoginData) => {
      const { data } = await axios.patch<ChangeLoginResponse>(
        `${import.meta.env.VITE_BASE_URL}/change-login`,
        changeLoginData
      );
      return data;
    },
  });
};
