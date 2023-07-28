import "./styles/App.css";
import { useEffect } from "react";
import { useState } from "react";
import SizeBtn from "./components/sizeBtn";
import uniqid from "uniqid";
import Nav from "./components/nav";

function App() {
  const [product, setProduct] = useState(null);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productImgSrc, setProductImgSrc] = useState("");

  const [selSize, setSelSize] = useState("");

  const [warningDisp, setWarningDisp] = useState("none");

  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const api = `https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product`;

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    if (product == null || !product) {
      return;
    }

    setProductName(product.title);
    setProductPrice(`$${product.price}.00`);
    setProductDesc(product.description);
    setProductImgSrc(product.imageURL);
  }, [product]);

  async function fetchProduct() {
    await fetch(api, {
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("authentication has been failed!");
      })
      .then((resObject) => {
        setProduct(resObject);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateSize(size) {
    setSelSize(size);
  }

  function handleAdd() {
    if (selSize === "" || !selSize) {
      setWarningDisp("block");
    } else {
      setWarningDisp("none");

      addToCart();
    }
  }

  function addToCart() {
    if (cart.filter((e) => e.size === selSize).length > 0) {
      let cartArr = cart;
      let index = cartArr.findIndex((obj) => obj.size == selSize);
      cartArr[index].quantity = ++cartArr[index].quantity;
      setCart(cartArr);
    } else {
      let newItem = { size: selSize, quantity: 1 };
      setCart([...cart, newItem]);
    }
    setCartCount(cartCount + 1);
  }

  function getItems() {
    return cart;
  }

  return (
    <div className="App">
      <Nav
        product={product}
        cart={cart}
        cartCount={cartCount}
        getItems={getItems}
      />

      <div className="mainCont">
        <img
          className="mainImg"
          alt="Image of the product"
          src={productImgSrc}
        />
        <div className="infoCont">
          <h1 className="productName">{productName}</h1>
          <h2 className="productPrice">{productPrice}</h2>
          <p className="productDesc">{productDesc}</p>

          <div className="sizesCont">
            <p className="sizeText">
              SIZE <span className="asterisk">*</span>
              <span className="selSize">{selSize}</span>
            </p>
            <div className="sizeBtns">
              <SizeBtn size={"S"} selSize={selSize} updateSize={updateSize} />
              <SizeBtn size={"M"} selSize={selSize} updateSize={updateSize} />
              <SizeBtn size={"L"} selSize={selSize} updateSize={updateSize} />
            </div>
          </div>

          <button type="button" onClick={handleAdd} id="addBtn">
            ADD TO CART
          </button>
          <p className="warning" style={{ display: warningDisp }}>
            * Please select a size.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
