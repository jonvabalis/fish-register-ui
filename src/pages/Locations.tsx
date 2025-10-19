import { Box, Button, TextField, Typography } from "@mui/material";
import PageHeader from "../components/reusable/PageHeader";
import { useState } from "react";

export default function locations() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");

  return (
    <Box width="100vw">
      <PageHeader text="Įveskite vandens telkinį" />
      <TextField
        label="Name"
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
        label="Address"
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
        label="Type"
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
      >
        Paspausk mane
      </Button>

      <Box sx={{ mt: 8 }} />
      <Typography sx={{ display: "flex", alignItems: "center" }}>
        {name + " " + address + " " + type}
      </Typography>
    </Box>
  );
}
