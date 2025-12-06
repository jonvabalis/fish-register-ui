import { Button, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateCatch } from "../../api/catches/useCreateCatch";
import { useGetSpecies } from "../../api/species/useGetSpecies";
import { useGetLocations } from "../../api/locations/useGetLocations";
import { useGetRodsByUser } from "../../api/rods/useGetRodsByUser";
import { BoxPaper } from "../reusable/BoxPaper";
import { useAuth } from "../../contexts/AuthContext";

interface CreateCatchFormProps {
  onSuccess?: () => void;
}

const CreateCatchForm = ({ onSuccess }: CreateCatchFormProps) => {
  const [nickname, setNickname] = useState<string>("");
  const [length, setLength] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [caughtAt, setCaughtAt] = useState<string>("");
  const [selectedSpeciesUUID, setSelectedSpeciesUUID] = useState<string>("");
  const [selectedLocationUUID, setSelectedLocationUUID] = useState<string>("");
  const [selectedRodUUID, setSelectedRodUUID] = useState<string>("");

  const { userUUID } = useAuth();
  const { data: speciesData } = useGetSpecies();
  const { data: locationsData } = useGetLocations();
  const { data: rodsData } = useGetRodsByUser(userUUID || "");
  const createCatch = useCreateCatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userUUID || !caughtAt) {
      toast.error("Užpildykite privalomus laukus");
      return;
    }

    const selectedDate = new Date(caughtAt);
    const minDate = new Date("1970-01-01T00:00:01Z");
    const maxDate = new Date("2038-01-19T03:14:07Z");

    if (selectedDate < minDate || selectedDate > maxDate) {
      toast.error("Data turi būti tarp 1970-01-01 ir 2038-01-19");
      return;
    }

    createCatch.mutate(
      {
        users_uuid: userUUID,
        caught_at: caughtAt + ":00Z",
        nickname: nickname || undefined,
        length: length ? parseFloat(length) : undefined,
        weight: weight ? parseFloat(weight) : undefined,
        comment: comment || undefined,
        species_uuid: selectedSpeciesUUID || undefined,
        locations_uuid: selectedLocationUUID || undefined,
        rods_uuid: selectedRodUUID || undefined,
      },
      {
        onSuccess: () => {
          toast.success("Pagavimas sėkmingai sukurtas");
          setNickname("");
          setLength("");
          setWeight("");
          setComment("");
          setCaughtAt("");
          setSelectedSpeciesUUID("");
          setSelectedLocationUUID("");
          setSelectedRodUUID("");
          onSuccess?.();
        },
        onError: () => {
          toast.error("Nepavyko sukurti pagavimo");
        },
      }
    );
  };

  return (
    <BoxPaper>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Data ir laikas *"
          type="datetime-local"
          value={caughtAt}
          onChange={(e) => setCaughtAt(e.target.value)}
          fullWidth
          margin="normal"
          required
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

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Sukurti pagavimą
        </Button>
      </form>
    </BoxPaper>
  );
};

export default CreateCatchForm;
