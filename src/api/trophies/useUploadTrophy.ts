import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type TrophySlot = "first" | "second" | "third";

interface UploadTrophyParams {
  file: File;
  slot: TrophySlot;
}

export const useUploadTrophy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ file, slot }: UploadTrophyParams) => {
      const formData = new FormData();
      formData.append("photo", file);
      formData.append("slot", slot);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/upload/trophies`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trophies"] });
    },
  });
};
