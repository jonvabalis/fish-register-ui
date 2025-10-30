import { Box, Fade, Paper } from "@mui/material";
import type { ReactNode } from "react";

export const BoxPaper = ({ children }: { children: ReactNode }) => {
  return (
    <Box sx={{ width: "100%", maxWidth: "1000px", mx: "auto" }}>
      <Fade in={true} timeout={500}>
        <Paper
          elevation={5}
          sx={{
            p: { md: 4, sm: 3, xs: 1 },
            borderRadius: 4,
            background: "white",
          }}
        >
          {children}
        </Paper>
      </Fade>
    </Box>
  );
};
