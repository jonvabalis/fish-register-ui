import Box from "@mui/material/Box";
import PageHeader from "../components/reusable/PageHeader";
import { Typography } from "@mui/material";

export default function HomePage() {
  return (
    <Box width="100vw">
      <PageHeader text="Sveiki atvykę į pagrindinį puslapį!" />
      <Box sx={{ display: "flex" }}>
        <Box sx={{ mr: 4 }}>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            2.
          </Typography>
          <Box
            sx={{
              mt: 12,
              width: 300,
              height: "auto",
              borderRadius: 2,
              mx: "auto",
            }}
            component="img"
            src="https://i.redd.it/p493kfxd5w5a1.png"
          />
        </Box>
        <Box sx={{ mr: 4 }}>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            1.
          </Typography>
          <Box
            sx={{
              mt: 4,
              width: 300,
              height: 300,
              borderRadius: 2,
              mx: "auto",
            }}
            component="img"
            src="https://gamtosvaikis.lt/wp-content/uploads/2023/03/Karpis2.webp"
          />
        </Box>
        <Box>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            3.
          </Typography>
          <Box
            sx={{
              mt: 20,
              width: 300,
              height: 300,
              borderRadius: 2,
              mx: "auto",
            }}
            component="img"
            src="https://aquaforest.eu/wp-content/uploads/2025/06/blazenek-scaled.jpg"
          />
        </Box>
      </Box>
    </Box>
  );
}
