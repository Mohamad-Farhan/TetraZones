import React from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
  const {
    price,
    category,
    subs,
    shippings,
    colors,
    brands,
    quantity,
    // sold,
  } = product;

  return (
    <ul className="list-group">
      <li className="list-group-item">
        <span className="label label-default label-pill pull-xs-left">
          {price} JD
        </span>
        <div className="label label-default label-pill pull-xs-right">{" "}السعر</div>
      </li>

      {category && (
        <li className="list-group-item">
          <Link
            to={`/category/${category.slug}`}
            className="label label-default label-pill pull-xs-left"
          >
            {category.name}
          </Link>
          <div className="label label-default label-pill pull-xs-right">القسم</div>
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
              <div>{s.name}</div>
            </Link>
          ))}
          <div className="label label-default label-pill pull-xs-right">القسم الفرعي</div>
        </li>
      )}

      {shippings && (
        <li className="list-group-item">
          {shippings.map((s) => (
            <div
              key={s._id}
              className="label label-default label-pill pull-xs-left"
            >
              <div>{s.name}</div>
            </div>
          ))}
          <div className="label label-default label-pill pull-xs-right">التوصيل </div>
        </li>
      )}

      {colors && (
        <li className="list-group-item">
          {colors.map((c) => (
            <div
              key={c._id}
              className="label label-default label-pill pull-xs-left"
            >
              <div>{c.name}</div>
            </div>
          ))}
          <div className="label label-default label-pill pull-xs-right">اللون </div>
        </li>
      )}

      {brands && (
        <li className="list-group-item">
          {brands.map((b) => (
            <Link
              key={b._id}
              to={`/brand/${b.slug}`}
              className="label label-default label-pill pull-xs-left"
            >
              <div>{b.name}</div>
            </Link>
          ))}
          <div className="label label-default label-pill pull-xs-right"> الماركة </div>
        </li>
      )}

      <li className="list-group-item">
        <span className="label label-default label-pill pull-xs-letf">
          {quantity}
        </span>
        <div className="label label-default label-pill pull-xs-right">{" "}عدد المنتجات المتاحة</div>
      </li>

      {/* <li className="list-group-item">
        <span className="label label-default label-pill pull-xs-left">
          {sold}
        </span>
        <p className="label label-default label-pill pull-xs-right">{" "}المنتجات المباعة</p>
      </li> */}
    </ul>
  );
};

export default ProductListItems;
