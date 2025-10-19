import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PageHeader from "../components/reusable/PageHeader";
import { ROD_DATA } from "../components/rods/RodsData";

export default function rods() {
  return (
    <Box width="100vw">
      <PageHeader text="Meškerės" />
      <Box sx={{ display: "flex", alignItems: "center", mx: 6 }}>
        <Box sx={{ mt: 4 }} />

        <TableContainer component={Paper} elevation={3}>
          <Table
            sx={{
              minWidth: 800,
              boxShadow: 3,
              border: 2,
              borderColor: "orange",
              borderRadius: 2,
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>nickname</TableCell>
                <TableCell>brand</TableCell>
                <TableCell>pirkimo vieta</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ROD_DATA.map((rod) => (
                <TableRow key={rod.id} hover>
                  <TableCell>{rod.id}</TableCell>
                  <TableCell>{rod.nickname}</TableCell>
                  <TableCell>{rod.brand}</TableCell>
                  <TableCell>{rod.purchasePlace}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
