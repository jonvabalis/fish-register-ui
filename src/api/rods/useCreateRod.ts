import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface NewRod {
  nickname: string;
  brand: string;
  purchasePlace: string;
  userUUID: string;
}

interface CreateRodResponse {
  message: string;
}

export const useCreateRod = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateRodResponse, Error, NewRod>({
    mutationFn: async (rod: NewRod) => {
      const { data } = await axios.post<CreateRodResponse>(
        `${import.meta.env.VITE_BASE_URL}/rods`,
        rod
      );
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["rods", "user", variables.userUUID],
      });
    },
  });
};
