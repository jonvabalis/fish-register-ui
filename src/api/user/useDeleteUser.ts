import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface DeleteUserData {
  uuid: string;
}

interface DeleteUserResponse {
  message: string;
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteUserResponse, Error, DeleteUserData>({
    mutationFn: async (deleteData: DeleteUserData) => {
      const { data } = await axios.delete<DeleteUserResponse>(
        `${import.meta.env.VITE_BASE_URL}/users`,
        { data: deleteData }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
