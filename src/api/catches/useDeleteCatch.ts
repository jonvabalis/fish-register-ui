import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface DeleteCatchData {
  uuid: string;
  user_uuid: string;
}

interface DeleteCatchResponse {
  message: string;
}

export const useDeleteCatch = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteCatchResponse, Error, DeleteCatchData>({
    mutationFn: async (deleteData: DeleteCatchData) => {
      const { data } = await axios.delete<DeleteCatchResponse>(
        `${import.meta.env.VITE_BASE_URL}/catches`,
        { data: deleteData }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["catches"] });
    },
  });
};
