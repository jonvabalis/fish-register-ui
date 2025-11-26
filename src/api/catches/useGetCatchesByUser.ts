import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Catch {
  uuid: string;
  nickname: string;
  length: number | null;
  weight: number | null;
  comment: string;
  caught_at: string;
  created_at: string;
  species_uuid: string | null;
  locations_uuid: string | null;
  users_uuid: string;
  rods_uuid: string | null;
}

interface CatchesByUserResponse {
  catches: Catch[];
}

export const useGetCatchesByUser = (userUUID: string) => {
  return useQuery<CatchesByUserResponse, Error>({
    queryKey: ["catches", "user", userUUID],
    queryFn: async () => {
      const { data } = await axios.get<CatchesByUserResponse>(
        `${import.meta.env.VITE_BASE_URL}/users/${userUUID}/catches`
      );
      return data;
    },
    enabled: !!userUUID,
  });
};
