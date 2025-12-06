import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface UpdateLocationData {
  uuid: string;
  name?: string;
  address?: string;
  type?: string;
}

interface UpdateLocationResponse {
  location: {
    uuid: string;
    name: string;
    address: string;
    type: string;
  };
}

export const useUpdateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateLocationResponse, Error, UpdateLocationData>({
    mutationFn: async (locationData: UpdateLocationData) => {
      const { data } = await axios.patch<UpdateLocationResponse>(
        `${import.meta.env.VITE_BASE_URL}/locations`,
        locationData
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });
};
