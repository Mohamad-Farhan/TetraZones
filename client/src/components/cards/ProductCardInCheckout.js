import React from "react";
import ModalImage from "react-modal-image";
import laptop from "../../images/laptop.png";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";


const ProductCardInCheckout = ({ p }) => {

  const colors = p.colors

  let dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`);
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id == p._id) {
          cart[i].count = count;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleColorChange = (e) => {
    let color = e.target.value;

    if (color == colors) {
      toast.error(`No color ${p.color}`);
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id == p._id) {
          cart[i].color = color;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <tbody>
      <tr>
        <td className="text-center">
          <CloseOutlined
            onClick={handleRemove}
            className="text-danger pointer"
          />
        </td>
        <td className="text-center">
          {p.shipping === "Free" ? (
            <p>مجاني</p>
          ) : (
            <p>3 JD</p>
          )}
        </td>
        <td className="text-center">
          <input
            type="number"
            className="form-control"
            value={p.count}
            onChange={handleQuantityChange}
          />
        </td>
        <td>
          <select
            name="category"
            className="form-control"
            onChange={handleColorChange}
          >
            <option>Please select</option>
            {colors.length > 0 &&
              colors.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
          </select>
        </td>
        <td>{p.brand}</td>
        <td>{p.price} JD</td>
        <Link to={`/product/${p.slug}`}><td>{p.title}</td></Link>
        <td>
          <div style={{ width: "100px", height: "auto" }}>
            {p.images.length ? (
              <ModalImage small={p.images[0].url} large={p.images[0].url} />
            ) : (
              <ModalImage small={laptop} large={laptop} />
            )}
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
