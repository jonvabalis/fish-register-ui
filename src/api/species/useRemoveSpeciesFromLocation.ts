import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { LocationSpeciesAssociation } from "./useAddSpeciesToLocation";

interface RemoveSpeciesResponse {
  message: string;
}

export const useRemoveSpeciesFromLocation = () => {
  const queryClient = useQueryClient();

  return useMutation<RemoveSpeciesResponse, Error, LocationSpeciesAssociation>({
    mutationFn: async (association: LocationSpeciesAssociation) => {
      const { data } = await axios.delete<RemoveSpeciesResponse>(
        `${import.meta.env.VITE_BASE_URL}/locations/species`,
        { data: association }
      );
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["species", "location", variables.locationUUID],
      });
    },
  });
};
