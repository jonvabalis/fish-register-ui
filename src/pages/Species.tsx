import { Box, Tab } from "@mui/material";
import PageHeader from "../components/reusable/PageHeader";
import { useState } from "react";
import TabChange from "../components/reusable/TabChange";
import TabPanel from "../components/reusable/TabPanel";
import SpeciesTable from "../components/species/SpeciesTable";
import CreateSpeciesForm from "../components/species/CreateSpeciesForm";
import LocationSpeciesForm from "../components/species/LocationSpeciesForm";
import LocationSpeciesTable from "../components/species/LocationSpeciesTable";

export default function Species() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_e: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box width="100vw">
      <Box>
        <PageHeader text="Žuvų rūšys" />
      </Box>

      <TabChange tabValue={tabValue} handleTabChange={handleTabChange}>
        <Tab label="Rūšių sąrašas" id="species-tab-0" />
        <Tab label="Pridėti rūšį" id="species-tab-1" />
        <Tab label="Pridėti rūšį prie telkinio" id="species-tab-2" />
        <Tab label="Telkinio rūšys" id="species-tab-3" />
      </TabChange>
      <Box sx={{ mt: 8 }} />

      <TabPanel value={tabValue} index={0}>
        <SpeciesTable />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <CreateSpeciesForm onSuccess={() => setTabValue(0)} />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <LocationSpeciesForm />
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <LocationSpeciesTable />
      </TabPanel>
    </Box>
  );
}
