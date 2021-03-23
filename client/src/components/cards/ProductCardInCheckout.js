import React from "react";
import ModalImage from "react-modal-image";
import laptop from "../../images/laptop.png";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { CloseOutlined } from "@ant-design/icons";

const colors = []

const ProductCardInCheckout = ({ p }) => {
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
    let color = e.target.value < 1 ? 1 : e.target.value;

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
          {p.shipping === "مجاني" ? (
            <p>مجاني</p>
          ) : (
            <p>5 JD</p>
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
          <input
            type="text"
            className="form-control"
            value={p.color}
            onChange={handleColorChange}
          />
        </td>
        <td>{p.brand}</td>
        <td>{p.price} JD</td>
        <td>{p.title}</td>
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
