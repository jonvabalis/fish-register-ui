import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface NewSpecies {
  name: string;
  description: string;
}

interface CreateSpeciesResponse {
  message: string;
}

export const useCreateSpecies = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateSpeciesResponse, Error, NewSpecies>({
    mutationFn: async (species: NewSpecies) => {
      const { data } = await axios.post<CreateSpeciesResponse>(
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
