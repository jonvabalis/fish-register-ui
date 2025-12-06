import { Box, Tab } from "@mui/material";
import PageHeader from "../components/reusable/PageHeader";
import { useState } from "react";
import TabChange from "../components/reusable/TabChange";
import TabPanel from "../components/reusable/TabPanel";
import RegisterForm from "../components/user/RegisterForm";
import UsersTable from "../components/user/UsersTable";
import ChangeLoginForm from "../components/user/ChangeLoginForm";

export default function User() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_e: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box width="100vw">
      <Box>
        <PageHeader text="Vartotojų valdymas" />
      </Box>

      <TabChange tabValue={tabValue} handleTabChange={handleTabChange}>
        <Tab label="Vartotojų sąrašas" id="user-tab-0" />
        <Tab label="Registracija" id="user-tab-1" />
        <Tab label="Keisti prisijungimą" id="user-tab-2" />
      </TabChange>
      <Box sx={{ mt: 8 }} />

      <TabPanel value={tabValue} index={0}>
        <UsersTable />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <RegisterForm onSuccess={() => setTabValue(0)} />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <ChangeLoginForm />
      </TabPanel>
    </Box>
  );
}
