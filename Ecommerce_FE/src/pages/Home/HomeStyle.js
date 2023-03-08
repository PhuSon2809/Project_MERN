import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BoxPr = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "30px",
});

export const Title = styled(Typography)({
  textAlign: "left",
  padding: "3px 15px",
  fontSize: "20px",
  fontWeight: "500",
  letterSpacing: "1px",
  borderLeft: "1px solid #ffd90c",
});

export const BoxUser = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: "15px",
  padding: "30px 20px 20px 20px",
  background: "#f6f6f6",
});

export const NameUser = styled(Typography)({
  fontSize: "20px",
  fontWeight: "bold",
});

export const ContentUser = styled(Typography)({
  textAlign: "justify",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 4,
  WebkitBoxOrient: "vertical",
});

export const DateTime = styled(Typography)({
  paddingTop: "10px",
  borderTop: "1px solid #ffd90c",
});

export const BoxProduct = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: "15px",
});
