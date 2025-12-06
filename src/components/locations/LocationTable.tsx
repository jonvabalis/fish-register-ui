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
  Button,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect, useRef } from "react";
import { useGetLocations } from "../../api/locations/useGetLocations";
import { useDeleteLocation } from "../../api/locations/useDeleteLocation";
import { useUpdateLocation } from "../../api/locations/useUpdateLocation";
import { BoxPaper } from "../reusable/BoxPaper";
import { toast } from "react-toastify";

export default function LocationTable() {
  const [editingLocationUUID, setEditingLocationUUID] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  const editFormRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError, error } = useGetLocations();
  const deleteMutation = useDeleteLocation();
  const updateMutation = useUpdateLocation();

  useEffect(() => {
    if (editingLocationUUID && data) {
      const location = data.locations.find(
        (l) => l.uuid === editingLocationUUID
      );
      if (location) {
        setName(location.name || "");
        setAddress(location.address || "");
        setType(location.type || "");
      }
    }
  }, [editingLocationUUID, data]);

  const handleEdit = (locationUUID: string) => {
    setEditingLocationUUID(locationUUID);
    setTimeout(() => {
      editFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 50);
  };

  const handleCancelEdit = () => {
    setEditingLocationUUID("");
    setName("");
    setAddress("");
    setType("");
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingLocationUUID) {
      toast.error("Pasirinkite telkinį");
      return;
    }

    updateMutation.mutate(
      {
        uuid: editingLocationUUID,
        name: name || undefined,
        address: address || undefined,
        type: type || undefined,
      },
      {
        onSuccess: () => {
          toast.success("Telkinys sėkmingai atnaujintas!");
          handleCancelEdit();
        },
        onError: () => {
          toast.error("Nepavyko atnaujinti telkinio");
        },
      }
    );
  };

  const handleDelete = (uuid: string, name: string) => {
    if (window.confirm(`Ar tikrai norite ištrinti telkinį "${name}"?`)) {
      deleteMutation.mutate(
        { uuid },
        {
          onSuccess: () => {
            toast.success("Telkinys sėkmingai ištrintas!");
          },
          onError: () => {
            toast.error("Nepavyko ištrinti telkinio");
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
          Error loading locations: {error?.message}
        </Alert>
      </BoxPaper>
    );
  }

  if (!data?.locations || data.locations.length === 0) {
    return (
      <BoxPaper>
        <Alert severity="info">No locations found</Alert>
      </BoxPaper>
    );
  }

  return (
    <BoxPaper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="locations table">
          <TableHead>
            <TableRow>
              <TableCell>Telkinio pavadinimas</TableCell>
              <TableCell>Telkinio vieta</TableCell>
              <TableCell>Telkinio tipas</TableCell>
              <TableCell align="center">Veiksmai</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.locations.map((location) => (
              <TableRow key={location.uuid}>
                <TableCell>{location.name}</TableCell>
                <TableCell>{location.address}</TableCell>
                <TableCell>{location.type}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(location.uuid)}
                    disabled={
                      deleteMutation.isPending || updateMutation.isPending
                    }
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(location.uuid, location.name)}
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

      {editingLocationUUID && data && (
        <Box
          ref={editFormRef}
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
              label="Telkinio pavadinimas"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Telkinio vieta"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Telkinio tipas"
              value={type}
              onChange={(e) => setType(e.target.value)}
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
                Atnaujinti telkinį
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
