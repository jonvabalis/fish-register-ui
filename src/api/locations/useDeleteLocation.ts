import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface DeleteLocationData {
  uuid: string;
}

interface DeleteLocationResponse {
  message: string;
}

export const useDeleteLocation = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteLocationResponse, Error, DeleteLocationData>({
    mutationFn: async (deleteData: DeleteLocationData) => {
      const { data } = await axios.delete<DeleteLocationResponse>(
        `${import.meta.env.VITE_BASE_URL}/locations`,
        { data: deleteData }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });
};
