import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { BoxPaper } from "../reusable/BoxPaper";
import { useRegisterUser } from "../../api/user/useRegisterUser";
import { toast } from "react-toastify";

interface RegisterFormProps {
  onSuccess?: () => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registerMutation = useRegisterUser();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerMutation.mutate(
      { email, username, password },
      {
        onSuccess: () => {
          toast.success("Vartotojas sėkmingai užregistruotas!");
          setEmail("");
          setUsername("");
          setPassword("");
          onSuccess?.();
        },
        onError: () => {
          toast.error("Nepavyko užregistruoti vartotojo");
        },
      }
    );
  };

  return (
    <BoxPaper>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="El. paštas"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          label="Vartotojo vardas"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          label="Slaptažodis"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        <Box sx={{ mt: 8 }} />
        <Button
          variant="contained"
          type="submit"
          disabled={registerMutation.isPending}
          sx={{
            display: "flex",
            justifyContent: "center",
            mx: "auto",
            mb: 4,
            px: 4,
          }}
        >
          {registerMutation.isPending ? "Registruojama..." : "Registruotis"}
        </Button>
      </Box>
    </BoxPaper>
  );
}
