import React from "react";
import BoltIcon from "@mui/icons-material/Bolt";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import {
  BoxLogo,
  BoxMenu,
  MenuItemCustom,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  ToolbarBox,
} from "./HeaderStyle";

const pages = [
  { title: "Home", link: "/" },
  {
    title: "Category",
    link: "/categories",
  },
  {
    title: "Product",
    link: "/products",
  },
];

const settings = ["Profile", "Account", "Logout"];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ background: "#fff" }}>
      <Container maxWidth="xl">
        <ToolbarBox disableGutters>
          <BoxLogo sx={{ display: { xs: "none", md: "flex" } }}>
            <BoltIcon sx={{ fontSize: "50px", color: "#ffd90c" }} />
            <Typography
              variant="h4"
              noWrap
              component="a"
              href="/"
              sx={{
                color: "#000",
                fontWeight: 800,
                letterSpacing: "4px",
              }}
            >
              Elyte
            </Typography>
          </BoxLogo>

          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "#000" }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ background: "#000" }}
            >
              <MenuIcon sx={{ color: "#ffd90c" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <BoxLogo sx={{ display: { xs: "flex", md: "none" } }}>
            <BoltIcon sx={{ fontSize: "50px", color: "#ffd90c" }} />
            <Typography
              variant="h4"
              noWrap
              component="a"
              href="/"
              sx={{
                color: "#000",
                fontWeight: 800,
                letterSpacing: "4px",
              }}
            >
              Elyte
            </Typography>
          </BoxLogo>

          <Box>
            <IconButton sx={{ ml: 1 }}>
              <Badge badgeContent={4} color="info">
                <FavoriteBorderOutlinedIcon />
              </Badge>
            </IconButton>
            <IconButton sx={{ ml: 1 }}>
              <Badge badgeContent={4} color="info">
                <LocalMallOutlinedIcon />
              </Badge>
            </IconButton>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 2 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem key={index} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </ToolbarBox>
      </Container>
      <BoxMenu
        sx={{
          display: { xs: "none", md: "flex" },
        }}
      >
        {pages.map((page, index) => (
          <NavLink key={index} to={page.link}>
            <MenuItemCustom className="transition">{page.title}</MenuItemCustom>
          </NavLink>
        ))}
      </BoxMenu>
    </AppBar>
  );
}

export default Header;
