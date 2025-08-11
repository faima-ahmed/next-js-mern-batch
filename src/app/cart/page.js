"use client";

import CartItem from "@/app/components/CartItem";

import { useCart } from "@/app/contexts/Cart";

const Cart = () => {
  const { cart, clearCart } = useCart();

  let totalAmount = 0;
  cart.forEach((item) => (totalAmount += item.price * item.quantity));

  return (
    <>
      <div className="account-setting__content">
        <div className="account-setting__content__title">
          <h4>Product list in your cart</h4>
        </div>
        <div className="product-table-container">
          <table className="border-collapse border-spacing-0 w-full">
            <thead>
              <tr>
                <th>Product Image</th>
                <th>PRODUCT NAME</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </tbody>
          </table>
        </div>
        <h2 className="total-price">You Total Price Will be $ {totalAmount}</h2>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div className="mt-50">
            <button onClick={() => clearCart()} type="button" className="">
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// disabled = {!authContext.isLoggedIn}

export default Cart;
