import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const FooterCus = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "20px",
  padding: "20px",
  background: "#211A2C",
});

export const BoxMenu = styled(Box)({
  alignItems: "center",
  justifyContent: "center",
});

export const MenuItemFooter = styled(Typography)({
  width: "150px",
  padding: "5px 20px",
  fontWeight: "500",
  color: "white",
  textTransform: "uppercase",
  letterSpacing: "1px",
  borderLeft: "1px solid #ffd90c",
  borderRight: "1px solid #ffd90c",
  textAlign: "center",
});
