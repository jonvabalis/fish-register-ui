import {
  Alert,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDeleteCatch } from "../../api/catches/useDeleteCatch";
import {
  useGetCatchesByUser,
  type Catch,
} from "../../api/catches/useGetCatchesByUser";
import { useGetUsers } from "../../api/user/useGetUsers";
import { useGetSpecies } from "../../api/species/useGetSpecies";
import { useGetLocations } from "../../api/locations/useGetLocations";
import { useGetRodsByUser } from "../../api/rods/useGetRodsByUser";
import { BoxPaper } from "../reusable/BoxPaper";

const CatchesTable = () => {
  const [selectedUserUUID, setSelectedUserUUID] = useState<string>("");
  const { data: usersData } = useGetUsers();
  const { data: catchesData, isLoading } =
    useGetCatchesByUser(selectedUserUUID);
  const { data: speciesData } = useGetSpecies();
  const { data: locationsData } = useGetLocations();
  const { data: rodsData } = useGetRodsByUser(selectedUserUUID);
  const deleteCatch = useDeleteCatch();

  const handleDelete = (catchUUID: string, nickname: string) => {
    if (!selectedUserUUID) {
      toast.error("Pasirinkite vartotoją");
      return;
    }

    if (
      window.confirm(
        `Ar tikrai norite ištrinti pagavimą "${nickname || "Be pavadinimo"}"?`
      )
    ) {
      deleteCatch.mutate(
        { uuid: catchUUID, user_uuid: selectedUserUUID },
        {
          onSuccess: () => {
            toast.success("Pagavimas sėkmingai ištrintas");
          },
          onError: () => {
            toast.error("Nepavyko ištrinti pagavimo");
          },
        }
      );
    }
  };

  const getSpeciesName = (speciesUUID: string | null) => {
    if (!speciesUUID) return "-";
    const species = speciesData?.species.find((s) => s.uuid === speciesUUID);
    return species?.name || "-";
  };

  const getLocationName = (locationUUID: string | null) => {
    if (!locationUUID) return "-";
    const location = locationsData?.locations.find(
      (l) => l.uuid === locationUUID
    );
    return location?.name || "-";
  };

  const getRodName = (rodUUID: string | null) => {
    if (!rodUUID) return "-";
    const rod = rodsData?.rods.find((r) => r.uuid === rodUUID);
    return rod?.nickname || "-";
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("lt-LT");
  };

  return (
    <BoxPaper>
      <TextField
        select
        label="Pasirinkite vartotoją"
        value={selectedUserUUID}
        onChange={(e) => setSelectedUserUUID(e.target.value)}
        fullWidth
        margin="normal"
      >
        {usersData?.users.map((user) => (
          <MenuItem key={user.uuid} value={user.uuid}>
            {user.username} ({user.email})
          </MenuItem>
        ))}
      </TextField>

      {!selectedUserUUID ? (
        <Alert severity="info">
          Pasirinkite vartotoją, kad pamatytumėte pagavimus
        </Alert>
      ) : isLoading ? (
        <Alert severity="info">Kraunama...</Alert>
      ) : catchesData && catchesData.catches.length === 0 ? (
        <Alert severity="info">Pagavimų nerasta</Alert>
      ) : (
        catchesData &&
        catchesData.catches.length > 0 && (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Pavadinimas</TableCell>
                  <TableCell>Rūšis</TableCell>
                  <TableCell>Vieta</TableCell>
                  <TableCell>Meškerė</TableCell>
                  <TableCell>Ilgis (cm)</TableCell>
                  <TableCell>Svoris (g)</TableCell>
                  <TableCell>Komentaras</TableCell>
                  <TableCell>Sugauta</TableCell>
                  <TableCell>Sukurta</TableCell>
                  <TableCell align="center">Veiksmai</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {catchesData.catches.map((catchItem: Catch) => (
                  <TableRow key={catchItem.uuid}>
                    <TableCell>{catchItem.nickname || "-"}</TableCell>
                    <TableCell>
                      {getSpeciesName(catchItem.species_uuid)}
                    </TableCell>
                    <TableCell>
                      {getLocationName(catchItem.locations_uuid)}
                    </TableCell>
                    <TableCell>{getRodName(catchItem.rods_uuid)}</TableCell>
                    <TableCell>{catchItem.length ?? "-"}</TableCell>
                    <TableCell>{catchItem.weight ?? "-"}</TableCell>
                    <TableCell>{catchItem.comment || "-"}</TableCell>
                    <TableCell>{formatDateTime(catchItem.caught_at)}</TableCell>
                    <TableCell>
                      {formatDateTime(catchItem.created_at)}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="error"
                        onClick={() =>
                          handleDelete(catchItem.uuid, catchItem.nickname)
                        }
                        disabled={deleteCatch.isPending}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      )}
    </BoxPaper>
  );
};

export default CatchesTable;
