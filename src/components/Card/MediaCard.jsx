import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    minWidth: 300,
    minHeight: 350,
    maxWidth: 300,
    maxHeight: 350
  },
  media: {
    height: 140
  }
});

export default function MediaCard({
  product,
  colorType,
  optionColor,
  colorHandler,
  addToCartHandler
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={product.image}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.info}
          </Typography>
          <Typography variant="h3" color="textSecondary" component="p">
            {`${product.price}kr`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <select value={optionColor} onChange={e => colorHandler(e.target.value)}>
        <option value={optionColor}>Select</option>
        {!colorType
          ? null
          : colorType.map(color => {
              return (
                <option key={color.colorName} value={color.colorName}>
                  {color.colorName}
                </option>
              );
            })}
      </select>
      <Grid container justify="space-evenly" spacing={2}>
        <CardActions>
          <Button size="small" color="primary">
            INFO
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => addToCartHandler(product, optionColor)}
          >
            BUY
          </Button>
        </CardActions>
      </Grid>
    </Card>
  );
}
