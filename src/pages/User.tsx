import { Box, Tab } from "@mui/material";
import PageHeader from "../components/reusable/PageHeader";
import UsersTable from "../components/user/UsersTable";
import ChangeLoginForm from "../components/user/ChangeLoginForm";
import TabChange from "../components/reusable/TabChange";
import TabPanel from "../components/reusable/TabPanel";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function User() {
  const [tabValue, setTabValue] = useState(0);
  const { role } = useAuth();
  const isAdmin = role === "admin";

  const handleTabChange = (_e: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (!isAdmin) {
    return (
      <Box width="100vw">
        <Box>
          <PageHeader text="Profilis" />
        </Box>
        <Box sx={{ mt: 8 }} />
        <ChangeLoginForm />
      </Box>
    );
  }

  return (
    <Box width="100vw">
      <Box>
        <PageHeader text="Profilis" />
      </Box>
      <TabChange tabValue={tabValue} handleTabChange={handleTabChange}>
        <Tab label="Vartotojų sąrašas" />
        <Tab label="Slaptažodžio keitimas" />
      </TabChange>
      <Box sx={{ mt: 8 }} />
      <TabPanel value={tabValue} index={0}>
        <UsersTable />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <ChangeLoginForm />
      </TabPanel>
    </Box>
  );
}
