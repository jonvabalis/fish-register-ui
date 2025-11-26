import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface User {
  uuid: string;
  email: string;
  username: string;
}

interface UsersResponse {
  users: User[];
}

export const useGetUsers = () => {
  return useQuery<UsersResponse, Error>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get<UsersResponse>(
        `${import.meta.env.VITE_BASE_URL}/users`
      );
      return data;
    },
  });
};
