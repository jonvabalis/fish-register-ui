import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface RodUpdate {
  uuid: string;
  nickname?: string;
  brand?: string;
  purchasePlace?: string;
}

interface UpdateRodResponse {
  message: string;
}

export const useUpdateRod = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateRodResponse, Error, RodUpdate>({
    mutationFn: async (rod: RodUpdate) => {
      const { data } = await axios.patch<UpdateRodResponse>(
        `${import.meta.env.VITE_BASE_URL}/rods`,
        rod
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rods"] });
    },
  });
};
