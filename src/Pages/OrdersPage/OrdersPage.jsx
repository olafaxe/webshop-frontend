import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { List, ListItem, ListItemText } from "@material-ui/core";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const OrdersPage = ({ checkOutOrder, cartProducts }) => {
  const classes = useStyles();
  const [orders, setOrders] = useState();
  const [showOrder, setShowOrder] = useState(null);
  // const [total, setTotal] = useState([]);
  let totalCost = 0;

  const handleShowOrder = e => {
    setShowOrder(e);
  };

  useEffect(() => {
    (async () => {
      const resp = await fetch("https://localhost:5001/order");
      const orders = await resp.json();
      setOrders(orders);
    })();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order Date</TableCell>
              <TableCell>User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              ? orders.map(order => (
                  <>
                    <TableRow key={order.id}>
                      <TableCell
                        component="th"
                        scope="row"
                        onClick={() => handleShowOrder(order.id)}
                      >
                        {order.orderDate}
                      </TableCell>

                      <TableCell align="right">
                        {order.customer.userName}
                      </TableCell>
                    </TableRow>
                  </>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      {showOrder && orders
        ? orders.map((order, index) => {
            if (order.id === showOrder) {
              console.log(order);
              return (
                <div key={index}>
                  <h2>Order: {order.id}</h2>
                  <h4>Customer: {order.customer.userName}</h4>
                  <List>
                    {order.orderItem.map(product => {
                      totalCost = totalCost + product.product.price;
                      return (
                        <ListItem key={product.id}>
                          <ListItemText>{`${product.product.name} | ${product.product.info} | ${product.color} | ${product.product.price}kr`}</ListItemText>
                        </ListItem>
                      );
                    })}
                  </List>
                  <h3>{`Total: ${totalCost}`}</h3>
                </div>
              );
            }
          })
        : null}

      <Grid container justify="center" style={{ paddingTop: "25px" }}></Grid>
    </>
  );
};

export default OrdersPage;
