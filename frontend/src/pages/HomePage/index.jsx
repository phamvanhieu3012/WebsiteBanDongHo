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
    setSuccessAlert("Th??m s???n ph???m v??o danh s??ch y??u th??ch th??nh c??ng");
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
          <MetaData title="?????ng h??? PVH" />;
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
                        <a href="/products-women">?????ng h???</a>
                      </h4>
                      <h3 className="banner-title text-white">
                        <a href="/products-women">
                          <strong>N???</strong>
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
                        <a href="/products-men">?????ng h???</a>
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
              <h2 className="title">S???n ph???m sale</h2>
              {/* End .title */}
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
                                      <span>Th??m v??o danh s??ch y??u th??ch</span>
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
                                        lick ????? xem chi ti???t
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
              </div>
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
                        Thanh to??n & V???n chuy???n
                      </h3>
                      {/* End .icon-box-title */}
                      <p>Mi???n ph?? v???n chuy???n</p>
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
                      <h3 className="icon-box-title">Ho??n ti???n & ?????i tr???</h3>
                      {/* End .icon-box-title */}
                      <p>1 ?????i 1 trong v??ng 30 ng??y n???u l???i nh?? s???n xu???t</p>
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
                      <h3 className="icon-box-title">B???o m???t</h3>
                      <p>100% b???o m???t th??ng tin</p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-sm-6">
                  <div className="icon-box text-center">
                    <span className="icon-box-icon">
                      <i className="icon-headphones"></i>
                    </span>
                    <div className="icon-box-content">
                      <h3 className="icon-box-title">H??? tr???</h3>
                      <p>H??? tr??? 24/7</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-6"></div>
          <div className="container">
            <h2 className="title text-center mb-4">S???n ph???m m???i</h2>

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
                                H???t h??ng
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
                                <span>Th??m v??o danh s??ch y??u th??ch</span>
                              </p>
                            </div>

                            <div className="product-action">
                              <a href="#" className="btn-product btn-cart">
                                <span>
                                  <span style={{ textTransform: "uppercase" }}>
                                    C
                                  </span>
                                  lick ????? xem chi ti???t
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
                <span>Xem th??m</span>
              </a>
            </div>
          </div>
          <div className="pb-3">
            <div className="container brands pt-5 pt-lg-7 ">
              <h2 className="title text-center mb-4">Th????ng hi???u</h2>

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
                        ????ng k?? ????? nh???n th??ng tin m???i nh???t
                      </h3>
                      <p>????ng k?? ngay b??y gi??? </p>

                      <form action="#">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Nh???p ?????a ch??? email c???a b???n"
                          aria-label="Email Adress"
                          required
                        />
                        <div className="text-center">
                          <button
                            className="btn btn-outline-dark-2"
                            type="submit"
                          >
                            <span>????ng k??</span>
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
              <h2 className="title text-center mb-4">Tin t???c</h2>
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
                          , {blog.numOfReviews} B??nh lu???n
                        </div>
                        {/* End .entry-meta */}

                        <h3 className="entry-title">
                          <Link to={`/blog/${blog._id}`}>{blog.name}</Link>
                        </h3>
                        {/* End .entry-title */}

                        <div className="entry-content">
                          <Link to={`/blog/${blog._id}`} className="read-more">
                            ?????c th??m
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
                Kh??ch h??ng n??i v??? ch??ng t??i
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
                  <p className="lead">???C???a h??ng tuy???t v???i???</p>
                  {/* End .lead */}
                  <p>
                    ??? T??i th???c s??? an t??m v?? tin t?????ng v??o ch???t l?????ng d???ch v??? c???a
                    XWatch. L???n ?????u ti??n th???y chi???c ?????ng h??? c???a m??nh ???????c
                    ch??m...
                    <br />
                    a, ultricies in, diam. Sed arcu. ???
                  </p>

                  <cite>
                    MC Th??i Tu???n,
                    <span>????i THVN</span>
                  </cite>
                </blockquote>

                <blockquote className="testimonial testimonial-icon text-center">
                  <p className="lead">???H??? tr??? t???n t??nh???</p>
                  <p>
                    ?????i???u m?? Linh ???n t?????ng nh???t l?? ch??? ????? b???o h??nh 5 n??m theo
                    ti??u chu???n Thu??? S?? cho c??? l???i ng?????i d??ng. ??i???u n??y kh??ng
                    ph???i...???
                  </p>

                  <cite>
                    D????ng Kh???c Linh
                    <span>Nh???c s??</span>
                  </cite>
                </blockquote>

                <blockquote className="testimonial testimonial-icon text-center">
                  <p className="lead">???Mi???n ph?? v???n chuy???n???</p>
                  {/* End .lead */}
                  <p>
                    ??? T??i ???ng h??? nh???ng ng?????i ?????t l???i ??ch c???a kh??ch h??ng l??m m???c
                    ti??u ph???n ?????u. V?? v???y, t??i ???? ???ng h??? v?? l???a ch???n PVH. ???
                  </p>

                  <cite>
                    Xu??n B???c
                    <span>Ngh??? s???</span>
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
