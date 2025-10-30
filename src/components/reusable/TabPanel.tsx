import { Box } from "@mui/material";
import { type ReactNode } from "react";

interface TabPanelProps {
  value: number;
  index: number;
  children: ReactNode;
}

export default function TabPanel({ value, index, children }: TabPanelProps) {
  return (
    <Box hidden={value !== index} id={`tabpanel-${index}`}>
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}
