import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGetUsers } from "../../api/user/useGetUsers";
import { useDeleteUser } from "../../api/user/useDeleteUser";
import { BoxPaper } from "../reusable/BoxPaper";
import { toast } from "react-toastify";

export default function UsersTable() {
  const { data, isLoading, isError, error } = useGetUsers();
  const deleteMutation = useDeleteUser();

  const handleDelete = (uuid: string) => {
    if (window.confirm("Ar tikrai norite ištrinti šį vartotoją?")) {
      deleteMutation.mutate(
        { uuid },
        {
          onSuccess: () => {
            toast.success("Vartotojas sėkmingai ištrintas!");
          },
          onError: (error) => {
            toast.error(`Klaida trinant vartotoją: ${error.message}`);
          },
        }
      );
    }
  };

  if (isLoading) {
    return (
      <BoxPaper>
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      </BoxPaper>
    );
  }

  if (isError) {
    return (
      <BoxPaper>
        <Alert severity="error">
          Klaida įkeliant vartotojus: {error?.message}
        </Alert>
      </BoxPaper>
    );
  }

  if (!data?.users || data.users.length === 0) {
    return (
      <BoxPaper>
        <Alert severity="info">Vartotojų nerasta</Alert>
      </BoxPaper>
    );
  }

  return (
    <BoxPaper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>UUID</TableCell>
              <TableCell>El. paštas</TableCell>
              <TableCell>Vartotojo vardas</TableCell>
              <TableCell align="center">Veiksmai</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.users.map((user) => (
              <TableRow
                key={user.uuid}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.uuid}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(user.uuid)}
                    disabled={deleteMutation.isPending}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BoxPaper>
  );
}
