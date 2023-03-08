import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BoxCategory = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "10px",
});

export const Text = styled(Typography)({
  color: "#6f6f6f",
  fontSize: "16px",
  letterSpacing: "1px",
});

function CategoryItem({ category }) {
  return (
    <BoxCategory>
      <img src={category.image} alt={category.name} style={{ width: "70%" }} />
      <Text>{category.name}</Text>
    </BoxCategory>
  );
}

export default CategoryItem;
