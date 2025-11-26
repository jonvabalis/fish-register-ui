import { Box, Button, TextField, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { BoxPaper } from "../reusable/BoxPaper";
import { useUpdateRod } from "../../api/rods/useUpdateRod";
import { useGetUsers } from "../../api/user/useGetUsers";
import { useGetRodsByUser } from "../../api/rods/useGetRodsByUser";
import { toast } from "react-toastify";

export default function UpdateRodForm() {
  const [selectedUserUUID, setSelectedUserUUID] = useState("");
  const [uuid, setUuid] = useState("");
  const [nickname, setNickname] = useState("");
  const [brand, setBrand] = useState("");
  const [purchasePlace, setPurchasePlace] = useState("");

  const updateMutation = useUpdateRod();
  const { data: usersData } = useGetUsers();
  const { data: rodsData } = useGetRodsByUser(selectedUserUUID);

  useEffect(() => {
    if (!uuid) {
      setNickname("");
      setBrand("");
      setPurchasePlace("");
    }
  }, [uuid]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updateData: {
      uuid: string;
      nickname?: string;
      brand?: string;
      purchasePlace?: string;
    } = { uuid };

    if (nickname) updateData.nickname = nickname;
    if (brand) updateData.brand = brand;
    if (purchasePlace) updateData.purchasePlace = purchasePlace;

    updateMutation.mutate(updateData, {
      onSuccess: () => {
        toast.success("Meškerė sėkmingai atnaujinta!");
        setSelectedUserUUID("");
        setUuid("");
        setNickname("");
        setBrand("");
        setPurchasePlace("");
      },
      onError: () => {
        toast.error("Nepavyko atnaujinti meškerės");
      },
    });
  };

  return (
    <BoxPaper>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          select
          label="Pasirinkite vartotoją"
          value={selectedUserUUID}
          onChange={(e) => {
            setSelectedUserUUID(e.target.value);
            setUuid("");
          }}
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

        <TextField
          select
          label="Pasirinkite meškerę"
          value={uuid}
          onChange={(e) => setUuid(e.target.value)}
          variant="outlined"
          required
          disabled={!selectedUserUUID}
          sx={{
            display: "flex",
            justifyContent: "center",
            mx: "auto",
            mt: 6,
            width: "400px",
          }}
        >
          {rodsData?.rods?.map((rod) => (
            <MenuItem key={rod.uuid} value={rod.uuid}>
              {rod.nickname} - {rod.brand}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Naujas pavadinimas (neprivaloma)"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
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
          label="Naujas prekės ženklas (neprivaloma)"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
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
          label="Nauja pirkimo vieta (neprivaloma)"
          value={purchasePlace}
          onChange={(e) => setPurchasePlace(e.target.value)}
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
          disabled={updateMutation.isPending}
          sx={{
            display: "flex",
            justifyContent: "center",
            mx: "auto",
            mb: 4,
            px: 4,
          }}
        >
          {updateMutation.isPending ? "Atnaujinama..." : "Atnaujinti meškerę"}
        </Button>
      </Box>
    </BoxPaper>
  );
}
