import React from "react";
import { Grid } from "@mui/material";
import { BoxContent, Text, TextName } from "./FetureProductStyle";

function FetureProduct({ product }) {
  return (
    <Grid container>
      <Grid item md={4} sx={{ p: 0 }}>
        <img src={product.image} alt={product.name} width="100%" />
      </Grid>
      <Grid item md={8} sx={{ p: 0 }}>
        <BoxContent>
          <TextName>{product.name}</TextName>
          <Text>{product.price}</Text>
        </BoxContent>
      </Grid>
    </Grid>
  );
}

export default FetureProduct;
