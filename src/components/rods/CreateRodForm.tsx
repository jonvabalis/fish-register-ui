import { Box, Button, TextField, MenuItem } from "@mui/material";
import { useState } from "react";
import { BoxPaper } from "../reusable/BoxPaper";
import { useCreateRod } from "../../api/rods/useCreateRod";
import { useGetUsers } from "../../api/user/useGetUsers";
import { toast } from "react-toastify";

export default function CreateRodForm() {
  const [nickname, setNickname] = useState("");
  const [brand, setBrand] = useState("");
  const [purchasePlace, setPurchasePlace] = useState("");
  const [userUUID, setUserUUID] = useState("");

  const createMutation = useCreateRod();
  const { data: usersData } = useGetUsers();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMutation.mutate(
      { nickname, brand, purchasePlace, userUUID },
      {
        onSuccess: () => {
          toast.success("Meškerė sėkmingai pridėta!");
          setNickname("");
          setBrand("");
          setPurchasePlace("");
          setUserUUID("");
        },
        onError: () => {
          toast.error("Nepavyko pridėti meškerės");
        },
      }
    );
  };

  return (
    <BoxPaper>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Meškerės pavadinimas"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          variant="outlined"
          required
          sx={{
            display: "flex",
            justifyContent: "center",
            mx: "auto",
            mt: 6,
            width: "400px",
          }}
        />
        <TextField
          label="Prekės ženklas"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          variant="outlined"
          required
          sx={{
            display: "flex",
            justifyContent: "center",
            mx: "auto",
            mt: 6,
            width: "400px",
          }}
        />
        <TextField
          label="Pirkimo vieta"
          value={purchasePlace}
          onChange={(e) => setPurchasePlace(e.target.value)}
          variant="outlined"
          required
          sx={{
            display: "flex",
            justifyContent: "center",
            mx: "auto",
            mt: 6,
            width: "400px",
          }}
        />
        <TextField
          select
          label="Pasirinkite vartotoją"
          value={userUUID}
          onChange={(e) => setUserUUID(e.target.value)}
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
          {usersData?.users?.map((user) => (
            <MenuItem key={user.uuid} value={user.uuid}>
              {user.username} ({user.email})
            </MenuItem>
          ))}
        </TextField>
        <Box sx={{ mt: 8 }} />
        <Button
          variant="contained"
          type="submit"
          disabled={createMutation.isPending}
          sx={{
            display: "flex",
            justifyContent: "center",
            mx: "auto",
            mb: 4,
            px: 4,
          }}
        >
          {createMutation.isPending ? "Siunčiama..." : "Pridėti meškerę"}
        </Button>
      </Box>
    </BoxPaper>
  );
}
