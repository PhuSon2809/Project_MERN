import { Box, InputBase, Toolbar, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

export const ToolbarBox = styled(Toolbar)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const BoxLogo = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  color: "#000",
});

export const BoxMenu = styled(Box)({
  background: "#ffd90c",
  alignItems: "center",
  justifyContent: "center",
});

export const MenuItemCustom = styled(Typography)({
  width: "150px",
  padding: "10px 20px",
  fontWeight: "500",
  color: "black",
  textTransform: "uppercase",
  letterSpacing: "1px",
  textAlign: "center",

  "&:hover": {
    background: "#fff",
  },
});

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha("#ffd90c", 0.65),
  "&:hover": {
    backgroundColor: alpha("#ffd90c", 0.75),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#000",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },  
}));
