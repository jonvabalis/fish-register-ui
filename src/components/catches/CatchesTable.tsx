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
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useDeleteCatch } from "../../api/catches/useDeleteCatch";
import { useUpdateCatch } from "../../api/catches/useUpdateCatch";
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
  const [editingCatchUUID, setEditingCatchUUID] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [length, setLength] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [caughtAt, setCaughtAt] = useState<string>("");
  const [selectedSpeciesUUID, setSelectedSpeciesUUID] = useState<string>("");
  const [selectedLocationUUID, setSelectedLocationUUID] = useState<string>("");
  const [selectedRodUUID, setSelectedRodUUID] = useState<string>("");
  const editFormRef = useRef<HTMLDivElement>(null);

  const { data: usersData } = useGetUsers();
  const { data: catchesData, isLoading } =
    useGetCatchesByUser(selectedUserUUID);
  const { data: speciesData } = useGetSpecies();
  const { data: locationsData } = useGetLocations();
  const { data: rodsData } = useGetRodsByUser(selectedUserUUID);
  const deleteCatch = useDeleteCatch();
  const updateCatch = useUpdateCatch();

  useEffect(() => {
    if (editingCatchUUID && catchesData) {
      const catchItem = catchesData.catches.find(
        (c) => c.uuid === editingCatchUUID
      );
      if (catchItem) {
        setNickname(catchItem.nickname || "");
        setLength(catchItem.length?.toString() || "");
        setWeight(catchItem.weight?.toString() || "");
        setComment(catchItem.comment || "");
        setCaughtAt(catchItem.caught_at.slice(0, 16));
        setSelectedSpeciesUUID(catchItem.species_uuid || "");
        setSelectedLocationUUID(catchItem.locations_uuid || "");
        setSelectedRodUUID(catchItem.rods_uuid || "");
      }
    }
  }, [editingCatchUUID, catchesData]);

  const handleEdit = (catchUUID: string) => {
    setEditingCatchUUID(catchUUID);
    setTimeout(() => {
      editFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 50);
  };

  const handleCancelEdit = () => {
    setEditingCatchUUID("");
    setNickname("");
    setLength("");
    setWeight("");
    setComment("");
    setCaughtAt("");
    setSelectedSpeciesUUID("");
    setSelectedLocationUUID("");
    setSelectedRodUUID("");
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingCatchUUID) {
      toast.error("Pasirinkite pagavimą");
      return;
    }

    if (caughtAt) {
      const selectedDate = new Date(caughtAt);
      const minDate = new Date("1970-01-01T00:00:01Z");
      const maxDate = new Date("2038-01-19T03:14:07Z");

      if (selectedDate < minDate || selectedDate > maxDate) {
        toast.error("Data turi būti tarp 1970-01-01 ir 2038-01-19");
        return;
      }
    }

    updateCatch.mutate(
      {
        uuid: editingCatchUUID,
        nickname: nickname || undefined,
        length: length ? parseFloat(length) : undefined,
        weight: weight ? parseFloat(weight) : undefined,
        comment: comment || undefined,
        caught_at: caughtAt ? caughtAt + ":00Z" : undefined,
        species_uuid: selectedSpeciesUUID || undefined,
        locations_uuid: selectedLocationUUID || undefined,
        rods_uuid: selectedRodUUID || undefined,
      },
      {
        onSuccess: () => {
          toast.success("Pagavimas sėkmingai atnaujintas");
          handleCancelEdit();
        },
        onError: () => {
          toast.error("Nepavyko atnaujinti pagavimo");
        },
      }
    );
  };

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
                        color="primary"
                        onClick={() => handleEdit(catchItem.uuid)}
                        disabled={
                          deleteCatch.isPending || updateCatch.isPending
                        }
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() =>
                          handleDelete(catchItem.uuid, catchItem.nickname)
                        }
                        disabled={
                          deleteCatch.isPending || updateCatch.isPending
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
        )
      )}

      {editingCatchUUID && catchesData && (
        <Box
          ref={editFormRef}
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
              label="Data ir laikas"
              type="datetime-local"
              value={caughtAt}
              onChange={(e) => setCaughtAt(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Pavadinimas"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              fullWidth
              margin="normal"
            />

            <TextField
              select
              label="Rūšis"
              value={selectedSpeciesUUID}
              onChange={(e) => setSelectedSpeciesUUID(e.target.value)}
              fullWidth
              margin="normal"
            >
              <MenuItem value="">Nėra</MenuItem>
              {speciesData?.species.map((species) => (
                <MenuItem key={species.uuid} value={species.uuid}>
                  {species.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Vieta"
              value={selectedLocationUUID}
              onChange={(e) => setSelectedLocationUUID(e.target.value)}
              fullWidth
              margin="normal"
            >
              <MenuItem value="">Nėra</MenuItem>
              {locationsData?.locations.map((location) => (
                <MenuItem key={location.uuid} value={location.uuid}>
                  {location.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Meškerė"
              value={selectedRodUUID}
              onChange={(e) => setSelectedRodUUID(e.target.value)}
              fullWidth
              margin="normal"
            >
              <MenuItem value="">Nėra</MenuItem>
              {rodsData?.rods.map((rod) => (
                <MenuItem key={rod.uuid} value={rod.uuid}>
                  {rod.nickname}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Ilgis (cm)"
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              fullWidth
              margin="normal"
              inputProps={{ step: "0.01" }}
            />

            <TextField
              label="Svoris (g)"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              fullWidth
              margin="normal"
              inputProps={{ step: "0.01" }}
            />

            <TextField
              label="Komentaras"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
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
                disabled={updateCatch.isPending}
              >
                Atnaujinti pagavimą
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={handleCancelEdit}
                disabled={updateCatch.isPending}
              >
                Atšaukti
              </Button>
            </Box>
          </form>
        </Box>
      )}
    </BoxPaper>
  );
};

export default CatchesTable;
