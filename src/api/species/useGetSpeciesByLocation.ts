import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Species } from "./useGetSpecies";

interface SpeciesByLocationResponse {
  species: Species[];
}

export const useGetSpeciesByLocation = (locationUUID: string) => {
  return useQuery<SpeciesByLocationResponse, Error>({
    queryKey: ["species", "location", locationUUID],
    queryFn: async () => {
      const { data } = await axios.get<SpeciesByLocationResponse>(
        `${import.meta.env.VITE_BASE_URL}/locations/${locationUUID}/species`
      );
      return data;
    },
    enabled: !!locationUUID,
  });
};
