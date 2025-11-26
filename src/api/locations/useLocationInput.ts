import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface LocationInput {
  name: string;
  address: string;
  type: string;
}

export const useLocationInput = () => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, LocationInput>({
    mutationFn: async (location: LocationInput) => {
      const { data } = await axios.post<string>(
        `${import.meta.env.VITE_BASE_URL}/locations`,
        location
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });
};
