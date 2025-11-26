import { Box, Tab } from "@mui/material";
import PageHeader from "../components/reusable/PageHeader";
import { useState } from "react";
import TabChange from "../components/reusable/TabChange";
import TabPanel from "../components/reusable/TabPanel";
import CatchesTable from "../components/catches/CatchesTable";
import CreateCatchForm from "../components/catches/CreateCatchForm";
import UpdateCatchForm from "../components/catches/UpdateCatchForm";

export default function Catches() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_e: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box width="100vw">
      <Box>
        <PageHeader text="Pagavimai" />
      </Box>

      <TabChange tabValue={tabValue} handleTabChange={handleTabChange}>
        <Tab label="Pagavimų sąrašas" id="catches-tab-0" />
        <Tab label="Sukurti pagavimą" id="catches-tab-1" />
        <Tab label="Atnaujinti pagavimą" id="catches-tab-2" />
      </TabChange>
      <Box sx={{ mt: 8 }} />

      <TabPanel value={tabValue} index={0}>
        <CatchesTable />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <CreateCatchForm />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <UpdateCatchForm />
      </TabPanel>
    </Box>
  );
}
