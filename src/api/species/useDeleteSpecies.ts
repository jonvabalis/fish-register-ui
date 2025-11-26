import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface DeleteSpeciesData {
  uuid: string;
}

interface DeleteSpeciesResponse {
  message: string;
}

export const useDeleteSpecies = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteSpeciesResponse, Error, DeleteSpeciesData>({
    mutationFn: async (deleteData: DeleteSpeciesData) => {
      const { data } = await axios.delete<DeleteSpeciesResponse>(
        `${import.meta.env.VITE_BASE_URL}/species`,
        { data: deleteData }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["species"] });
    },
  });
};
