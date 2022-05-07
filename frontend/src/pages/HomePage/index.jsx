import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearErrors,
  getAdminProduct,
  getNProducts,
} from "../../actions/productAction";
import { loadUser } from "../../actions/userAction";
import store from "../../store";
import formatPrice from "../../ultils/formatPrice";
// import Carousel from "react-elastic-carousel";
import Carousel from "react-multi-carousel";
import "./Homepage.scss";
import Loader from "../../components/Common/Loader";
import MetaData from "../../components/Layout/MetaData";
import { CLEAR_ERRORS } from "../../constants/blogConstants";
import { getAllBlogs } from "../../actions/blogAction";
import moment from "moment";
import "moment/locale/vi";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { addToWishlist, getWishlist } from "../../actions/wishlistAction";
import { ADD_TO_CART_RESET } from "../../constants/cartConstants";
import { ADD_TO_WISHLIST_RESET } from "../../constants/wishlistConstants";
import { getAllBanners } from "../../actions/bannerAction";
moment.locale("vi");

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const responsive2 = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function HomePage() {
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [errorAlert, setErrorAlert] = useState("");
  const [successAlert, setSuccessAlert] = useState("");

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };
  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
  };

  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.nProducts);

  const {
    banners,
    error: bannerErrors,
    loading: bannerLoading,
  } = useSelector((state) => state.banners);

  console.log(banners);

  useEffect(() => {
    if (bannerErrors) {
      setOpenError(true);
      setErrorAlert(bannerErrors);
      dispatch(clearErrors());
    }
    dispatch(getAllBanners());
  }, [dispatch, bannerErrors]);

  const {
    blogs,
    loading: blogLoading,
    error: blogError,
  } = useSelector((state) => state.blogs);

  const {
    loading: allProductsLoading,
    error: allProductsError,
    products: allProducts,
  } = useSelector((state) => state.productsAdmin);

  const { error: wishlistError, isUpdated: wishlistUpdated } = useSelector(
    (state) => state.wishlist
  );

  const addToWishlistHandler = (id) => {
    if (wishlistError) {
      setOpenError(true);
      setErrorAlert(wishlistError);
      return;
    }
    dispatch(addToWishlist(id));
    setOpenSuccess(true);
    setSuccessAlert("Thêm sản phẩm vào danh sách yêu thích thành công");
  };

  useEffect(() => {
    if (wishlistError) {
      setOpenError(true);
      setErrorAlert(wishlistError);
      dispatch(clearErrors());
    }
    if (wishlistUpdated) {
      dispatch(getWishlist());
      dispatch({ type: ADD_TO_WISHLIST_RESET });
    }
  }, [dispatch, wishlistError, wishlistUpdated]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    if (error) {
      setOpenError(true);
      setErrorAlert(error);
      dispatch(clearErrors());
    }
    if (blogError) {
      setOpenError(true);
      setErrorAlert(blogError);
      dispatch(CLEAR_ERRORS());
    }
    dispatch(getNProducts());
    dispatch(getAdminProduct());
    dispatch(getAllBlogs());
  }, [dispatch, blogError, error]);

  return (
    <>
      {allProductsLoading ? (
        <Loader />
      ) : (
        <main className="main">
          <MetaData title="Đồng hồ PVH" />;
          <Snackbar
            open={openError}
            autoHideDuration={5000}
            onClose={handleCloseError}
          >
            <Alert
              onClose={handleCloseError}
              severity="warning"
              sx={{ width: "100%", fontSize: "0.85em" }}
            >
              {errorAlert}
            </Alert>
          </Snackbar>
          <Snackbar
            open={openSuccess}
            autoHideDuration={3000}
            onClose={handleCloseSuccess}
          >
            <Alert
              onClose={handleCloseSuccess}
              severity="success"
              sx={{ width: "100%", fontSize: "0.85em" }}
            >
              {successAlert}
            </Alert>
          </Snackbar>
          {bannerLoading ? (
            <Loader />
          ) : (
            <div
              className="intro-slider-container"
              style={{
                marginBottom: "100px",
              }}
            >
              <Carousel
                swipeable={true}
                draggable={true}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={false}
                autoPlaySpeed={20000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container1"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                // deviceType={this.props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
              >
                {/* <img
                src="assets/images/banners/home/banner-dongho.png"
                alt="banner 1"
              />
              <img
                src="assets/images/banners/home/banner-dongho3.png"
                alt="banner 3"
                style={{
                  width: "85%",
                  margin: "0 auto",
                }}
              /> */}
                {banners &&
                  banners[0] &&
                  banners[0].images.map((image) => (
                    <img
                      src={image.url}
                      alt="banner"
                      key={image.public_id}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ))}
              </Carousel>
            </div>
          )}
          <div className="pt-2 pb-3">
            <div className="container">
              <div className="row">
                <div className="col-sm-6">
                  <div className="banner banner-overlay">
                    <a href="/products-women">
                      <img
                        src="assets/images/demos/demo-6/banners/banner-1.jpg"
                        alt="Banner"
                      />
                    </a>
                    {/*  */}
                    <div className="banner-content banner-content-center">
                      <h4 className="banner-subtitle text-white">
                        <a href="/products-women">Đồng hồ</a>
                      </h4>
                      <h3 className="banner-title text-white">
                        <a href="/products-women">
                          <strong>Nữ</strong>
                        </a>
                      </h3>
                      <a
                        href="/products-women"
                        className="btn btn-outline-white banner-link underline"
                      >
                        Mua ngay
                      </a>
                    </div>
                    {/* End .banner-content */}
                  </div>
                  {/* End .banner */}
                </div>
                {/* End .col-sm-6 */}

                <div className="col-sm-6">
                  <div className="banner banner-overlay">
                    <a href="/products-men">
                      <img
                        src="assets/images/demos/demo-6/banners/banner-2.jpg"
                        alt="Banner"
                      />
                    </a>

                    <div className="banner-content banner-content-center">
                      <h4 className="banner-subtitle text-white">
                        <a href="/products-men">Đồng hồ</a>
                      </h4>
                      <h3 className="banner-title text-white">
                        <a href="/products-men">
                          <strong>Nam</strong>
                        </a>
                      </h3>
                      <a
                        href="/products-men"
                        className="btn btn-outline-white banner-link underline"
                      >
                        Mua ngay
                      </a>
                    </div>
                  </div>
                  {/* End .banner */}
                </div>
              </div>
              <hr className="mt-0 mb-0" />
            </div>
          </div>
          <div className="mb-5"></div>
          {/* End .mb-5 */}
          <div className="container">
            <div className="heading heading-center mb-3">
              <h2 className="title">Sản phẩm sale</h2>
              {/* End .title */}

              <ul
                className="nav nav-pills justify-content-center"
                role="tablist"
              >
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="trending-all-link"
                    data-toggle="tab"
                    href="#trending-all-tab"
                    role="tab"
                    aria-controls="trending-all-tab"
                    aria-selected="true"
                  >
                    Tất cả
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="trending-women-link"
                    data-toggle="tab"
                    href="#trending-women-tab"
                    role="tab"
                    aria-controls="trending-women-tab"
                    aria-selected="false"
                  >
                    Nữ
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="trending-men-link"
                    data-toggle="tab"
                    href="#trending-men-tab"
                    role="tab"
                    aria-controls="trending-men-tab"
                    aria-selected="false"
                  >
                    Nam
                  </a>
                </li>
              </ul>
            </div>
            {/* End .heading */}
            {/*  */}
            <div className="tab-content tab-content-carousel">
              <div
                className="tab-pane p-0 fade show active"
                id="trending-all-tab"
                role="tabpanel"
                aria-labelledby="trending-all-link"
              >
                <div className="container">
                  <div className="row justify-content-center">
                    {allProducts &&
                      allProducts
                        .filter((product) => product.discountActive === true)
                        .map((product) => {
                          return (
                            <div
                              className="col-6 col-md-4 col-lg-3"
                              key={product._id}
                            >
                              <div className="product product-7 text-center">
                                <figure className="product-media">
                                  <span className="product-label label-sale">
                                    sale
                                  </span>
                                  <Link to={`/product/${product._id}`}>
                                    <img
                                      src={product.images[0].url}
                                      alt={product.name}
                                      className="product-image"
                                    />
                                    {product.images[1] ? (
                                      <img
                                        src={product.images[1].url}
                                        alt={product.name}
                                        className="product-image-hover"
                                      />
                                    ) : (
                                      <img
                                        src={product.images[0].url}
                                        alt={product.name}
                                        className="product-image-hover"
                                      />
                                    )}
                                  </Link>

                                  <div className="product-action-vertical">
                                    <p
                                      onClick={() =>
                                        addToWishlistHandler(product._id)
                                      }
                                      className="btn-product-icon btn-wishlist btn-expandable"
                                      style={{
                                        cursor: "pointer",
                                        transition: "all 0.25s linear",
                                      }}
                                    >
                                      <span>Thêm vào danh sách yêu thích</span>
                                    </p>
                                  </div>

                                  <div className="product-action">
                                    <a
                                      href="#"
                                      className="btn-product btn-cart"
                                    >
                                      <span>
                                        <span
                                          style={{ textTransform: "uppercase" }}
                                        >
                                          C
                                        </span>
                                        lick để xem chi tiết
                                      </span>
                                    </a>
                                  </div>
                                </figure>

                                <div className="product-body">
                                  <div className="product-cat">
                                    <a href="#">{product.category.name}</a>
                                  </div>
                                  {/* End .product-cat */}
                                  <h3 className="product-title">
                                    <Link to={`/product/${product._id}`}>
                                      {product.name}
                                    </Link>
                                  </h3>
                                  {/* End .product-title */}
                                  <div className="product-price">
                                    {/* {formatPrice(product.price)} */}
                                    <span className="new-price">
                                      {formatPrice(
                                        product.price -
                                          product.price *
                                            (product.discountPercent / 100)
                                      )}
                                    </span>
                                    <span className="old-price">
                                      <del>{formatPrice(product.price)}</del>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                  </div>
                </div>

                {/* End .product */}

                {/* End .owl-carousel */}
              </div>
              {/* .End .tab-pane */}
              <div
                className="tab-pane p-0 fade"
                id="trending-women-tab"
                role="tabpanel"
                aria-labelledby="trending-women-link"
              >
                <div
                  className="owl-carousel owl-simple carousel-equal-height carousel-with-shadow"
                  data-toggle="owl"
                  data-owl-options='{
                                "nav": false, 
                                "dots": true,
                                "margin": 20,
                                "loop": false,
                                "responsive": {
                                    "0": {
                                        "items":0
                                    },
                                    "480": {
                                        "items":2
                                    },
                                    "768": {
                                        "items":3
                                    },
                                    "992": {
                                        "items":4
                                    },
                                    "1200": {
                                        "items":4,
                                        "nav": true,
                                        "dots": false
                                    }
                                }
                            }'
                >
                  <div className="product product-7 text-center">
                    <figure className="product-media">
                      <span className="product-label label-sale">sale</span>
                      <a href="product.html">
                        <img
                          src="assets/images/demos/demo-6/products/product-1-1.jpg"
                          alt="Product"
                          className="product-image"
                        />
                        <img
                          src="assets/images/demos/demo-6/products/product-1-2.jpg"
                          alt="Product"
                          className="product-image-hover"
                        />
                      </a>

                      <div className="product-action-vertical">
                        <a
                          href="#"
                          className="btn-product-icon btn-wishlist btn-expandable"
                        >
                          <span>Thêm vào danh sách yêu thích</span>
                        </a>
                      </div>
                      {/* End .product-action-vertical */}

                      <div className="product-action">
                        <a href="#" className="btn-product btn-cart">
                          <span>
                            <span style={{ textTransform: "uppercase" }}>
                              C
                            </span>
                            lick để xem chi tiết
                          </span>
                        </a>
                      </div>
                      {/* End .product-action */}
                    </figure>
                    {/* End .product-media */}

                    <div className="product-body">
                      <div className="product-cat">
                        <a href="#">Seiko</a>
                      </div>
                      {/* End .product-cat */}
                      <h3 className="product-title">
                        <a href="product.html">Denim jacket</a>
                      </h3>
                      {/* End .product-title */}
                      <div className="product-price">
                        $19.99
                        <span className="new-price">Now $7.99</span>
                        <span className="old-price">Was $12.99</span>
                      </div>
                      {/* End .product-price */}
                    </div>
                  </div>
                </div>
                {/* End .owl-carousel */}
              </div>
              {/* .End .tab-pane */}

              <div
                className="tab-pane p-0 fade"
                id="trending-men-tab"
                role="tabpanel"
                aria-labelledby="trending-men-link"
              >
                <div
                  className="owl-carousel owl-simple carousel-equal-height carousel-with-shadow"
                  data-toggle="owl"
                  data-owl-options='{
                                "nav": false, 
                                "dots": true,
                                "margin": 20,
                                "loop": false,
                                "responsive": {
                                    "0": {
                                        "items":0
                                    },
                                    "480": {
                                        "items":2
                                    },
                                    "768": {
                                        "items":3
                                    },
                                    "992": {
                                        "items":4
                                    },
                                    "1200": {
                                        "items":4,
                                        "nav": true,
                                        "dots": false
                                    }
                                }
                            }'
                >
                  <div className="product product-7 text-center">
                    <figure className="product-media">
                      <span className="product-label label-sale">sale</span>
                      <a href="product.html">
                        <img
                          src="assets/images/demos/demo-6/products/product-1-1.jpg"
                          alt="Product"
                          className="product-image"
                        />
                        <img
                          src="assets/images/demos/demo-6/products/product-1-2.jpg"
                          alt="Product"
                          className="product-image-hover"
                        />
                      </a>

                      <div className="product-action-vertical">
                        <a
                          href="#"
                          className="btn-product-icon btn-wishlist btn-expandable"
                        >
                          <span>Thêm vào danh sách yêu thích</span>
                        </a>
                      </div>
                      {/* End .product-action-vertical */}

                      <div className="product-action">
                        <a href="#" className="btn-product btn-cart">
                          <span>
                            <span style={{ textTransform: "uppercase" }}>
                              C
                            </span>
                            lick để xem chi tiết
                          </span>
                        </a>
                      </div>
                      {/* End .product-action */}
                    </figure>
                    {/* End .product-media */}

                    <div className="product-body">
                      <div className="product-cat">
                        <a href="#">Seiko</a>
                      </div>
                      {/* End .product-cat */}
                      <h3 className="product-title">
                        <a href="product.html">Denim jacket</a>
                      </h3>
                      {/* End .product-title */}
                      <div className="product-price">
                        $19.99
                        <span className="new-price">Now $7.99</span>
                        <span className="old-price">Was $12.99</span>
                      </div>
                      {/* End .product-price */}
                    </div>
                  </div>
                </div>
                {/* End .owl-carousel */}
              </div>
              {/* .End .tab-pane */}
            </div>
            {/* End .tab-content */}
          </div>
          {/* End .container */}
          <div className="mb-5"></div>
          {/* End .mb-5 */}
          <div className="pt-4 pb-3" style={{ backgroundColor: "#222" }}>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-3 col-sm-6">
                  <div className="icon-box text-center">
                    <span className="icon-box-icon">
                      <i className="icon-truck"></i>
                    </span>
                    <div className="icon-box-content">
                      <h3 className="icon-box-title">
                        Thanh toán & Vận chuyển
                      </h3>
                      {/* End .icon-box-title */}
                      <p>Miễn phí vận chuyển</p>
                    </div>
                    {/* End .icon-box-content */}
                  </div>
                  {/* End .icon-box */}
                </div>
                {/* End .col-lg-3 col-sm-6 */}

                <div className="col-lg-3 col-sm-6">
                  <div className="icon-box text-center">
                    <span className="icon-box-icon">
                      <i className="icon-rotate-left"></i>
                    </span>
                    <div className="icon-box-content">
                      <h3 className="icon-box-title">Hoàn tiền & Đổi trả</h3>
                      {/* End .icon-box-title */}
                      <p>1 đổi 1 trong vòng 30 ngày nếu lỗi nhà sản xuất</p>
                    </div>
                    {/* End .icon-box-content */}
                  </div>
                  {/* End .icon-box */}
                </div>
                {/* End .col-lg-3 col-sm-6 */}

                <div className="col-lg-3 col-sm-6">
                  <div className="icon-box text-center">
                    <span className="icon-box-icon">
                      <i className="icon-unlock"></i>
                    </span>
                    <div className="icon-box-content">
                      <h3 className="icon-box-title">Bảo mật</h3>
                      <p>100% bảo mật thông tin</p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-sm-6">
                  <div className="icon-box text-center">
                    <span className="icon-box-icon">
                      <i className="icon-headphones"></i>
                    </span>
                    <div className="icon-box-content">
                      <h3 className="icon-box-title">Hỗ trợ</h3>
                      <p>Hỗ trợ 24/7</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-6"></div>
          <div className="container">
            <h2 className="title text-center mb-4">Sản phẩm mới</h2>

            <div className="products">
              <div className="row justify-content-center">
                {products &&
                  products.map((product) => {
                    return (
                      <div
                        className="col-6 col-md-4 col-lg-3"
                        key={product._id}
                      >
                        <div className="product product-7 text-center">
                          <figure className="product-media">
                            {product.discountActive ? (
                              <span className="product-label label-sale">
                                sale
                              </span>
                            ) : (
                              ""
                            )}
                            {product.Stock < 0 ? (
                              <span className="product-label label-out">
                                Hết hàng
                              </span>
                            ) : (
                              ""
                            )}
                            <Link to={`/product/${product._id}`}>
                              <img
                                src={product.images[0].url}
                                alt={product.name}
                                className="product-image"
                              />
                              {product.images[1] ? (
                                <img
                                  src={product.images[1].url}
                                  alt={product.name}
                                  className="product-image-hover"
                                />
                              ) : (
                                <img
                                  src={product.images[0].url}
                                  alt={product.name}
                                  className="product-image-hover"
                                />
                              )}
                            </Link>

                            <div className="product-action-vertical">
                              <p
                                onClick={() =>
                                  addToWishlistHandler(product._id)
                                }
                                className="btn-product-icon btn-wishlist btn-expandable"
                                style={{
                                  cursor: "pointer",
                                  transition: "all 0.25s linear",
                                }}
                              >
                                <span>Thêm vào danh sách yêu thích</span>
                              </p>
                            </div>

                            <div className="product-action">
                              <a href="#" className="btn-product btn-cart">
                                <span>
                                  <span style={{ textTransform: "uppercase" }}>
                                    C
                                  </span>
                                  lick để xem chi tiết
                                </span>
                              </a>
                            </div>
                          </figure>

                          <div className="product-body">
                            <div className="product-cat">
                              <a href="#">{product.category.name}</a>
                            </div>
                            {/* End .product-cat */}
                            <h3 className="product-title">
                              <Link to={`/product/${product._id}`}>
                                {product.name}
                              </Link>
                            </h3>
                            {/* End .product-title */}
                            <div className="product-price">
                              {product.discountActive ? (
                                <>
                                  <span className="new-price">
                                    {formatPrice(
                                      product.price -
                                        product.price *
                                          (product.discountPercent / 100)
                                    )}
                                  </span>
                                  <span className="old-price">
                                    <del>{formatPrice(product.price)}</del>
                                  </span>
                                </>
                              ) : (
                                formatPrice(product.price)
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              {/* End .row */}
            </div>
            {/* End .products */}

            <div className="more-container text-center mt-2">
              <a href="/products" className="btn btn-outline-dark-2 btn-more">
                <span>Xem thêm</span>
              </a>
            </div>
          </div>
          <div className="pb-3">
            <div className="container brands pt-5 pt-lg-7 ">
              <h2 className="title text-center mb-4">Thương hiệu</h2>

              <div
                className="owl-carousel owl-simple"
                data-toggle="owl"
                data-owl-options='{
                            "nav": false, 
                            "dots": false,
                            "margin": 30,
                            "loop": false,
                            "responsive": {
                                "0": {
                                    "items":2
                                },
                                "420": {
                                    "items":3
                                },
                                "600": {
                                    "items":4
                                },
                                "900": {
                                    "items":5
                                },
                                "1024": {
                                    "items":6
                                }
                            }
                        }'
              >
                <a href="#" className="brand">
                  <img src="assets/images/logo/brand-seiko.png" alt="Seiko" />
                </a>

                <a href="#" className="brand">
                  <img src="assets/images/logo/brand-orient.png" alt="Orient" />
                </a>

                <a href="#" className="brand">
                  <img src="assets/images/logo/brand-bently.png" alt="Bently" />
                </a>

                <a href="#" className="brand">
                  <img
                    src="assets/images/logo/brand-citizen.png"
                    alt="Citizen"
                  />
                </a>

                <a href="#" className="brand">
                  <img src="assets/images/logo/brand-1.png" alt="OJ" />
                </a>

                <a href="#" className="brand">
                  <img src="assets/images/logo/brand-bulova.png" alt="Bulova" />
                </a>

                <a href="#" className="brand">
                  <img
                    src="assets/images/logo/brand-freelook.png"
                    alt="Freelock"
                  />
                </a>
              </div>
            </div>

            <div className="mb-5 mb-lg-7"></div>

            <div className="container newsletter">
              <div className="row">
                <div className="col-lg-6 banner-overlay-div">
                  <div className="banner banner-overlay">
                    <a href="#">
                      <img
                        src="assets/images/demos/demo-6/banners/banner-3.jpg"
                        alt="Banner"
                      />
                    </a>

                    <div className="banner-content banner-content-center">
                      <h4 className="banner-subtitle text-white">
                        <a href="#">Limited time only.</a>
                      </h4>
                      <h3 className="banner-title text-white">
                        <a href="#">
                          End of Season
                          <br />
                          save 50% off
                        </a>
                      </h3>
                      <a
                        href="#"
                        className="btn btn-outline-white banner-link underline"
                      >
                        Shop Now
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 d-flex align-items-stretch subscribe-div">
                  <div className="cta cta-box">
                    <div className="cta-content">
                      <h3 className="cta-title">
                        Đăng ký để nhận thông tin mới nhất
                      </h3>
                      <p>Đăng ký ngay bây giờ </p>

                      <form action="#">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Nhập địa chỉ email của bạn"
                          aria-label="Email Adress"
                          required
                        />
                        <div className="text-center">
                          <button
                            className="btn btn-outline-dark-2"
                            type="submit"
                          >
                            <span>Đăng ký</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-2"></div>
          <div className="container"></div>
          <div className="blog-posts mb-5">
            <div className="container">
              <h2 className="title text-center mb-4">Tin tức</h2>
              <Carousel
                swipeable={true}
                draggable={true}
                showDots={true}
                responsive={responsive2}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={false}
                autoPlaySpeed={20000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                // deviceType={this.props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
              >
                {blogs &&
                  blogs.map((blog) => (
                    <article className="entry" key={blog._id}>
                      <figure className="entry-media">
                        <Link to={`/blog/${blog._id}`}>
                          <img
                            src={blog.image && blog.image.url}
                            alt={blog.name}
                            style={{ maxHeight: "150px" }}
                          />
                        </Link>
                      </figure>
                      {/* End .entry-media */}

                      <div className="entry-body text-center">
                        <div className="entry-meta">
                          <a href="#">
                            {moment(blog.createdAt).format("DD/MM/YYYY")}
                          </a>
                          , {blog.numOfReviews} Bình luận
                        </div>
                        {/* End .entry-meta */}

                        <h3 className="entry-title">
                          <Link to={`/blog/${blog._id}`}>{blog.name}</Link>
                        </h3>
                        {/* End .entry-title */}

                        <div className="entry-content">
                          <Link to={`/blog/${blog._id}`} className="read-more">
                            Đọc thêm
                          </Link>
                        </div>
                        {/* End .entry-content */}
                      </div>
                      {/* End .entry-body */}
                    </article>
                  ))}
              </Carousel>

              {/* End .owl-carousel */}
            </div>
            {/* End .container */}
          </div>
          {/*  End .blog-posts */}
          <div className="bg-light-2 pt-7 pb-6 testimonials">
            <div className="container">
              <h2 className="title text-center mb-2">
                Khách hàng nói về chúng tôi
              </h2>
              <Carousel
                swipeable={true}
                draggable={true}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={false}
                autoPlaySpeed={20000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                // deviceType={this.props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
              >
                <blockquote className="testimonial testimonial-icon text-center">
                  <p className="lead">“Cửa hàng tuyệt vời”</p>
                  {/* End .lead */}
                  <p>
                    “ Tôi thực sự an tâm và tin tưởng vào chất lượng dịch vụ của
                    XWatch. Lần đầu tiên thấy chiếc đồng hồ của mình được
                    chăm...
                    <br />
                    a, ultricies in, diam. Sed arcu. ”
                  </p>

                  <cite>
                    MC Thái Tuấn,
                    <span>Đài THVN</span>
                  </cite>
                </blockquote>

                <blockquote className="testimonial testimonial-icon text-center">
                  <p className="lead">“Hỗ trợ tận tình”</p>
                  <p>
                    “Điều mà Linh ấn tượng nhất là chế độ bảo hành 5 năm theo
                    tiêu chuẩn Thuỵ Sĩ cho cả lỗi người dùng. Điều này không
                    phải...”
                  </p>

                  <cite>
                    Dương Khắc Linh
                    <span>Nhạc sĩ</span>
                  </cite>
                </blockquote>

                <blockquote className="testimonial testimonial-icon text-center">
                  <p className="lead">“Miễn phí vận chuyển”</p>
                  {/* End .lead */}
                  <p>
                    “ Tôi ủng hộ những người đặt lợi ích của khách hàng làm mục
                    tiêu phấn đấu. Vì vậy, tôi đã ủng hộ và lựa chọn PVH. ”
                  </p>

                  <cite>
                    Xuân Bắc
                    <span>Nghệ sỹ</span>
                  </cite>
                </blockquote>
              </Carousel>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default HomePage;
