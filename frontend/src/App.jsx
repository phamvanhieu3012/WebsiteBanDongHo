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

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/product/:id" component={ProductDetail} />
          <Route exact path="/products" component={Product} />
          <Route path="/products/:keyword" component={Product} />

          <Route exact path="/about" component={About} />
          <Route exact path="/faq" component={FAQ} />
          <Route exact path="/contact" component={Contact} />

          <Route exact path="/blog" component={Blog} />

          <Route exact path="/login" component={Login} />

          <Route component={NotFound} />
        </Switch>
        {/* <Login /> */}
        {/* <About /> */}
        {/* <Contact /> */}
        {/* <NotFound /> */}
        {/* <FAQ /> */}
        {/* <Blog /> */}
        {/* <HomePage /> */}
        {/* <ProductDetail /> */}
        {/* <Product /> */}
        {/* <Cart /> */}
        {/* <MyAccount /> */}
        {/* <Checkout /> */}
        <Footer />
      </Router>
    </div>
  );
}

export default App;
