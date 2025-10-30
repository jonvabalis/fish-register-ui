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
} from "@mui/material";
import { useGetLocations } from "../../api/locations/useGetLocations";
import { BoxPaper } from "../reusable/BoxPaper";

export default function LocationTable() {
  const { data, isLoading, isError, error } = useGetLocations();

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
        <Alert severity="error">
          Error loading locations: {error?.message}
        </Alert>
      </BoxPaper>
    );
  }

  if (!data?.locations || data.locations.length === 0) {
    return (
      <BoxPaper>
        <Alert severity="info">No locations found</Alert>
      </BoxPaper>
    );
  }

  return (
    <BoxPaper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="locations table">
          <TableHead>
            <TableRow>
              <TableCell>Telkinio pavadinimas</TableCell>
              <TableCell>Telkinio vieta</TableCell>
              <TableCell>Telkinio tipas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.locations.map((location) => (
              <TableRow key={location.uuid}>
                <TableCell>{location.name}</TableCell>
                <TableCell>{location.address}</TableCell>
                <TableCell>{location.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BoxPaper>
  );
}
