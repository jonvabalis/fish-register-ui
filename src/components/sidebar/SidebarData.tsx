import SummarizeIcon from "@mui/icons-material/Summarize";
import SetMealIcon from "@mui/icons-material/SetMeal";
import type { JSX } from "react";
import WaterIcon from "@mui/icons-material/Water";
import PhishingIcon from "@mui/icons-material/Phishing";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import InfoIcon from "@mui/icons-material/Info";

export interface SidebarItem {
  id: number;
  text: string;
  link: string;
  icon: JSX.Element;
}

export const SIDEBAR_DATA: SidebarItem[] = [
  {
    id: 0,
    icon: <SummarizeIcon />,
    text: "Homepage",
    link: "/",
  },
  {
    id: 1,
    icon: <SetMealIcon />,
    text: "Species",
    link: "species",
  },
  {
    id: 2,
    icon: <WaterIcon />,
    text: "Locations",
    link: "locations",
  },
  {
    id: 3,
    icon: <PhishingIcon />,
    text: "Rods",
    link: "rods",
  },
  {
    id: 4,
    icon: <PersonIcon />,
    text: "Profile",
    link: "profile",
  },
  {
    id: 5,
    icon: <ShoppingBasketIcon />,
    text: "Catches",
    link: "catches",
  },
  {
    id: 6,
    icon: <InfoIcon />,
    text: "About",
    link: "about",
  },
];
