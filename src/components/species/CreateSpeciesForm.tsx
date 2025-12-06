import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { BoxPaper } from "../reusable/BoxPaper";
import { useCreateSpecies } from "../../api/species/useCreateSpecies";
import { toast } from "react-toastify";

interface CreateSpeciesFormProps {
  onSuccess?: () => void;
}

export default function CreateSpeciesForm({
  onSuccess,
}: CreateSpeciesFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const createMutation = useCreateSpecies();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMutation.mutate(
      { name, description },
      {
        onSuccess: () => {
          toast.success("Rūšis sėkmingai pridėta!");
          setName("");
          setDescription("");
          onSuccess?.();
        },
        onError: () => {
          toast.error("Nepavyko pridėti rūšies");
        },
      }
    );
  };

  return (
    <BoxPaper>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Rūšies pavadinimas"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          required
          sx={{
            display: "flex",
            justifyContent: "center",
            mx: "auto",
            mt: 6,
            width: "400px",
          }}
        />
        <TextField
          label="Aprašymas"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
          required
          multiline
          rows={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            mx: "auto",
            mt: 6,
            width: "400px",
          }}
        />
        <Box sx={{ mt: 8 }} />
        <Button
          variant="contained"
          type="submit"
          disabled={createMutation.isPending}
          sx={{
            display: "flex",
            justifyContent: "center",
            mx: "auto",
            mb: 4,
            px: 4,
          }}
        >
          {createMutation.isPending ? "Siunčiama..." : "Pridėti rūšį"}
        </Button>
      </Box>
    </BoxPaper>
  );
}
