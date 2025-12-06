import { Box, Tab, Typography } from "@mui/material";
import { useState } from "react";
import TabChange from "../components/reusable/TabChange";
import TabPanel from "../components/reusable/TabPanel";
import { BoxPaper } from "../components/reusable/BoxPaper";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/user/RegisterForm";

export default function Auth() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_e: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "primary.light",
      }}
    >
      <BoxPaper>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            textAlign: "center",
            mb: 3,
            mt: 2,
            color: "primary.main",
            fontWeight: "bold",
          }}
        >
          Žuvų registras
        </Typography>

        <TabChange tabValue={tabValue} handleTabChange={handleTabChange}>
          <Tab label="Prisijungti" />
          <Tab label="Registruotis" />
        </TabChange>

        <TabPanel value={tabValue} index={0}>
          <LoginForm />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <RegisterForm onSuccess={() => setTabValue(0)} />
        </TabPanel>
      </BoxPaper>
    </Box>
  );
}
