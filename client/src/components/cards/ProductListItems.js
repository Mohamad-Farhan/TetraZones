import React from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
  const {
    price,
    category,
    subs,
    shipping,
    color,
    brand,
    quantity,
    sold,
  } = product;

  return (
    <ul className="list-group">
      <li className="list-group-item">
        <span className="label label-default label-pill pull-xs-left">
          {price} JD
        </span>
        <p className="label label-default label-pill pull-xs-right">{" "}السعر</p>
      </li>

      {category && (
        <li className="list-group-item">
          <Link
            to={`/category/${category.slug}`}
            className="label label-default label-pill pull-xs-left"
          >
            {category.name}
          </Link>
          <p className="label label-default label-pill pull-xs-right">القسم</p>
        </li>
      )}

      {subs && (
        <li className="list-group-item">
          {subs.map((s) => (
            <Link
              key={s._id}
              to={`/sub/${s.slug}`}
              className="label label-default label-pill pull-xs-left"
            >
              {s.name}
            </Link>
          ))}
          <p className="label label-default label-pill pull-xs-right">القسم الفرعي</p>
        </li>
      )}

      <li className="list-group-item">
        <span className="label label-default label-pill pull-xs-left">
          {shipping}
        </span>
        <p className="label label-default label-pill pull-xs-right">{" "}التوصيل</p>
      </li>

      <li className="list-group-item">
        <span className="label label-default label-pill pull-xs-left">
          {color}
        </span>
        <p className="label label-default label-pill pull-xs-right">{" "}اللون</p>
      </li>

      <li className="list-group-item">
        <span className="label label-default label-pill pull-xs-left">
          {brand}
        </span>
        <p className="label label-default label-pill pull-xs-right">{" "}الماركة</p>
      </li>

      <li className="list-group-item">
        <span className="label label-default label-pill pull-xs-letf">
          {quantity}
        </span>
        <p className="label label-default label-pill pull-xs-right">{" "}عدد المنتجات التاحة</p>
      </li>

      <li className="list-group-item">
        <span className="label label-default label-pill pull-xs-left">
          {sold}
        </span>
        <p className="label label-default label-pill pull-xs-right">{" "}المنتجات المباعة</p>
      </li>
    </ul>
  );
};

export default ProductListItems;
