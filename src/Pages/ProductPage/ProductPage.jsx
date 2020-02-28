import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import MediaCard from "../../components/Card/MediaCard";

const useStyles = makeStyles(theme => ({
  root: {
    flexWrap: "wrap"
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing(2)
  },
  flex: {
    flex: 1
  }
}));

const ProductPage = ({
  products,
  colorType,
  optionColor,
  colorHandler,
  addToCartHandler
}) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={4}>
      {products
        ? products.map(product => {
            return (
              <Grid key={product.id} item xs={8} className={classes.flex}>
                <MediaCard
                  product={product}
                  colorType={colorType}
                  optionColor={optionColor}
                  colorHandler={colorHandler}
                  addToCartHandler={addToCartHandler}
                />
              </Grid>
            );
          })
        : null}
    </Grid>
  );
};

export default ProductPage;
