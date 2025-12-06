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
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect } from "react";
import { useGetRodsByUser } from "../../api/rods/useGetRodsByUser";
import { useDeleteRod } from "../../api/rods/useDeleteRod";
import { useUpdateRod } from "../../api/rods/useUpdateRod";
import { useGetUsers } from "../../api/user/useGetUsers";
import { BoxPaper } from "../reusable/BoxPaper";
import { toast } from "react-toastify";

export default function RodsTable() {
  const [selectedUserUUID, setSelectedUserUUID] = useState("");
  const [editingRodUUID, setEditingRodUUID] = useState("");
  const [nickname, setNickname] = useState("");
  const [brand, setBrand] = useState("");
  const [purchasePlace, setPurchasePlace] = useState("");

  const { data: usersData } = useGetUsers();
  const { data, isLoading, isError, error } =
    useGetRodsByUser(selectedUserUUID);
  const deleteMutation = useDeleteRod();
  const updateMutation = useUpdateRod();

  useEffect(() => {
    if (editingRodUUID && data) {
      const rod = data.rods.find((r) => r.uuid === editingRodUUID);
      if (rod) {
        setNickname(rod.nickname || "");
        setBrand(rod.brand || "");
        setPurchasePlace(rod.purchasePlace || "");
      }
    }
  }, [editingRodUUID, data]);

  const handleEdit = (rodUUID: string) => {
    setEditingRodUUID(rodUUID);
  };

  const handleCancelEdit = () => {
    setEditingRodUUID("");
    setNickname("");
    setBrand("");
    setPurchasePlace("");
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingRodUUID) {
      toast.error("Pasirinkite meškerę");
      return;
    }

    updateMutation.mutate(
      {
        uuid: editingRodUUID,
        nickname: nickname || undefined,
        brand: brand || undefined,
        purchasePlace: purchasePlace || undefined,
      },
      {
        onSuccess: () => {
          toast.success("Meškerė sėkmingai atnaujinta!");
          handleCancelEdit();
        },
        onError: () => {
          toast.error("Nepavyko atnaujinti meškerės");
        },
      }
    );
  };

  const handleDelete = (uuid: string, nickname: string) => {
    if (window.confirm(`Ar tikrai norite ištrinti meškerę "${nickname}"?`)) {
      deleteMutation.mutate(
        { uuid },
        {
          onSuccess: () => {
            toast.success("Meškerė sėkmingai ištrinta!");
          },
          onError: () => {
            toast.error("Nepavyko ištrinti meškerės");
          },
        }
      );
    }
  };

  return (
    <BoxPaper>
      <Box sx={{ mb: 4 }}>
        <TextField
          select
          label="Pasirinkite vartotoją"
          value={selectedUserUUID}
          onChange={(e) => setSelectedUserUUID(e.target.value)}
          variant="outlined"
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
      </Box>

      {!selectedUserUUID ? (
        <Alert severity="info">
          Pasirinkite vartotoją, kad pamatytumėte meškeres
        </Alert>
      ) : isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Alert severity="error">
          Klaida įkeliant meškerės: {error?.message}
        </Alert>
      ) : !data?.rods || data.rods.length === 0 ? (
        <Alert severity="info">Šis vartotojas neturi meškerių</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="rods table">
            <TableHead>
              <TableRow>
                <TableCell>UUID</TableCell>
                <TableCell>Pavadinimas</TableCell>
                <TableCell>Prekės ženklas</TableCell>
                <TableCell>Pirkimo vieta</TableCell>
                <TableCell align="center">Veiksmai</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.rods.map((rod) => (
                <TableRow
                  key={rod.uuid}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {rod.uuid}
                  </TableCell>
                  <TableCell>{rod.nickname}</TableCell>
                  <TableCell>{rod.brand}</TableCell>
                  <TableCell>{rod.purchasePlace}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(rod.uuid)}
                      disabled={
                        deleteMutation.isPending || updateMutation.isPending
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(rod.uuid, rod.nickname)}
                      disabled={
                        deleteMutation.isPending || updateMutation.isPending
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {editingRodUUID && data && (
        <Box
          sx={{
            mt: 4,
            p: 3,
            border: "2px solid",
            borderColor: "primary.main",
            borderRadius: 2,
          }}
        >
          <form onSubmit={handleUpdate}>
            <TextField
              label="Pavadinimas"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Prekės ženklas"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Pirkimo vieta"
              value={purchasePlace}
              onChange={(e) => setPurchasePlace(e.target.value)}
              fullWidth
              margin="normal"
            />

            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={updateMutation.isPending}
              >
                Atnaujinti meškerę
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={handleCancelEdit}
                disabled={updateMutation.isPending}
              >
                Atšaukti
              </Button>
            </Box>
          </form>
        </Box>
      )}
    </BoxPaper>
  );
}
