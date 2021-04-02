import React, { useState, useEffect } from "react";
import { getBrand } from "../../functions/brand";
import ProductCard from "../../components/cards/ProductCard";
import Header from '../../components/nav/Header';

const BrandHome = ({ match }) => {
  const [brand, setBrand] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getBrand(slug).then((res) => {
      setBrand(res.data.brand);
      setProducts(res.data.products);
      setLoading(false);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
    <Header/>
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              Loading...
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              {products.length} Products in "{brand.name}" brand
            </h4>
          )}
        </div>
      </div>

      <div className="row">
        {products.map((p) => (
          <div className="col" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default BrandHome;
