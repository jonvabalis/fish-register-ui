import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Rod {
  uuid: string;
  nickname: string;
  brand: string;
  purchasePlace: string;
  userUUID: string;
}

interface RodsByUserResponse {
  rods: Rod[];
}

export const useGetRodsByUser = (userUUID: string) => {
  return useQuery<RodsByUserResponse, Error>({
    queryKey: ["rods", "user", userUUID],
    queryFn: async () => {
      const { data } = await axios.get<RodsByUserResponse>(
        `${import.meta.env.VITE_BASE_URL}/users/${userUUID}/rods`
      );
      return data;
    },
    enabled: !!userUUID,
  });
};
