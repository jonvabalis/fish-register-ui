import Box from "@mui/material/Box";
import PageHeader from "../components/reusable/PageHeader";
import TrophyCard from "../components/trophies/TrophyCard";

export default function HomePage() {
  return (
    <Box width="100vw">
      <PageHeader text="Sveiki atvykę į pagrindinį puslapį!" />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: 4,
          px: 4,
          mt: 6,
        }}
      >
        <TrophyCard
          slot="second"
          rank="2."
          color="silver"
          size={250}
          borderWidth="3px solid"
          boxShadow={3}
          marginBottom={4}
          fallbackImage="https://i.redd.it/p493kfxd5w5a1.png"
        />
        <TrophyCard
          slot="first"
          rank="1."
          color="gold"
          size={300}
          borderWidth="4px solid"
          boxShadow={4}
          marginBottom={0}
          fallbackImage="https://gamtosvaikis.lt/wp-content/uploads/2023/03/Karpis2.webp"
        />
        <TrophyCard
          slot="third"
          rank="3."
          color="#CD7F32"
          size={220}
          borderWidth="3px solid"
          boxShadow={2}
          marginBottom={8}
          fallbackImage="https://aquaforest.eu/wp-content/uploads/2025/06/blazenek-scaled.jpg"
        />
      </Box>
    </Box>
  );
}
