import { Box, useTheme } from "@mui/material";
import Sidebar from "./components/sidebar/Sidebar.tsx";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Catches from "./pages/Catches.tsx";
import Locations from "./pages/Locations.tsx";
import Rods from "./pages/Rods.tsx";
import User from "./pages/User.tsx";
import Species from "./pages/Species.tsx";
import HomePage from "./pages/HomePage.tsx";
import About from "./pages/About.tsx";
import Auth from "./pages/Auth.tsx";
import { useAuth } from "./contexts/AuthContext.tsx";

function App() {
  const [open, setOpen] = useState(true);
  const toggleSidebar = () => setOpen(!open);
  const theme = useTheme();
  const { token } = useAuth();

  if (!token) {
    return <Auth />;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          bgcolor: "primary.light",
          height: "100vh",
          padding: 1,
          borderRadius: 2,
          overflow: "hidden",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "stretch",
          overflowY: "scroll",
        }}
      >
        <Sidebar open={open} toggleSidebar={toggleSidebar} theme={theme} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catches" element={<Catches />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/rods" element={<Rods />} />
          <Route path="/profile" element={<User />} />
          <Route path="/species" element={<Species />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
