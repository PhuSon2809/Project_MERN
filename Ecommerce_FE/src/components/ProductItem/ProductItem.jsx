import React from "react";
import { Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

function ProductItem() {
  return (
    <Box>
      <img
        src="https://cdn.shopify.com/s/files/1/0549/6851/6852/products/2_f1c1de8f-b3fc-4202-b8f2-00cfd31f0232_575X670_crop_center.jpg?v=1648037331"
        alt="prodcut"
        width="100%"
      />
      <Box>
        <Box sx={{ color: "#ffd90c" }}>
          <StarIcon fontSize="small" />
          <StarIcon fontSize="small" />
          <StarIcon fontSize="small" />
          <StarIcon fontSize="small" />
          <StarIcon fontSize="small" />
        </Box>
      </Box>
    </Box>
  );
}

export default ProductItem;
