import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import { LoadingOutlined } from "@ant-design/icons";
import KomunicateChat from './components/ChatBot';
// using lazy
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Home = lazy(() => import("./pages/Home"));
const Help = lazy(() => import("./pages/Help"));
const SideDrawer = lazy(() => import("./components/drawer/SideDrawer"));

const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const History = lazy(() => import("./pages/user/History"));
const SallerHistory = lazy(() => import("./pages/saller/SallerHistory"));
const UserRoute = lazy(() => import("./components/routes/UserRoute"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));
const SallerRoute = lazy(() => import("./components/routes/SallerRoute"));
const Password = lazy(() => import("./pages/user/Password"));
const SallerPassword = lazy(() => import("./pages/saller/SallerPassword"));
const Wishlist = lazy(() => import("./pages/user/Wishlist"));
const SallerWishlist = lazy(() => import("./pages/saller/SallerWishlist"));

const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const SallerDashboard = lazy(() => import("./pages/saller/SallerDashborard"));
const UserDetails = lazy(() => import("./components/order/UserDetails"));
const CategoryCreate = lazy(() =>
  import("./pages/admin/category/CategoryCreate")
);
const ColorUpdate = lazy(() =>
  import("./pages/admin/color/ColorUpdate")
);
const ColorCreate = lazy(() =>
  import("./pages/admin/color/ColorCreate")
);
const CategoryUpdate = lazy(() =>
  import("./pages/admin/category/CategoryUpdate")
);
const SubCreate = lazy(() => import("./pages/admin/sub/SubCreate"));
const SubUpdate = lazy(() => import("./pages/admin/sub/SubUpdate"));
const BrandCreate = lazy(() => import("./pages/admin/brand/BrandCreate"));
const BrandUpdate = lazy(() => import("./pages/admin/brand/BrandUpdate"));
const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
const SallerProductCreate = lazy(() => import("./pages/saller/product/SallerProductCreate"));
const SallerColorCreate = lazy(() => import("./pages/saller/color/ColorCreate"));
const SallerColorUpdate = lazy(() => import("./pages/saller/color/ColorUpdate"));
const AllProducts = lazy(() => import("./pages/admin/product/AllProducts"));
const ProductUpdate = lazy(() => import("./pages/admin/product/ProductUpdate"));
const Product = lazy(() => import("./pages/Product"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const SubHome = lazy(() => import("./pages/sub/SubHome"));
const BrandHome = lazy(() => import("./pages/brandHome/BrandHome"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CreateCouponPage = lazy(() =>
  import("./pages/admin/coupon/CreateCouponPage")
);

const App = () => {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Suspense
      fallback={
        <div className="col text-center p-5">
          __ Tymon
          <LoadingOutlined />
          Store __
        </div>
      }
    >
      <KomunicateChat />
      <SideDrawer />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/help" component={Help} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <SallerRoute exact path="/saller/dashboard" component={SallerDashboard} />
        <SallerRoute exact path="/saller/password" component={SallerPassword} />
        <SallerRoute exact path="/saller/wishlist" component={SallerWishlist} />
        <SallerRoute exact path="/saller/history" component={SallerHistory} />
        <SallerRoute exact path="/saller/color" component={SallerColorCreate} />
        <SallerRoute exact
          path="/saller/color/:slug"
          component={SallerColorUpdate} />
        <AdminRoute exact path="/admin/details" component={UserDetails} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute exact path="/admin/color" component={ColorCreate} />
        <AdminRoute
          exact
          path="/admin/category/:slug"
          component={CategoryUpdate}
        />
        <AdminRoute
          exact
          path="/admin/color/:slug"
          component={ColorUpdate}
        />
        <AdminRoute exact path="/admin/sub" component={SubCreate} />
        <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
        <AdminRoute exact path="/admin/brand" component={BrandCreate} />
        <AdminRoute exact path="/admin/brand/:slug" component={BrandUpdate} />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <SallerRoute exact path="/saller/product" component={SallerProductCreate} />
        <AdminRoute exact path="/admin/products" component={AllProducts} />
        <AdminRoute
          exact
          path="/admin/product/:slug"
          component={ProductUpdate}
        />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/sub/:slug" component={SubHome} />
        <Route exact path="/brand/:slug" component={BrandHome} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        <UserRoute exact path="/checkout" component={Checkout} />
        <AdminRoute exact path="/admin/coupon" component={CreateCouponPage} />
      </Switch>
    </Suspense>
  );
};

export default App;
