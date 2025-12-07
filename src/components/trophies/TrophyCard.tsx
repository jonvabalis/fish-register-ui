import { Box, Typography, Button } from "@mui/material";
import { useUploadTrophy } from "../../api/trophies/useUploadTrophy";
import { useGetTrophy } from "../../api/trophies/useGetTrophy";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type TrophySlot = "first" | "second" | "third";

interface TrophyCardProps {
  slot: TrophySlot;
  rank: string;
  color: string;
  size: number;
  borderWidth: string;
  boxShadow: number;
  marginBottom: number;
  fallbackImage: string;
}

export default function TrophyCard({
  slot,
  rank,
  color,
  size,
  borderWidth,
  boxShadow,
  marginBottom,
  fallbackImage,
}: TrophyCardProps) {
  const { role } = useAuth();
  const isAdmin = role === "admin";
  const uploadMutation = useUploadTrophy();
  const queryClient = useQueryClient();
  const { data: imageUrl } = useGetTrophy(slot, fallbackImage);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes("jpeg") && !file.type.includes("jpg")) {
      toast.error("Failas turi būti JPG formato");
      return;
    }

    uploadMutation.mutate(
      { file, slot },
      {
        onSuccess: () => {
          toast.success("Nuotrauka sėkmingai įkelta!");
          queryClient.invalidateQueries({ queryKey: ["trophy", slot] });
        },
        onError: () => {
          toast.error("Nepavyko įkelti nuotraukos");
        },
      }
    );
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/upload/trophies/${slot}.jpg`,
        { responseType: "blob" }
      );
      const url = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${slot}.jpg`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success("Nuotrauka atsisiųsta!");
    } catch {
      toast.error("Nepavyko atsisiųsti nuotraukos");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: marginBottom,
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: "bold", color, mb: 2 }}>
        {rank}
      </Typography>
      <Box
        sx={{
          width: size,
          height: size,
          borderRadius: 2,
          boxShadow,
          border: borderWidth,
          borderColor: color,
          overflow: "hidden",
          objectFit: "cover",
        }}
        component="img"
        src={imageUrl || fallbackImage}
        alt={`${rank} place trophy`}
      />

      <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
        <input
          accept="image/jpeg,image/jpg"
          style={{ display: "none" }}
          id={`trophy-upload-${slot}`}
          type="file"
          onChange={handleFileChange}
          disabled={uploadMutation.isPending}
        />
        {isAdmin && (
          <label htmlFor={`trophy-upload-${slot}`}>
            <Button
              variant="contained"
              component="span"
              size="small"
              startIcon={<UploadIcon />}
              disabled={uploadMutation.isPending}
            >
              {uploadMutation.isPending ? "Įkeliama..." : "Įkelti"}
            </Button>
          </label>
        )}
        <Button
          variant="outlined"
          size="small"
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
        >
          Atsisiųsti
        </Button>
      </Box>
    </Box>
  );
}
