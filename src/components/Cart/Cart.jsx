import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export default function SimpleTable({
  checkOutOrder,
  cartProducts,
  customer,
  customerHandler,
  email,
  emailHandler,
  totalCost
}) {
  const classes = useStyles();

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Product Color</TableCell>
              <TableCell align="right">Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartProducts
              ? cartProducts.map(product => {
                  return (
                    <TableRow key={product.id}>
                      <TableCell component="th" scope="row">
                        {product.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {product.color}
                      </TableCell>
                      <TableCell align="right">{product.price}</TableCell>
                    </TableRow>
                  );
                })
              : null}
            <TableRow>
              <TableCell></TableCell>

              <TableCell>{`Total: ${totalCost}kr`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <form></form>
      <Grid container justify="center" style={{ paddingTop: "25px" }}>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Input
            id="customer"
            placeholder="Customer"
            style={{ flex: 1, margin: 10 }}
            inputProps={{ "aria-label": "description" }}
            value={customer}
            onChange={e => customerHandler(e)}
          />
          <Input
            id="email"
            placeholder="E-mail"
            style={{ flex: 1, margin: 10 }}
            inputProps={{ "aria-label": "description" }}
            value={email}
            onChange={e => emailHandler(e)}
          />

          <Button
            variant="contained"
            style={{ flex: 1, margin: 10 }}
            onClick={e => checkOutOrder(e)}
          >
            CHECKOUT
          </Button>
        </form>
      </Grid>
    </>
  );
}
