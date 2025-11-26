import { Box, Button, TextField, MenuItem } from "@mui/material";
import { useState } from "react";
import { BoxPaper } from "../reusable/BoxPaper";
import { useChangeLogin } from "../../api/user/useChangeLogin";
import { useGetUsers } from "../../api/user/useGetUsers";
import { toast } from "react-toastify";

export default function ChangeLoginForm() {
  const [uuid, setUuid] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const changeLoginMutation = useChangeLogin();
  const { data: usersData } = useGetUsers();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const changeData: {
      uuid: string;
      email?: string;
      username?: string;
      password?: string;
    } = { uuid };

    if (email) changeData.email = email;
    if (username) changeData.username = username;
    if (password) changeData.password = password;

    changeLoginMutation.mutate(changeData, {
      onSuccess: () => {
        toast.success("Prisijungimo duomenys sėkmingai atnaujinti!");
        setUuid("");
        setEmail("");
        setUsername("");
        setPassword("");
      },
      onError: () => {
        toast.error("Nepavyko atnaujinti prisijungimo duomenų");
      },
    });
  };

  return (
    <BoxPaper>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          select
          label="Pasirinkite vartotoją"
          value={uuid}
          onChange={(e) => setUuid(e.target.value)}
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
          label="Naujas el. paštas (neprivaloma)"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          label="Naujas vartotojo vardas (neprivaloma)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          label="Naujas slaptažodis (neprivaloma)"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          disabled={changeLoginMutation.isPending}
          sx={{
            display: "flex",
            justifyContent: "center",
            mx: "auto",
            mb: 4,
            px: 4,
          }}
        >
          {changeLoginMutation.isPending
            ? "Atnaujinama..."
            : "Atnaujinti duomenis"}
        </Button>
      </Box>
    </BoxPaper>
  );
}
