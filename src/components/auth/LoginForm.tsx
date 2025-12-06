import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { useLogin } from "../../api/auth/useLogin";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useAuth();
  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Užpildykite visus laukus");
      return;
    }

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          const token =
            typeof data.token === "string" && data.token.startsWith("Bearer ")
              ? data.token.substring(7)
              : data.token;
          setToken(token);
          toast.success("Sėkmingai prisijungta!");
          setEmail("");
          setPassword("");
        },
        onError: () => {
          toast.error("Nepavyko prisijungti");
        },
      }
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="El. paštas"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Slaptažodis"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? "Jungiamasi..." : "Prisijungti"}
      </Button>
    </Box>
  );
}
