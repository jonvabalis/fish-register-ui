import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface SpeciesUpdate {
  uuid: string;
  name?: string;
  description?: string;
}

interface UpdateSpeciesResponse {
  message: string;
}

export const useUpdateSpecies = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateSpeciesResponse, Error, SpeciesUpdate>({
    mutationFn: async (species: SpeciesUpdate) => {
      const { data } = await axios.patch<UpdateSpeciesResponse>(
        `${import.meta.env.VITE_BASE_URL}/species`,
        species
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["species"] });
    },
  });
};
