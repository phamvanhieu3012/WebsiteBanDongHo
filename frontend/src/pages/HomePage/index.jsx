import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getNProducts } from "../../actions/productAction";
import { loadUser } from "../../actions/userAction";
import store from "../../store";
import formatPrice from "../../ultils/formatPrice";
import Carousel from "react-elastic-carousel";
import "./Homepage.scss";

function HomePage() {
  const { products, loading, error } = useSelector((state) => state.nProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNProducts());
  }, [dispatch]);

  return (
    <main className="main">
      <div className="intro-slider-container">
        <Carousel itemsToShow={1} pagination={false}>
          {/*
             <div className="container intro-content text-center">
              <h3 className="intro-subtitle text-white">You're Looking Good</h3>
              <h1 className="intro-title text-white">New Lookbook</h1>

              <a href="/products" className="btn btn-outline-white-4">
                <span>Discover More</span>
              </a>
          </div>*/}
          <img
            src="assets/images/banners/home/banner-dongho.png"
            alt="banner 1"
          />
          <img
            src="assets/images/banners/home/banner-dongho3.png"
            alt="banner 3"
          />
        </Carousel>
      </div>

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

          <ul className="nav nav-pills justify-content-center" role="tablist">
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
                                        "items":2
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
                        <span style={{ textTransform: "uppercase" }}>T</span>hêm
                        vào giỏ hàng
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
              {/* End .product */}
            </div>
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
                        <span style={{ textTransform: "uppercase" }}>T</span>hêm
                        vào giỏ hàng
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
                        <span style={{ textTransform: "uppercase" }}>T</span>hêm
                        vào giỏ hàng
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
                  <h3 className="icon-box-title">Thanh toán & Vận chuyển</h3>
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
                  <div className="col-6 col-md-4 col-lg-3" key={product._id}>
                    <div className="product product-7 text-center">
                      <figure className="product-media">
                        <span className="product-label label-sale">sale</span>
                        <Link to={`/product/${product._id}`}>
                          <img
                            src={product.images[0].url}
                            alt={product.name}
                            className="product-image"
                          />
                          <img
                            src="assets/images/demos/demo-6/products/product-1-2.jpg"
                            alt="Product"
                            className="product-image-hover"
                          />
                        </Link>

                        <div className="product-action-vertical">
                          <a
                            href="#"
                            className="btn-product-icon btn-wishlist btn-expandable"
                          >
                            <span>Thêm vào danh sách yêu thích</span>
                          </a>
                        </div>

                        <div className="product-action">
                          <a href="#" className="btn-product btn-cart">
                            <span>
                              <span style={{ textTransform: "uppercase" }}>
                                T
                              </span>
                              hêm vào giỏ hàng
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
                          {formatPrice(product.price)}
                          <span className="new-price">Now $7.99</span>
                          <span className="old-price">Was $12.99</span>
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
              <img src="assets/images/logo/brand-citizen.png" alt="Citizen" />
            </a>

            <a href="#" className="brand">
              <img src="assets/images/logo/brand-1.png" alt="OJ" />
            </a>

            <a href="#" className="brand">
              <img src="assets/images/logo/brand-bulova.png" alt="Bulova" />
            </a>

            <a href="#" className="brand">
              <img src="assets/images/logo/brand-freelook.png" alt="Freelock" />
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
                      <button className="btn btn-outline-dark-2" type="submit">
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

          <div
            className="owl-carousel owl-simple mb-3"
            data-toggle="owl"
            data-owl-options='{
                            "nav": false, 
                            "dots": true,
                            "items": 3,
                            "margin": 20,
                            "loop": false,
                            "responsive": {
                                "0": {
                                    "items":1
                                },
                                "600": {
                                    "items":2
                                },
                                "992": {
                                    "items":3
                                }
                            }
                        }'
          >
            <article className="entry">
              <figure className="entry-media">
                <a href="single.html">
                  <img
                    src="assets/images/demos/demo-6/blog/post-1.jpg"
                    alt="image desc"
                  />
                </a>
              </figure>
              {/* End .entry-media */}

              <div className="entry-body text-center">
                <div className="entry-meta">
                  <a href="#">Nov 22, 2018</a>, 1 Bình luận
                </div>
                {/* End .entry-meta */}

                <h3 className="entry-title">
                  <a href="single.html">Sed adipiscing ornare.</a>
                </h3>
                {/* End .entry-title */}

                <div className="entry-content">
                  <a href="single.html" className="read-more">
                    Đọc thêm
                  </a>
                </div>
                {/* End .entry-content */}
              </div>
              {/* End .entry-body */}
            </article>
            {/* End .entry */}
          </div>
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
          {/* End .title text-center */}
          <div
            className="owl-carousel owl-simple owl-testimonials"
            data-toggle="owl"
            data-owl-options='{
                            "nav": false, 
                            "dots": true,
                            "margin": 20,
                            "loop": false,
                            "responsive": {
                                "1200": {
                                    "nav": true
                                }
                            }
                        }'
          >
            <blockquote className="testimonial testimonial-icon text-center">
              <p className="lead">“Cửa hàng tuyệt vời”</p>
              {/* End .lead */}
              <p>
                “ Tôi thực sự an tâm và tin tưởng vào chất lượng dịch vụ của
                XWatch. Lần đầu tiên thấy chiếc đồng hồ của mình được chăm...
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
                “Điều mà Linh ấn tượng nhất là chế độ bảo hành 5 năm theo tiêu
                chuẩn Thuỵ Sĩ cho cả lỗi người dùng. Điều này không phải...”
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
                “ Tôi ủng hộ những người đặt lợi ích của khách hàng làm mục tiêu
                phấn đấu. Vì vậy, tôi đã ủng hộ và lựa chọn PVH. ”
              </p>

              <cite>
                Xuân Bắc
                <span>Nghệ sỹ</span>
              </cite>
            </blockquote>
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
