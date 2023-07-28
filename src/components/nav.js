import { useEffect, useState } from "react";
import "../styles/nav.css";
import CartItem from "./cartItem";
import uniqid from "uniqid";

export default function Nav(props) {
  const [itemCount, setItemCount] = useState(" ");

  const [cartDisp, setCartDisp] = useState("none");
  const [cartBtnBg, setCartBtnBg] = useState("#f3f3f3");
  const [border, setBorder] = useState("0px");
  const [cartText, setCartText] = useState("#888888");
  const [itemsDisp, setItemsDisp] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  function toggleCart() {
    if (cartDisp == "none") {
      setCartDisp("block");
      setCartBtnBg("white");
      setBorder("1px");
      setCartText("black");
    } else {
      setCartDisp("none");
      setCartBtnBg("#f3f3f3");
      setBorder("0px");
      setCartText("#888888");
    }
  }

  useEffect(() => {
    setItemCount(props.cartCount);
    updateCart();
  }, [props]);

  function updateCart() {
    let itemsArr = props.getItems();

    let items = itemsArr.map((item) => {
      return <CartItem key={uniqid()} info={item} product={props.product} />;
    });

    setCartItems(items);
  }

  useEffect(() => {
    if (cartItems.length == 0) {
      let empty = <p className="emptyMsg">Cart is empty.</p>;
      setItemsDisp(empty);
    } else {
      setItemsDisp(cartItems);
    }
  }, [cartItems]);

  return (
    <nav>
      <div
        style={{
          backgroundColor: cartBtnBg,
          borderWidth: border,
        }}
        className="myCartBtn"
        onClick={toggleCart}
      >
        <p
          style={{
            color: cartText,
          }}
        >
          My Cart {`(${itemCount})`}
        </p>
      </div>

      <div className="cartWindow" style={{ display: cartDisp }}>
        {itemsDisp}
      </div>
    </nav>
  );
}
