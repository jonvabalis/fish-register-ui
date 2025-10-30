import { Box, Tab } from "@mui/material";
import PageHeader from "../components/reusable/PageHeader";
import { useState } from "react";
import TabChange from "../components/reusable/TabChange";
import LocationInputBox from "../components/locations/LocationInputBox";
import TabPanel from "../components/reusable/TabPanel";
import LocationTable from "../components/locations/LocationTable";

export default function locations() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_e: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box width="100vw">
      <Box>
        <PageHeader text="Vandens telkiniai" />
      </Box>

      <TabChange tabValue={tabValue} handleTabChange={handleTabChange}>
        <Tab label="Vietų sąrašas" id="location-tab-0" />
        <Tab label="Pridėti vietą" id="location-tab-1" />
      </TabChange>
      <Box sx={{ mt: 8 }} />

      <TabPanel value={tabValue} index={0}>
        <LocationTable />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <LocationInputBox />
      </TabPanel>
    </Box>
  );
}
