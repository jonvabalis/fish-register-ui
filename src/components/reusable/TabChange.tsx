import { Box, Tabs, Tab } from "@mui/material";
import { BoxPaper } from "./BoxPaper";
import type { ReactNode } from "react";

interface TabChangeProps {
  tabValue: number;
  handleTabChange: (_e: React.SyntheticEvent, newValue: number) => void;
  children: ReactNode;
}

export default function TabChange({
  tabValue,
  handleTabChange,
  children,
}: TabChangeProps) {
  return (
    <BoxPaper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            [`& .MuiTabs-flexContainer`]: {
              flexWrap: "wrap",
              justifyContent: "center",
            },
            "& .MuiTabs-indicator": {
              display: "none",
            },
          }}
        >
          {children}
        </Tabs>
      </Box>
    </BoxPaper>
  );
}
