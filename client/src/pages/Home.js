import React from "react";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";
import cover from '../images/cover.png';
import { Link } from "react-router-dom";
import Header from '../components/nav/Header';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

const Home = () => {
  return (
    <>
      <Header />
      <div className="text-center">
        <AliceCarousel autoPlay disableButtonsControls infinite autoPlayInterval='4000'>
          <Link to="//category/dotlmnzly">
            <img src={cover} className="sliderimg img-fluid" alt="Responsive image" />
          </Link>
          <Link to='/shop'>
            <img src={cover} className=" sliderimg img-fluid" alt="Responsive image"/>
          </Link>
          <Link to='/shop'>
            <img src={cover} className=" sliderimg img-fluid" alt="Responsive image"/>
          </Link>
        </AliceCarousel>
      </div>

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        المنتجات الجديدة
      </h4>
      <NewArrivals />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        الأكثر مبيعا
      </h4>
      <BestSellers />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        الأقسام
      </h4>
      <CategoryList />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        الأقسام الفرعية
      </h4>
      <SubList />

      <br />
      <br />
    </>
  );
};

export default Home;
