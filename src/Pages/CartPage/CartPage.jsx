import React from "react";
import Cart from "../../components/Cart/Cart";

const CartPage = ({
  checkOutOrder,
  cartProducts,
  customer,
  customerHandler,
  email,
  emailHandler,
  totalCost
}) => {
  return (
    <>
      <Cart
        checkOutOrder={checkOutOrder}
        cartProducts={cartProducts}
        customer={customer}
        customerHandler={customerHandler}
        email={email}
        emailHandler={emailHandler}
        totalCost={totalCost}
      />
    </>
  );
};

export default CartPage;
