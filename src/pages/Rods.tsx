import { Box, Tab } from "@mui/material";
import PageHeader from "../components/reusable/PageHeader";
import { useState } from "react";
import TabChange from "../components/reusable/TabChange";
import TabPanel from "../components/reusable/TabPanel";
import RodsTable from "../components/rods/RodsTable";
import CreateRodForm from "../components/rods/CreateRodForm";
import UpdateRodForm from "../components/rods/UpdateRodForm";

export default function Rods() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_e: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box width="100vw">
      <Box>
        <PageHeader text="Meškerės" />
      </Box>

      <TabChange tabValue={tabValue} handleTabChange={handleTabChange}>
        <Tab label="Meškerių sąrašas" id="rods-tab-0" />
        <Tab label="Pridėti meškerę" id="rods-tab-1" />
        <Tab label="Atnaujinti meškerę" id="rods-tab-2" />
      </TabChange>
      <Box sx={{ mt: 8 }} />

      <TabPanel value={tabValue} index={0}>
        <RodsTable />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <CreateRodForm />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <UpdateRodForm />
      </TabPanel>
    </Box>
  );
}
