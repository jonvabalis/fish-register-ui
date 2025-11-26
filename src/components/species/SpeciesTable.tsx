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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGetSpecies } from "../../api/species/useGetSpecies";
import { useDeleteSpecies } from "../../api/species/useDeleteSpecies";
import { BoxPaper } from "../reusable/BoxPaper";
import { toast } from "react-toastify";

export default function SpeciesTable() {
  const { data, isLoading, isError, error } = useGetSpecies();
  const deleteMutation = useDeleteSpecies();

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
                    color="error"
                    onClick={() => handleDelete(species.uuid, species.name)}
                    disabled={deleteMutation.isPending}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BoxPaper>
  );
}
