import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Species {
  uuid: string;
  name: string;
  description: string;
}

interface SpeciesResponse {
  species: Species[];
}

export const useGetSpecies = () => {
  return useQuery<SpeciesResponse, Error>({
    queryKey: ["species"],
    queryFn: async () => {
      const { data } = await axios.get<SpeciesResponse>(
        `${import.meta.env.VITE_BASE_URL}/species`
      );
      return data;
    },
  });
};
