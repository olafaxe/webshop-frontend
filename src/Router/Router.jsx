import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ProductPage from "../Pages/ProductPage/ProductPage";
import CartPage from "../Pages/CartPage/CartPage";
import Header from "../components/Global/Header/Header";
import OrdersPage from "../Pages/OrdersPage/OrdersPage";

const Router = () => {
  const [products, setProducts] = useState();
  const [colorType, setColorType] = useState([]);
  const [optionColor, setOptionColor] = useState("Default");
  const [cartProducts, setCartProducts] = useState([]);
  const [orderData, setOrderData] = useState(false);
  const [customer, setCustomer] = useState("");
  const [email, setEmail] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  const addToCartHandler = (item, color) => {
    let pro = item;
    pro.color = color;
    setOrderData(true);
    setCartProducts(state => [pro, ...state]);
  };

  const checkOutOrder = e => {
    e.preventDefault();
    if (!orderData || customer === "" || email === "") {
      return;
    }

    (async () => {
      const postOrder = {
        cart: cartProducts,
        customer: {
          userName: customer,
          email: email
        }
      };
      const resp = await fetch("https://localhost:5001/order", {
        method: "POST",
        body: JSON.stringify(postOrder),
        headers: {
          "Content-Type": "application/json"
        }
      });
      setCartProducts([]);
      setOrderData(false);
      setCustomer("");
      setEmail("");
      setTotalCost(0);
    })();
  };

  const customerHandler = e => {
    setCustomer(e.target.value);
  };

  const emailHandler = e => {
    setEmail(e.target.value);
  };

  const colorHandler = e => {
    setOptionColor(e);
  };

  useEffect(() => {
    (async () => {
      const resp = await fetch("https://localhost:5001/product");
      const products = await resp.json();
      setProducts(products);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const resp = await fetch("https://localhost:5001/colors");
      const col = await resp.json();

      setColorType([...col]);
    })();
  }, []);

  useEffect(() => {
    if (cartProducts) {
      cartProducts.map(product => {
        setTotalCost(state => product.price + state);
      });
    }
  }, [cartProducts]);

  return (
    <BrowserRouter>
      <Switch>
        <Header>
          <Route
            exact
            path="/"
            render={() => (
              <ProductPage
                products={products}
                colorType={colorType}
                optionColor={optionColor}
                colorHandler={colorHandler}
                addToCartHandler={addToCartHandler}
              />
            )}
          ></Route>
          <Route
            exact
            path="/products"
            render={() => (
              <ProductPage
                products={products}
                colorType={colorType}
                optionColor={optionColor}
                colorHandler={colorHandler}
                addToCartHandler={addToCartHandler}
              />
            )}
          ></Route>
          <Route
            strict
            path="/cart"
            render={() => (
              <CartPage
                cartProducts={cartProducts}
                checkOutOrder={checkOutOrder}
                customer={customer}
                customerHandler={customerHandler}
                email={email}
                emailHandler={emailHandler}
                totalCost={totalCost}
              />
            )}
          ></Route>
          <Route strict path="/orders" render={() => <OrdersPage />}></Route>
        </Header>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
