import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import type { SidebarItem } from "./SidebarData";

export default function SidebarItemEntry({ item }: { item: SidebarItem }) {
  return (
    <ListItem key={item.id} disablePadding sx={{ display: "block" }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          px: 2.5,
          justifyContent: "initial",
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            justifyContent: "center",
            alignItems: "center",
            mr: 3,
            color: "primary.contrastText",
          }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText
          primary={item.text}
          sx={{ opacity: 1, color: "primary.contrastText" }}
        />
      </ListItemButton>
    </ListItem>
  );
}
