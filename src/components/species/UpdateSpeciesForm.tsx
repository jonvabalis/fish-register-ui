import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { BoxPaper } from "../reusable/BoxPaper";
import { useUpdateSpecies } from "../../api/species/useUpdateSpecies";
import { toast } from "react-toastify";

export default function UpdateSpeciesForm() {
  const [uuid, setUuid] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const updateMutation = useUpdateSpecies();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updateData: {
      uuid: string;
      name?: string;
      description?: string;
    } = { uuid };

    if (name) updateData.name = name;
    if (description) updateData.description = description;

    updateMutation.mutate(updateData, {
      onSuccess: () => {
        toast.success("Rūšis sėkmingai atnaujinta!");
        setUuid("");
        setName("");
        setDescription("");
      },
      onError: (error) => {
        console.error("Error:", error);
        toast.error("Nepavyko atnaujinti rūšies");
      },
    });
  };

  return (
    <BoxPaper>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Rūšies UUID (privaloma)"
          value={uuid}
          onChange={(e) => setUuid(e.target.value)}
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
          label="Naujas pavadinimas (neprivaloma)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          sx={{
            display: "flex",
            justifyContent: "center",
            mx: "auto",
            mt: 6,
            width: "400px",
          }}
        />
        <TextField
          label="Naujas aprašymas (neprivaloma)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
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
          disabled={updateMutation.isPending}
          sx={{
            display: "flex",
            justifyContent: "center",
            mx: "auto",
            mb: 4,
            px: 4,
          }}
        >
          {updateMutation.isPending ? "Atnaujinama..." : "Atnaujinti rūšį"}
        </Button>
      </Box>
    </BoxPaper>
  );
}
