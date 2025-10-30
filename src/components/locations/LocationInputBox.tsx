import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { BoxPaper } from "../reusable/BoxPaper";
import { useLocationInput } from "../../api/locations/useLocationInput";

export default function LocationInputBox() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");

  const locationInputMutation = useLocationInput();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    locationInputMutation.mutate(
      { name, address, type },
      {
        onSuccess: (data) => {
          console.log("Success:", data);
          setName("");
          setAddress("");
          setType("");
        },
        onError: (error) => {
          console.error("Error:", error);
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
          sx={{
            border: "solid",
            backgroundColor: "green",
            display: "flex",
            justifyContent: "center",
            mx: "auto",
          }}
          type="submit"
        >
          Paspausk mane
        </Button>
      </Box>
    </BoxPaper>
  );
}
