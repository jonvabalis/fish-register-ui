import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface LocationSpeciesAssociation {
  locationUUID: string;
  speciesUUID: string;
}

interface AddSpeciesResponse {
  message: string;
}

export const useAddSpeciesToLocation = () => {
  const queryClient = useQueryClient();

  return useMutation<AddSpeciesResponse, Error, LocationSpeciesAssociation>({
    mutationFn: async (association: LocationSpeciesAssociation) => {
      const { data } = await axios.post<AddSpeciesResponse>(
        `${import.meta.env.VITE_BASE_URL}/locations/species`,
        association
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
