import { Box, Button } from "@mui/material";
import { useUploadTrophy } from "../../api/trophies/useUploadTrophy";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import UploadIcon from "@mui/icons-material/Upload";

type TrophySlot = "first" | "second" | "third";

interface TrophyUploadProps {
  slot: TrophySlot;
  label: string;
}

export default function TrophyUpload({ slot, label }: TrophyUploadProps) {
  const uploadMutation = useUploadTrophy();
  const { role } = useAuth();
  const isAdmin = role === "admin";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.includes("jpg")) {
        toast.error("Nuotrauka turi būti JPG formato");
        return;
      }

      uploadMutation.mutate(
        { file, slot },
        {
          onSuccess: () => {
            toast.success("Nuotrauka sėkmingai įkelta!");
          },
          onError: () => {
            toast.error("Nepavyko įkelti nuotraukos");
          },
        }
      );
    }
  };

  if (!isAdmin) return null;

  return (
    <Box sx={{ mt: 2, textAlign: "center" }}>
      <input
        accept="image/jpeg,image/jpg"
        style={{ display: "none" }}
        id={`trophy-upload-${slot}`}
        type="file"
        onChange={handleFileChange}
        disabled={uploadMutation.isPending}
      />
      <label htmlFor={`trophy-upload-${slot}`}>
        <Button
          variant="outlined"
          component="span"
          size="small"
          startIcon={<UploadIcon />}
          disabled={uploadMutation.isPending}
        >
          {uploadMutation.isPending ? "Įkeliama..." : label}
        </Button>
      </label>
    </Box>
  );
}
