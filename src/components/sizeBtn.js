import { useEffect, useState } from "react";

export default function SizeBtn(props) {
  const [size, setSize] = useState(null);
  const [toggleSel, setToggleSel] = useState("none");

  useEffect(() => {
    if (!props.size) {
      return;
    }

    setSize(props.size);
  }, [props.size]);

  useEffect(() => {
    if (props.selSize === props.size) {
      setToggleSel("selectedSize");
    } else {
      setToggleSel("none");
    }
  }, [props.selSize]);

  return (
    <button
      onClick={() => {
        props.updateSize(props.size);
      }}
      className={`sizeBtn ${toggleSel}`}
      type="button"
    >
      {size}
    </button>
  );
}
