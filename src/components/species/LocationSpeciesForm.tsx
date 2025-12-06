import { Box, Button, TextField, MenuItem } from "@mui/material";
import { useState } from "react";
import { BoxPaper } from "../reusable/BoxPaper";
import { useAddSpeciesToLocation } from "../../api/species/useAddSpeciesToLocation";
import { useGetLocations } from "../../api/locations/useGetLocations";
import { useGetSpecies } from "../../api/species/useGetSpecies";
import { toast } from "react-toastify";

export default function LocationSpeciesForm() {
  const [locationUUID, setLocationUUID] = useState("");
  const [speciesUUID, setSpeciesUUID] = useState("");

  const addMutation = useAddSpeciesToLocation();
  const { data: locationsData } = useGetLocations();
  const { data: speciesData } = useGetSpecies();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addMutation.mutate(
      { locationUUID, speciesUUID },
      {
        onSuccess: () => {
          toast.success("Rūšis sėkmingai pridėta prie telkinio!");
          setLocationUUID("");
          setSpeciesUUID("");
        },
        onError: () => {
          toast.error("Nepavyko pridėti rūšies prie telkinio");
        },
      }
    );
  };

  return (
    <BoxPaper>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          select
          label="Pasirinkite telkinį"
          value={locationUUID}
          onChange={(e) => setLocationUUID(e.target.value)}
          variant="outlined"
          required
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

        <TextField
          select
          label="Pasirinkite rūšį"
          value={speciesUUID}
          onChange={(e) => setSpeciesUUID(e.target.value)}
          variant="outlined"
          required
          sx={{
            display: "flex",
            justifyContent: "center",
            mx: "auto",
            mt: 6,
            width: "400px",
          }}
        >
          {speciesData?.species?.map((species) => (
            <MenuItem key={species.uuid} value={species.uuid}>
              {species.name}
            </MenuItem>
          ))}
        </TextField>

        <Box sx={{ mt: 8 }} />
        <Button
          variant="contained"
          type="submit"
          disabled={addMutation.isPending}
          sx={{
            display: "flex",
            justifyContent: "center",
            mx: "auto",
            mb: 4,
            px: 4,
          }}
        >
          {addMutation.isPending
            ? "Siunčiama..."
            : "Pridėti rūšį prie telkinio"}
        </Button>
      </Box>
    </BoxPaper>
  );
}
