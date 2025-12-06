import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useChangeLogin } from "../../api/user/useChangeLogin";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { BoxPaper } from "../reusable/BoxPaper";

export default function ChangeLoginForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const changeLoginMutation = useChangeLogin();
  const { userUUID } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userUUID) {
      toast.error("Vartotojo UUID nerastas");
      return;
    }

    const changeData: {
      uuid: string;
      email?: string;
      username?: string;
      password?: string;
    } = { uuid: userUUID };

    if (email) changeData.email = email;
    if (username) changeData.username = username;
    if (password) changeData.password = password;

    changeLoginMutation.mutate(changeData, {
      onSuccess: () => {
        toast.success("Prisijungimo duomenys sėkmingai atnaujinti!");
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
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Naujas el. paštas (neprivaloma)"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Naujas vartotojo vardas (neprivaloma)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Naujas slaptažodis (neprivaloma)"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={changeLoginMutation.isPending}
        >
          {changeLoginMutation.isPending
            ? "Atnaujinama..."
            : "Atnaujinti duomenis"}
        </Button>
      </Box>
    </BoxPaper>
  );
}
