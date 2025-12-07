import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type TrophySlot = "first" | "second" | "third";

export const useGetTrophy = (slot: TrophySlot, fallbackImage: string) => {
  return useQuery({
    queryKey: ["trophy", slot],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/trophies/${slot}.jpg?t=${Date.now()}`,
          { responseType: "blob" }
        );
        return URL.createObjectURL(response.data);
      } catch {
        return fallbackImage;
      }
    },
  });
};
