import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Location {
  uuid: string;
  name: string;
  address: string;
  type: string;
}

interface LocationsResponse {
  locations: Location[];
}

export const useGetLocations = () => {
  return useQuery<LocationsResponse, Error>({
    queryKey: ["locations"],
    queryFn: async () => {
      const { data } = await axios.get<LocationsResponse>(
        `${import.meta.env.VITE_BASE_URL}/locations`
      );
      return data;
    },
  });
};
