import { Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUpdateCatch } from "../../api/catches/useUpdateCatch";
import { useGetCatchesByUser } from "../../api/catches/useGetCatchesByUser";
import { useGetUsers } from "../../api/user/useGetUsers";
import { useGetSpecies } from "../../api/species/useGetSpecies";
import { useGetLocations } from "../../api/locations/useGetLocations";
import { useGetRodsByUser } from "../../api/rods/useGetRodsByUser";
import { BoxPaper } from "../reusable/BoxPaper";

const UpdateCatchForm = () => {
  const [selectedUserUUID, setSelectedUserUUID] = useState<string>("");
  const [selectedCatchUUID, setSelectedCatchUUID] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [length, setLength] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [caughtAt, setCaughtAt] = useState<string>("");
  const [selectedSpeciesUUID, setSelectedSpeciesUUID] = useState<string>("");
  const [selectedLocationUUID, setSelectedLocationUUID] = useState<string>("");
  const [selectedRodUUID, setSelectedRodUUID] = useState<string>("");

  const { data: usersData } = useGetUsers();
  const { data: catchesData } = useGetCatchesByUser(selectedUserUUID);
  const { data: speciesData } = useGetSpecies();
  const { data: locationsData } = useGetLocations();
  const { data: rodsData } = useGetRodsByUser(selectedUserUUID);
  const updateCatch = useUpdateCatch();

  useEffect(() => {
    setSelectedCatchUUID("");
    setNickname("");
    setLength("");
    setWeight("");
    setComment("");
    setCaughtAt("");
    setSelectedSpeciesUUID("");
    setSelectedLocationUUID("");
    setSelectedRodUUID("");
  }, [selectedUserUUID]);

  useEffect(() => {
    if (selectedCatchUUID && catchesData) {
      const catchItem = catchesData.catches.find(
        (c) => c.uuid === selectedCatchUUID
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
  }, [selectedCatchUUID, catchesData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCatchUUID) {
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
        uuid: selectedCatchUUID,
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
        },
        onError: () => {
          toast.error("Nepavyko atnaujinti pagavimo");
        },
      }
    );
  };

  return (
    <BoxPaper>
      <form onSubmit={handleSubmit}>
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

        <TextField
          select
          label="Pasirinkite pagavimą"
          value={selectedCatchUUID}
          onChange={(e) => setSelectedCatchUUID(e.target.value)}
          fullWidth
          margin="normal"
          disabled={!selectedUserUUID}
        >
          {catchesData?.catches.map((catchItem) => (
            <MenuItem key={catchItem.uuid} value={catchItem.uuid}>
              {catchItem.nickname || "Be pavadinimo"} -{" "}
              {new Date(catchItem.caught_at).toLocaleDateString("lt-LT")}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Data ir laikas"
          type="datetime-local"
          value={caughtAt}
          onChange={(e) => setCaughtAt(e.target.value)}
          fullWidth
          margin="normal"
          disabled={!selectedCatchUUID}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Pavadinimas"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          fullWidth
          margin="normal"
          disabled={!selectedCatchUUID}
        />

        <TextField
          select
          label="Rūšis"
          value={selectedSpeciesUUID}
          onChange={(e) => setSelectedSpeciesUUID(e.target.value)}
          fullWidth
          margin="normal"
          disabled={!selectedCatchUUID}
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
          disabled={!selectedCatchUUID}
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
          disabled={!selectedCatchUUID}
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
          disabled={!selectedCatchUUID}
          inputProps={{ step: "0.01" }}
        />

        <TextField
          label="Svoris (g)"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          fullWidth
          margin="normal"
          disabled={!selectedCatchUUID}
          inputProps={{ step: "0.01" }}
        />

        <TextField
          label="Komentaras"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
          margin="normal"
          disabled={!selectedCatchUUID}
          multiline
          rows={3}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={!selectedCatchUUID}
        >
          Atnaujinti pagavimą
        </Button>
      </form>
    </BoxPaper>
  );
};

export default UpdateCatchForm;
