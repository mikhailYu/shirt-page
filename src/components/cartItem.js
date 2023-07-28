import { useEffect, useState } from "react";
import "../styles/cartItem.css";

export default function CartItem(props) {
  const [productName, setProductName] = useState("");
  const [productCount, setProductCount] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productSize, setProductSize] = useState("");
  const [productImgSrc, setProductImgSrc] = useState(null);

  useEffect(() => {
    if (!props.product) {
      return;
    }
    setProductName(props.product.title);
    setProductPrice(`$${props.product.price}.00`);

    setProductImgSrc(props.product.imageURL);

    setProductCount(props.info.quantity);
    setProductSize(props.info.size);
  }, [props]);

  return (
    <div className="cartItemCont">
      <img
        className="cartImg"
        alt="Image of the product in the cart."
        src={productImgSrc}
      />
      <div className="cartItemInfoCont">
        <p className="cartItemName">{productName}</p>
        <p className="cartItemPrice">
          {productCount} x <span>{productPrice}</span>
        </p>
        <p className="cartItemSize">Size: {productSize}</p>
      </div>
    </div>
  );
}
