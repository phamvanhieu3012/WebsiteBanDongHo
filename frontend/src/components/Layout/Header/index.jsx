import React from "react";

function Header() {
  return (
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
                  href="#"
                  className="social-icon social-facebook"
                  title="Facebook"
                  target="_blank"
                >
                  <i className="icon-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="social-icon social-twitter"
                  title="Twitter"
                  target="_blank"
                >
                  <i className="icon-twitter"></i>
                </a>
                <a
                  href="#"
                  className="social-icon social-pinterest"
                  title="Instagram"
                  target="_blank"
                >
                  <i className="icon-pinterest-p"></i>
                </a>
                <a
                  href="#"
                  className="social-icon social-instagram"
                  title="Pinterest"
                  target="_blank"
                >
                  <i className="icon-instagram"></i>
                </a>
              </div>
              <ul className="top-menu top-link-menu">
                <li>
                  <a href="#">Links</a>
                  <ul>
                    <li>
                      <a href="/login">
                        <i className="icon-user"></i>Login
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>

              <div className="header-dropdown">
                <a href="#">Eng</a>
                <div className="header-menu">
                  <ul>
                    <li>
                      <a href="#">English</a>
                    </li>
                    <li>
                      <a href="#">French</a>
                    </li>
                    <li>
                      <a href="#">Spanish</a>
                    </li>
                  </ul>
                </div>
              </div>
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
                <form action="#" method="get">
                  <div className="header-search-wrapper search-wrapper-wide">
                    <label htmlFor="q" className="sr-only">
                      Search
                    </label>
                    <button className="btn btn-primary" type="submit">
                      <i className="icon-search"></i>
                    </button>
                    <input
                      type="search"
                      className="form-control"
                      name="q"
                      id="q"
                      placeholder="Search product ..."
                      required
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="header-center">
              <a href="/" className="logo">
                <img
                  src="assets/images/demos/demo-6/logo.png"
                  alt="Molla Logo"
                  width="82"
                  height="20"
                />
              </a>
            </div>

            <div className="header-right">
              <a href="wishlist.html" className="wishlist-link">
                <i className="icon-heart-o"></i>
                <span className="wishlist-count">3</span>
                <span className="wishlist-txt">My Wishlist</span>
              </a>

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
                  <span className="cart-count">2</span>
                  <span className="cart-txt">$ 164,00</span>
                </a>

                <div className="dropdown-menu dropdown-menu-right">
                  <div className="dropdown-cart-products">
                    <div className="product">
                      <div className="product-cart-details">
                        <h4 className="product-title">
                          <a href="product.html">
                            Beige knitted elastic runner shoes
                          </a>
                        </h4>

                        <span className="cart-product-info">
                          <span className="cart-product-qty">1</span>x $84.00
                        </span>
                      </div>

                      <figure className="product-image-container">
                        <a href="product.html" className="product-image">
                          <img
                            src="assets/images/products/cart/product-1.jpg"
                            alt="product"
                          />
                        </a>
                      </figure>
                      <a href="#" className="btn-remove" title="Remove Product">
                        <i className="icon-close"></i>
                      </a>
                    </div>

                    <div className="product">
                      <div className="product-cart-details">
                        <h4 className="product-title">
                          <a href="product.html">
                            Blue utility pinafore denim dress
                          </a>
                        </h4>

                        <span className="cart-product-info">
                          <span className="cart-product-qty">1</span>x $76.00
                        </span>
                      </div>

                      <figure className="product-image-container">
                        <a href="product.html" className="product-image">
                          <img
                            src="assets/images/products/cart/product-2.jpg"
                            alt="product"
                          />
                        </a>
                      </figure>
                      <a href="#" className="btn-remove" title="Remove Product">
                        <i className="icon-close"></i>
                      </a>
                    </div>
                  </div>

                  <div className="dropdown-cart-total">
                    <span>Total</span>

                    <span className="cart-total-price">$160.00</span>
                  </div>

                  <div className="dropdown-cart-action">
                    <a href="cart.html" className="btn btn-primary">
                      View Cart
                    </a>
                    <a
                      href="checkout.html"
                      className="btn btn-outline-primary-2"
                    >
                      <span>Checkout</span>
                      <i className="icon-long-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-bottom sticky-header">
          <div className="container">
            <div className="header-left">
              <nav className="main-nav">
                <ul className="menu sf-arrows">
                  <li className="megamenu-container active">
                    <a href="/" className="">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="category.html" className="sf-with-ul">
                      Shop
                    </a>

                    <div className="megamenu megamenu-md">
                      <div className="row no-gutters">
                        <div className="col-md-8">
                          <div className="menu-col">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="menu-title">
                                  Shop with sidebar
                                </div>
                                <ul>
                                  <li>
                                    <a href="category-list.html">Shop List</a>
                                  </li>
                                  <li>
                                    <a href="category-2cols.html">
                                      Shop Grid 2 Columns
                                    </a>
                                  </li>
                                  <li>
                                    <a href="category.html">
                                      Shop Grid 3 Columns
                                    </a>
                                  </li>
                                  <li>
                                    <a href="category-4cols.html">
                                      Shop Grid 4 Columns
                                    </a>
                                  </li>
                                  <li>
                                    <a href="category-market.html">
                                      <span>
                                        Shop Market
                                        <span className="tip tip-new">New</span>
                                      </span>
                                    </a>
                                  </li>
                                </ul>

                                <div className="menu-title">
                                  Shop no sidebar
                                </div>
                                <ul>
                                  <li>
                                    <a href="category-boxed.html">
                                      <span>
                                        Shop Boxed No Sidebar
                                        <span className="tip tip-hot">Hot</span>
                                      </span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="category-fullwidth.html">
                                      Shop Fullwidth No Sidebar
                                    </a>
                                  </li>
                                </ul>
                              </div>

                              <div className="col-md-6">
                                <div className="menu-title">
                                  Product Category
                                </div>
                                <ul>
                                  <li>
                                    <a href="product-category-boxed.html">
                                      Product Category Boxed
                                    </a>
                                  </li>
                                  <li>
                                    <a href="product-category-fullwidth.html">
                                      <span>
                                        Product Category Fullwidth
                                        <span className="tip tip-new">New</span>
                                      </span>
                                    </a>
                                  </li>
                                </ul>
                                <div className="menu-title">Shop Pages</div>
                                <ul>
                                  <li>
                                    <a href="cart.html">Cart</a>
                                  </li>
                                  <li>
                                    <a href="checkout.html">Checkout</a>
                                  </li>
                                  <li>
                                    <a href="wishlist.html">Wishlist</a>
                                  </li>
                                  <li>
                                    <a href="dashboard.html">My Account</a>
                                  </li>
                                  <li>
                                    <a href="#">Lookbook</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="banner banner-overlay">
                            <a
                              href="category.html"
                              className="banner banner-menu"
                            >
                              <img
                                src="assets/images/menu/banner-1.jpg"
                                alt="Banner"
                              />

                              <div className="banner-content banner-content-top">
                                <div className="banner-title text-white">
                                  Last <br />
                                  Chance
                                  <br />
                                  <span>
                                    <strong>Sale</strong>
                                  </span>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <a href="/products" className="sf-with-ul">
                      Product
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
                    <a href="#" className="sf-with-ul">
                      Pages
                    </a>
                    <ul>
                      <li>
                        <a href="about.html">About</a>
                      </li>
                      <li>
                        <a href="contact.html">Contact</a>
                      </li>
                      <li>
                        <a href="faq.html">FAQs</a>
                      </li>
                      <li>
                        <a href="404.html">Error 404</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="/blog" className="">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="">
                      Contact
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
  );
}

export default Header;
