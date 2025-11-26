import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface UpdateCatchData {
  uuid: string;
  nickname?: string;
  length?: number;
  weight?: number;
  comment?: string;
  caught_at?: string;
  species_uuid?: string;
  locations_uuid?: string;
  rods_uuid?: string;
}

interface UpdateCatchResponse {
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

export const useUpdateCatch = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateCatchResponse, Error, UpdateCatchData>({
    mutationFn: async (catchData: UpdateCatchData) => {
      const { data } = await axios.patch<UpdateCatchResponse>(
        `${import.meta.env.VITE_BASE_URL}/catches`,
        catchData
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["catches"] });
    },
  });
};
