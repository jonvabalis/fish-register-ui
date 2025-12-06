import { Box } from "@mui/material";
import PageHeader from "../components/reusable/PageHeader";
import UsersTable from "../components/user/UsersTable";
import ChangeLoginForm from "../components/user/ChangeLoginForm";

export default function User() {
  return (
    <Box width="100vw">
      <Box>
        <PageHeader text="Profilis" />
      </Box>
      <Box sx={{ mt: 8 }} />
      <ChangeLoginForm />
      <Box sx={{ mt: 8 }} />
      <PageHeader text="Vartotojų sąrašas" />
      <Box sx={{ mt: 4 }} />
      <UsersTable />
    </Box>
  );
}
