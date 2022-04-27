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
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadUser } from "./actions/userAction";
import PublicRoute from "./components/Route/PublicRoute";
import ScrollToTop from "react-scroll-to-top";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import MenProducts from "./pages/MenProducts";
import WomenProducts from "./pages/WomenProducts";
import MyOrderDetail from "./components/MyOrderDetail";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
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
          <ProtectedRoute exact path="/order/:id" component={MyOrderDetail} />

          <PublicRoute exact path="/cart" component={Cart} />
          <PublicRoute exact path="/checkout" component={Checkout} />

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
