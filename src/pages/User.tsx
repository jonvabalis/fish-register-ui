import { Box } from "@mui/material";
import PageHeader from "../components/reusable/PageHeader";
import UsersTable from "../components/user/UsersTable";

export default function User() {
  return (
    <Box width="100vw">
      <Box>
        <PageHeader text="Vartotojų valdymas" />
      </Box>
      <Box sx={{ mt: 8 }} />
      <UsersTable />
    </Box>
  );
}
