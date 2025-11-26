import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface CreateCatchData {
  nickname?: string;
  length?: number;
  weight?: number;
  comment?: string;
  caught_at: string;
  species_uuid?: string;
  locations_uuid?: string;
  users_uuid: string;
  rods_uuid?: string;
}

interface CreateCatchResponse {
  catch: {
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
  };
}

export const useCreateCatch = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateCatchResponse, Error, CreateCatchData>({
    mutationFn: async (catchData: CreateCatchData) => {
      const { data } = await axios.post<CreateCatchResponse>(
        `${import.meta.env.VITE_BASE_URL}/catches`,
        catchData
      );
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["catches", "user", variables.users_uuid],
      });
    },
  });
};
