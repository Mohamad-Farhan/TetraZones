import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import { getBrands } from "../functions/brand";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider, Checkbox } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";
import Star from "../components/forms/Star";
import Header from '../components/nav/Header';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import '../helper.css'
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  // eslint-disable-next-line 
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [brands, setBrands] = useState([]);
  // eslint-disable-next-line 
  const [sub, setSub] = useState("");
  // eslint-disable-next-line 
  const [brand, setBrand] = useState("");
  // eslint-disable-next-line 
  const [shipping, setShipping] = useState("");
// eslint-disable-next-line 
  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
    // fetch categories
    getCategories().then((res) => setCategories(res.data));
    // fetch subcategories
    getSubs().then((res) => setSubs(res.data));
    // fetch brand
    getBrands().then((res) => setBrands(res.data));
    // eslint-disable-next-line
  }, []);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  // 1. load products by default on page load
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  // 2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  // 3. load products based on price range
  useEffect(() => {
    fetchProducts({ price });
    // eslint-disable-next-line
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    // reset
    setCategoryIds([]);
    setPrice(value);
    setStar("");
    setSub("");
    setBrand("");
    setShipping("");
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // 4. load products based on category
  // show categories in a list of checkbox
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  // handle check for categories
  const handleCheck = (e) => {
    // reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setBrand("");
    setShipping("");
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1

    // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    fetchProducts({ category: inTheState });
  };

  // 5. show products by star rating
  const handleStarClick = (num) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(num);
    setSub("");
    setBrand("");
    setShipping("");
    fetchProducts({ stars: num });
  };

  const showStars = () => (
    <div className="pr-4 pl-4 pb-2">
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  // 6. show products by sub category
  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSub(s)}
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));

  const handleSub = (sub) => {
    setSub(sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setShipping("");
    fetchProducts({ sub });
  };

  // 7. show products by brand category
  const showBrands = () =>
    brands.map((b) => (
      <div
        key={b._id}
        onClick={() => handleBrand(b)}
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: "pointer" }}
      >
        {b.name}
      </div>
    ));

  const handleBrand = (brand) => {
    setBrand(brand);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setShipping("");
    fetchProducts({ brand });
  };

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 pt-2">
            <h4 className='text-right'>البحث</h4>
            <hr />

            <Menu
              defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}
              mode="inline"
            >
              {/* price */}
              <SubMenu
                key="1"
                title={
                  <span className="h6">
                    <DollarOutlined /> السعر
                </span>
                }
              >
                <div>
                  <Slider
                    className="ml-4 mr-4"
                    tipFormatter={(v) => `${v}JD`}
                    range
                    value={price}
                    onChange={handleSlider}
                    max="10000"
                  />
                </div>
              </SubMenu>

              {/* category */}
              <SubMenu
                key="2"
                title={
                  <span className="h6">
                    <DownSquareOutlined /> الأقسام
                </span>
                }
              >
                <div style={{ maringTop: "-10px" }}>{showCategories()}</div>
              </SubMenu>

              {/* stars */}
              <SubMenu
                key="3"
                title={
                  <span className="h6">
                    <StarOutlined /> التقيم
                </span>
                }
              >
                <div style={{ maringTop: "-10px" }}>{showStars()}</div>
              </SubMenu>

              {/* sub category */}
              <SubMenu
                key="4"
                title={
                  <span className="h6">
                    <DownSquareOutlined /> الفئات الفرعية
                </span>
                }
              >
                <div style={{ maringTop: "-10px" }} className="pl-4 pr-4">
                  {showSubs()}
                </div>
              </SubMenu>

              {/* Brand */}
              <SubMenu
                key="5"
                title={
                  <span className="h6">
                    <DownSquareOutlined /> الماركة
                </span>
                }
              >
                <div style={{ maringTop: "-10px" }} className="pl-4 pr-4">
                  {showBrands()}
                </div>
              </SubMenu>
            </Menu>
          </div>

          <div className="col-md-9 pt-2 float-right">
            {loading ? (
              <h4 className="text-danger">Loading...</h4>
            ) : (
              <h4 className="text-danger text-right">المنتجات</h4>
            )}

            <div>
              <AliceCarousel autoPlay disableButtonsControls infinite autoPlayInterval='4000'>
                <Link to="/brand/Hyperx">
                  <div className='cover-shop1'></div>
                </Link>
                <Link to='/category/kssortoghzlkmbyotr'>
                  <div className='cover-shop2'></div>
                </Link>
                <Link to='/shop'>
                  <div className='cover-shop3'></div>
                </Link>
              </AliceCarousel>
            </div>

            {products.length < 1 && <p>لا يوجد منتجات</p>}

            <div className="row pb-5">
              {products.map((p) => (
                <div key={p._id} className="col-md-4 mt-3">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
