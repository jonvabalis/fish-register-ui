import { Typography } from "@mui/material";

interface PageHeaderProps {
  text: string;
}

export default function PageHeader({ text }: PageHeaderProps) {
  return (
    <Typography
      variant="h1"
      sx={{ my: 4, textAlign: "center", color: "primary.contrastText" }}
    >
      {text}
    </Typography>
  );
}
