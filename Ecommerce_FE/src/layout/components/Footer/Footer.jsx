import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { BoxLogo } from "../Header/HeaderStyle";
import { BoxMenu, FooterCus, MenuItemFooter } from "./FooterStyle";
import { NavLink } from "react-router-dom";

const pages = [
  { id: "1", title: "Home", link: "/" },
  {
    id: "2",
    title: "Category",
    link: "/categories",
  },
  {
    id: "3",
    title: "Product",
    link: "/products",
  },
];

function Footer() {
  return (
    <FooterCus>
      <BoxLogo>
        <BoltIcon sx={{ fontSize: "50px", color: "#ffd90c" }} />
        <Typography
          variant="h4"
          noWrap
          component="a"
          href="/"
          sx={{
            color: "#fff",
            fontWeight: 800,
            letterSpacing: "4px",
          }}
        >
          Electronic Lyte
        </Typography>
      </BoxLogo>
      <BoxMenu
        sx={{
          display: { xs: "none", md: "flex" },
        }}
      >
        {pages.map((page) => (
          <NavLink key={page.id} to={page.link}>
            <MenuItemFooter className="transition">{page.title}</MenuItemFooter>
          </NavLink>
        ))}
      </BoxMenu>
      <Box>
        <IconButton sx={{ color: "#fff", mr: 1, ml: 1 }}>
          <FacebookIcon sx={{ fontSize: "30px" }} />
        </IconButton>
        <IconButton sx={{ color: "#fff", mr: 1, ml: 1 }}>
          <InstagramIcon sx={{ fontSize: "30px" }} />
        </IconButton>
        <IconButton sx={{ color: "#fff", mr: 1, ml: 1 }}>
          <LinkedInIcon sx={{ fontSize: "30px" }} />
        </IconButton>
        <IconButton sx={{ color: "#fff", mr: 1, ml: 1 }}>
          <TwitterIcon sx={{ fontSize: "30px" }} />
        </IconButton>
      </Box>
    </FooterCus>
  );
}

export default Footer;
