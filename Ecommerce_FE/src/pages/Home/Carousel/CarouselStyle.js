import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BoxContent = styled(Box)({
  position: "absolute",
  top: "140px",
  left: 0,
  paddingLeft: "40px"
});

export const Name = styled(Typography)({
  fontSize: "20px",
  textAlign: "left",
  fontWeight: "400",
  marginBottom: "20px",
});

export const Content = styled(Typography)({
  fontSize: "60px",
  fontWeight: "700",
  letterSpacing: "3px",
  textAlign: "left",
});
