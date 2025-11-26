import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface DeleteRodData {
  uuid: string;
}

interface DeleteRodResponse {
  message: string;
}

export const useDeleteRod = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteRodResponse, Error, DeleteRodData>({
    mutationFn: async (deleteData: DeleteRodData) => {
      const { data } = await axios.delete<DeleteRodResponse>(
        `${import.meta.env.VITE_BASE_URL}/rods`,
        { data: deleteData }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rods"] });
    },
  });
};
