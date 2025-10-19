import Box from "@mui/material/Box";
import PageHeader from "../components/reusable/PageHeader";
import { Typography } from "@mui/material";

export default function About() {
  return (
    <Box width="100vw">
      <PageHeader text="Apie" />
      <Box sx={{ mt: 6 }} />
      <Typography sx={{ display: "flex", justifyContent: "center", mx: 10 }}>
        Žuvų registras - tai unikali sistema, skirta daryti su asmenine
        žuvininkyste susijusią apskaitą - registruoti kokios žuvų rūšis buvo
        pagautos tokiam ir tokiam ežere, registruoti kiekvieną žuvies pagavimą
        su žuvies ilgiu bei svoriu ir prisiminimo apie ją komentaru. Taip pat
        planuojama įtraukti meškerių sėkmės statistiką, kad vartotojas galėtų
        sekti, kiek yra pagavęs žuvų su tam tikra meškere. Galėjimas registruoti
        žuvų rušis, registruoti aplankytus ežerus ir specifinę jų fauną turi
        daug potencialo vaikų ugdymo srityje, kadangi toks informacijos kaupimas
        mano informacinėje sistemoje juos skatintų tyrinėti pasaulį ir
        susipažinti su aplinka iš arčiau.
      </Typography>
    </Box>
  );
}
