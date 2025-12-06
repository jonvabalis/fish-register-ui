import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { BoxPaper } from "../reusable/BoxPaper";
import { useLocationInput } from "../../api/locations/useLocationInput";
import { toast } from "react-toastify";

interface LocationInputBoxProps {
  onSuccess?: () => void;
}

export default function LocationInputBox({ onSuccess }: LocationInputBoxProps) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");

  const locationInputMutation = useLocationInput();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    locationInputMutation.mutate(
      { name, address, type },
      {
        onSuccess: () => {
          toast.success("Telkinys sėkmingai pridėtas!");
          setName("");
          setAddress("");
          setType("");
          onSuccess?.();
        },
        onError: () => {
          toast.error("Nepavyko pridėti telkinio");
        },
      }
    );
  };

  return (
    <BoxPaper>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Telkinio pavadinimas"
          value={name}
          required
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
          label="Telkinio vieta"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
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
          label="Vandens telkinio tipas"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          variant="outlined"
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
          disabled={locationInputMutation.isPending}
          sx={{
            display: "flex",
            justifyContent: "center",
            mx: "auto",
            mb: 4,
            px: 4,
          }}
        >
          {locationInputMutation.isPending ? "Siunčiama..." : "Pridėti telkinį"}
        </Button>
      </Box>
    </BoxPaper>
  );
}
