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
  TextField,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useGetSpeciesByLocation } from "../../api/species/useGetSpeciesByLocation";
import { useRemoveSpeciesFromLocation } from "../../api/species/useRemoveSpeciesFromLocation";
import { useGetLocations } from "../../api/locations/useGetLocations";
import { BoxPaper } from "../reusable/BoxPaper";
import { toast } from "react-toastify";

export default function LocationSpeciesTable() {
  const [selectedLocationUUID, setSelectedLocationUUID] = useState("");

  const { data: locationsData } = useGetLocations();
  const { data, isLoading, isError, error } =
    useGetSpeciesByLocation(selectedLocationUUID);
  const removeMutation = useRemoveSpeciesFromLocation();

  const handleDelete = (speciesUUID: string, speciesName: string) => {
    if (
      window.confirm(
        `Ar tikrai norite pašalinti "${speciesName}" iš šio telkinio?`
      )
    ) {
      removeMutation.mutate(
        { locationUUID: selectedLocationUUID, speciesUUID },
        {
          onSuccess: () => {
            toast.success("Rūšis sėkmingai pašalinta iš telkinio!");
          },
          onError: () => {
            toast.error("Nepavyko pašalinti rūšies iš telkinio");
          },
        }
      );
    }
  };

  return (
    <BoxPaper>
      <Box sx={{ mb: 4 }}>
        <TextField
          select
          label="Pasirinkite telkinį"
          value={selectedLocationUUID}
          onChange={(e) => setSelectedLocationUUID(e.target.value)}
          variant="outlined"
          sx={{
            display: "flex",
            justifyContent: "center",
            mx: "auto",
            mt: 6,
            width: "400px",
          }}
        >
          {locationsData?.locations?.map((location) => (
            <MenuItem key={location.uuid} value={location.uuid}>
              {location.name} - {location.address}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {!selectedLocationUUID ? (
        <Alert severity="info">Pasirinkite telkinį pamatyti rūšis</Alert>
      ) : isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Alert severity="error">Klaida įkeliant rūšis: {error?.message}</Alert>
      ) : !data?.species || data.species.length === 0 ? (
        <Alert severity="info">Telkinyje nėra rūšių</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="location species table">
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
                      disabled={removeMutation.isPending}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </BoxPaper>
  );
}
