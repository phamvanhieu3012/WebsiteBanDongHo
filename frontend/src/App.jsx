import "./App.css";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Login from "./pages/login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./components/NotFound";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import MyAccount from "./pages/MyAccount";
import Checkout from "./pages/Checkout";
import axios from "axios";
import store from "./store";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loadUser } from "./actions/userAction";
import PublicRoute from "./components/Route/PublicRoute";
import ScrollToTop from "react-scroll-to-top";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import MenProducts from "./pages/MenProducts";
import WomenProducts from "./pages/WomenProducts";
import MyOrderDetail from "./components/MyOrderDetail";
import Payment from "./pages/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    // const token = localStorage.getItem("token");

    // const config = {
    //   headers: {
    //     Authorization: `token ${token}`,
    //   },
    // };

    const { data } = await axios.get(
      "http://localhost:4000/api/v1/stripeapikey"
      // config
    );

    console.log(data.stripeApiKey);
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <PublicRoute exact path="/" component={HomePage} />
          <PublicRoute exact path="/products" component={Product} />
          <PublicRoute exact path="/products-men" component={MenProducts} />
          <PublicRoute exact path="/products-women" component={WomenProducts} />
          <PublicRoute exact path="/products" component={Product} />
          <PublicRoute exact path="/product/:id" component={ProductDetail} />
          <PublicRoute path="/products/:keyword" component={Product} />

          <PublicRoute exact path="/about" component={About} />
          <PublicRoute exact path="/faq" component={FAQ} />
          <PublicRoute exact path="/contact" component={Contact} />
          <PublicRoute exact path="/blog" component={Blog} />

          <PublicRoute exact path="/login" component={Login} />
          <ProtectedRoute exact path="/my-account" component={MyAccount} />
          <PublicRoute
            exact
            path="/forgot-password"
            component={ForgotPassword}
          />
          <PublicRoute
            exact
            path="/password/reset/:token"
            component={ResetPassword}
          />
          <ProtectedRoute exact path="/order/:id" component={MyOrderDetail} />

          <PublicRoute exact path="/cart" component={Cart} />
          <PublicRoute exact path="/checkout" component={Checkout} />
          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <PublicRoute exact path="/payment" component={Payment} />
            </Elements>
          )}

          <PublicRoute component={NotFound} />
        </Switch>
        {/* <button id="scroll-top" title="Back to Top">
          <i className="icon-arrow-up"></i>
        </button> */}
        <ScrollToTop smooth />

        {/* <!-- Mobile Menu --> */}
        <div className="mobile-menu-overlay"></div>
        {/* <!-- End .mobil-menu-overlay --> */}
      </Router>
    </div>
  );
}

export default App;
