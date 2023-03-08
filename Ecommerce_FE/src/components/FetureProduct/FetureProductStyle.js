import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BoxContent = styled(Box)({
  paddingLeft: "10px",
  height: "100%",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  flexDirection: "column",
  textAlign: "left",
});

export const TextName = styled(Typography)({
    fontSize: "17px",
  textAlign: "left",
  fontWeight: "500",
});

export const Text = styled(Typography)({
  textAlign: "left",
  fontWeight: "500",
});
