import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Box,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect } from "react";
import { useGetSpecies } from "../../api/species/useGetSpecies";
import { useDeleteSpecies } from "../../api/species/useDeleteSpecies";
import { useUpdateSpecies } from "../../api/species/useUpdateSpecies";
import { BoxPaper } from "../reusable/BoxPaper";
import { toast } from "react-toastify";

export default function SpeciesTable() {
  const [editingSpeciesUUID, setEditingSpeciesUUID] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { data, isLoading, isError, error } = useGetSpecies();
  const deleteMutation = useDeleteSpecies();
  const updateMutation = useUpdateSpecies();

  useEffect(() => {
    if (editingSpeciesUUID && data) {
      const species = data.species.find((s) => s.uuid === editingSpeciesUUID);
      if (species) {
        setName(species.name || "");
        setDescription(species.description || "");
      }
    }
  }, [editingSpeciesUUID, data]);

  const handleEdit = (speciesUUID: string) => {
    setEditingSpeciesUUID(speciesUUID);
  };

  const handleCancelEdit = () => {
    setEditingSpeciesUUID("");
    setName("");
    setDescription("");
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingSpeciesUUID) {
      toast.error("Pasirinkite rūšį");
      return;
    }

    updateMutation.mutate(
      {
        uuid: editingSpeciesUUID,
        name: name || undefined,
        description: description || undefined,
      },
      {
        onSuccess: () => {
          toast.success("Rūšis sėkmingai atnaujinta!");
          handleCancelEdit();
        },
        onError: () => {
          toast.error("Nepavyko atnaujinti rūšies");
        },
      }
    );
  };

  const handleDelete = (uuid: string, name: string) => {
    if (window.confirm(`Ar tikrai norite ištrinti rūšį "${name}"?`)) {
      deleteMutation.mutate(
        { uuid },
        {
          onSuccess: () => {
            toast.success("Rūšis sėkmingai ištrinta!");
          },
          onError: () => {
            toast.error("Nepavyko ištrinti rūšies");
          },
        }
      );
    }
  };

  if (isLoading) {
    return (
      <BoxPaper>
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      </BoxPaper>
    );
  }

  if (isError) {
    return (
      <BoxPaper>
        <Alert severity="error">Klaida įkeliant rūšis: {error?.message}</Alert>
      </BoxPaper>
    );
  }

  if (!data?.species || data.species.length === 0) {
    return (
      <BoxPaper>
        <Alert severity="info">Rūšių nerasta</Alert>
      </BoxPaper>
    );
  }

  return (
    <BoxPaper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="species table">
          <TableHead>
            <TableRow>
              <TableCell>UUID</TableCell>
              <TableCell>Pavadinimas</TableCell>
              <TableCell>Aprašymas</TableCell>
              <TableCell align="center">Veiksmai</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.species.map((species) => (
              <TableRow
                key={species.uuid}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {species.uuid}
                </TableCell>
                <TableCell>{species.name}</TableCell>
                <TableCell>{species.description}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(species.uuid)}
                    disabled={
                      deleteMutation.isPending || updateMutation.isPending
                    }
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(species.uuid, species.name)}
                    disabled={
                      deleteMutation.isPending || updateMutation.isPending
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {editingSpeciesUUID && data && (
        <Box
          sx={{
            mt: 4,
            p: 3,
            border: "2px solid",
            borderColor: "primary.main",
            borderRadius: 2,
          }}
        >
          <form onSubmit={handleUpdate}>
            <TextField
              label="Pavadinimas"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Aprašymas"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="normal"
              multiline
              rows={3}
            />

            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={updateMutation.isPending}
              >
                Atnaujinti rūšį
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={handleCancelEdit}
                disabled={updateMutation.isPending}
              >
                Atšaukti
              </Button>
            </Box>
          </form>
        </Box>
      )}
    </BoxPaper>
  );
}
