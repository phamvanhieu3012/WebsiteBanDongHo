import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteFromCart, getCart } from "../../../actions/cartAction.js";
import { logout } from "../../../actions/userAction.js";
import { REMOVE_CART_ITEM_RESET } from "../../../constants/cartConstants.js";
import formatPrice from "../../../ultils/formatPrice.js";
import Loader from "../../Common/Loader/index.jsx";

function Header() {
  const [keyword, setKeyword] = useState("");

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const { cart, isDeleted, loading } = useSelector((state) => state.cart);

  const { cartItems } = useSelector((state) => state.cartLocal);

  let history = useHistory();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getProduct(category));
  // }, [dispatch, category]);

  function logoutUser() {
    dispatch(logout());
    alert("Đăng xuất thành công");
    history.push("/");
  }

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };

  const deleteCartItems = (id) => {
    dispatch(deleteFromCart(id));
  };

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    if (isDeleted) {
      dispatch(getCart());
      dispatch({ type: REMOVE_CART_ITEM_RESET });
    }
  }, [dispatch, isDeleted]);

  let toggleCartItems = localStorage.getItem("cartItems");
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (toggleCartItems) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }, [toggleCartItems]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="page-wrapper">
          <header className="header header-6">
            <div className="header-top">
              <div className="container">
                <div className="header-left">
                  <ul className="top-menu top-link-menu d-none d-md-block">
                    <li>
                      <a href="#">Links</a>
                      <ul>
                        <li>
                          <a href="tel:#">
                            <i className="icon-phone"></i>Call: +0123 456 789
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>

                <div className="header-right">
                  <div className="social-icons social-icons-color">
                    <a
                      href="https://www.facebook.com"
                      className="social-icon social-facebook"
                      title="Facebook"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="icon-facebook-f"></i>
                    </a>
                    <a
                      href="https://twitter.com"
                      className="social-icon social-twitter"
                      title="Twitter"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="icon-twitter"></i>
                    </a>
                    <a
                      href="https://www.pinterest.com/"
                      className="social-icon social-pinterest"
                      title="Instagram"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="icon-pinterest-p"></i>
                    </a>
                    <a
                      href="https://www.instagram.com/"
                      className="social-icon social-instagram"
                      title="Pinterest"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="icon-instagram"></i>
                    </a>
                  </div>
                  <ul className="top-menu top-link-menu">
                    <li>
                      <a href="#">Links</a>
                      <ul>
                        <li>
                          {isAuthenticated ? (
                            <p
                              onClick={logoutUser}
                              style={{ cursor: "pointer" }}
                            >
                              <i className="icon-user"></i>Đăng xuất
                            </p>
                          ) : (
                            <a href="/login">
                              <i className="icon-user"></i>Đăng nhập
                            </a>
                          )}
                        </li>
                      </ul>
                    </li>
                  </ul>

                  {isAuthenticated ? (
                    <div className="header-dropdown">
                      <a href="my-account" style={{ cursor: "pointer" }}>
                        Tài khoản
                      </a>
                      <div className="header-menu">
                        <ul>
                          <li>
                            <Link to="/my-account">
                              Chỉnh sửa thông tin cá nhân
                            </Link>
                          </li>
                          {user.role === "staff" || user.role === "admin" ? (
                            <li>
                              <Link to="/admin/dashboard">Dashboard Admin</Link>
                            </li>
                          ) : (
                            ""
                          )}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="header-middle">
              <div className="container">
                <div className="header-left">
                  <div className="header-search header-search-extended header-search-visible d-none d-lg-block">
                    <a href="#" className="search-toggle" role="button">
                      <i className="icon-search"></i>
                    </a>
                    <form onSubmit={searchSubmitHandler}>
                      <div className="header-search-wrapper search-wrapper-wide">
                        <label htmlFor="q" className="sr-only">
                          Tìm kiếm
                        </label>
                        <button className="btn btn-primary" type="submit">
                          <i className="icon-search"></i>
                        </button>
                        <input
                          type="search"
                          className="form-control"
                          name="q"
                          id="q"
                          placeholder="Tìm kiếm sản phẩm ..."
                          required
                          onChange={(e) => setKeyword(e.target.value)}
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div className="header-center">
                  <a href="/" className="logo">
                    <img
                      // src="assets/images/demos/demo-6/logo.png"
                      src="/logo.png"
                      alt="Molla Logo"
                      width="82"
                      height="20"
                    />
                  </a>
                </div>

                <div className="header-right">
                  {/* <a href="wishlist.html" className="wishlist-link">
                <i className="icon-heart-o"></i>
                <span className="wishlist-count">3</span>
                <span className="wishlist-txt">My Wishlist</span>
              </a> */}

                  {user ? (
                    <div className="dropdown cart-dropdown">
                      <a
                        href="#"
                        className="dropdown-toggle"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        data-display="static"
                      >
                        <i className="icon-shopping-cart"></i>
                        <span className="cart-count">
                          {cart ? cart.cartItems.length : `0`}
                        </span>
                        <span className="cart-txt">
                          {cart && formatPrice(cart.totalPrice)}
                        </span>
                      </a>

                      <div className="dropdown-menu dropdown-menu-right">
                        <div className="dropdown-cart-products">
                          {cart &&
                            cart.cartItems.map((item) => (
                              <div className="product" key={item.product}>
                                <div className="product-cart-details">
                                  <h4 className="product-title">
                                    <Link to={`/product/${item.product}`}>
                                      {item.name}
                                    </Link>
                                  </h4>

                                  <span className="cart-product-info">
                                    <span className="cart-product-qty">
                                      {item.quantity}
                                    </span>{" "}
                                    x {formatPrice(item.price)}
                                  </span>
                                </div>

                                <figure className="product-image-container">
                                  <Link
                                    to={`/product/${item.product}`}
                                    className="product-image"
                                  >
                                    <img src={item.image} alt={item.name} />
                                  </Link>
                                </figure>
                                <p
                                  className="btn-remove"
                                  title="Xóa sản phẩm"
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  onClick={() => deleteCartItems(item.product)}
                                >
                                  <i className="icon-close"></i>
                                </p>
                              </div>
                            ))}
                        </div>

                        <div className="dropdown-cart-total">
                          <span>Tổng cộng</span>

                          <span className="cart-total-price">
                            {cart && formatPrice(cart.totalPrice)}
                          </span>
                        </div>

                        <div className="dropdown-cart-action">
                          <a
                            href="/cart"
                            className="btn btn-outline-primary-2"
                            style={{
                              "&:hover": {
                                color: "#c96 !important",
                              },
                            }}
                          >
                            Giỏ hàng
                          </a>
                          <a
                            href="/checkout"
                            className="btn btn-outline-primary-2"
                          >
                            <span>Thanh toán</span>
                            <i className="icon-long-arrow-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="dropdown cart-dropdown">
                      <a
                        href="#"
                        className="dropdown-toggle"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        data-display="static"
                      >
                        <i className="icon-shopping-cart"></i>
                        <span className="cart-count">
                          {/* {cartItems && cartItems.length} */}
                          {toggle ? cartItems.length : `0`}
                        </span>
                        <span className="cart-txt">
                          {/* {cart && formatPrice(cart.totalPrice)} */}
                        </span>
                      </a>

                      <div className="dropdown-menu dropdown-menu-right">
                        <div className="dropdown-cart-products">
                          {cartItems &&
                            toggle &&
                            cartItems.map((item) => (
                              <div className="product" key={item.product}>
                                <div className="product-cart-details">
                                  <h4 className="product-title">
                                    <Link to={`/product/${item.product}`}>
                                      {item.name}
                                    </Link>
                                  </h4>

                                  <span className="cart-product-info">
                                    <span className="cart-product-qty">
                                      {item.quantity}
                                    </span>{" "}
                                    x {formatPrice(item.price)}
                                  </span>
                                </div>

                                <figure className="product-image-container">
                                  <Link
                                    to={`/product/${item.product}`}
                                    className="product-image"
                                  >
                                    <img src={item.image} alt={item.name} />
                                  </Link>
                                </figure>
                                <p
                                  className="btn-remove"
                                  title="Xóa sản phẩm"
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  onClick={() => deleteCartItems(item.product)}
                                >
                                  <i className="icon-close"></i>
                                </p>
                              </div>
                            ))}
                        </div>

                        <div className="dropdown-cart-total">
                          <span>Tổng cộng</span>

                          <span className="cart-total-price">
                            {/* {cart && formatPrice(cart.totalPrice)} */}
                          </span>
                        </div>

                        <div className="dropdown-cart-action">
                          <a
                            href="/cart"
                            className="btn btn-outline-primary-2"
                            style={{
                              "&:hover": {
                                color: "#c96 !important",
                              },
                            }}
                          >
                            Giỏ hàng
                          </a>
                          <a
                            href="/checkout"
                            className="btn btn-outline-primary-2"
                          >
                            <span>Thanh toán</span>
                            <i className="icon-long-arrow-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="header-bottom sticky-header">
              <div className="container">
                <div className="header-left">
                  <nav className="main-nav">
                    <ul className="menu sf-arrows">
                      <li className="megamenu-container">
                        <a href="/" className="">
                          Trang chủ
                        </a>
                      </li>
                      <li>
                        <a
                          href="/products"
                          // className="sf-with-ul"
                        >
                          Sản phẩm
                        </a>

                        {/* <div className="megamenu megamenu-sm">
                      <div className="row no-gutters">
                        <div className="col-md-6">
                          <div className="menu-col">
                            <div className="menu-title">Product Details</div>
                            <ul>
                              <li>
                                <a href="product.html">Default</a>
                              </li>
                              <li>
                                <a href="product-centered.html">Centered</a>
                              </li>
                              <li>
                                <a href="product-extended.html">
                                  <span>
                                    Extended Info
                                    <span className="tip tip-new">New</span>
                                  </span>
                                </a>
                              </li>
                              <li>
                                <a href="product-gallery.html">Gallery</a>
                              </li>
                              <li>
                                <a href="product-sticky.html">Sticky Info</a>
                              </li>
                              <li>
                                <a href="product-sidebar.html">
                                  Boxed With Sidebar
                                </a>
                              </li>
                              <li>
                                <a href="product-fullwidth.html">Full Width</a>
                              </li>
                              <li>
                                <a href="product-masonry.html">
                                  Masonry Sticky Info
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="banner banner-overlay">
                            <a href="category.html">
                              <img
                                src="assets/images/menu/banner-2.jpg"
                                alt="Banner"
                              />

                              <div className="banner-content banner-content-bottom">
                                <div className="banner-title text-white">
                                  New Trends
                                  <br />
                                  <span>
                                    <strong>spring 2019</strong>
                                  </span>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div> */}
                      </li>

                      <li>
                        <a href="/blog" className="">
                          Tin tức
                        </a>
                      </li>
                      <li>
                        <a href="/about" className="">
                          Về chúng tôi
                        </a>
                      </li>
                      <li>
                        <a href="/contact" className="">
                          Kết nối
                        </a>
                      </li>
                      <li>
                        <a href="/faq" className="">
                          F.A.Q
                        </a>
                      </li>
                    </ul>
                  </nav>

                  <button className="mobile-menu-toggler">
                    <span className="sr-only">Toggle mobile menu</span>
                    <i className="icon-bars"></i>
                  </button>
                </div>

                <div className="header-right"></div>
              </div>
            </div>
          </header>
        </div>
      )}
    </>
  );
}

export default Header;
