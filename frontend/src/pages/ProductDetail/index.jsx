import { Rating } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import formatPrice from "../../ultils/formatPrice";
import { getProductDetails } from "../../actions/productAction";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { createTheme } from "@mui/material/styles";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const theme = createTheme({
  palette: {
    yellow96: "#c96",
  },
});

function ProductDetail() {
  const dispatch = useDispatch();

  const [valueTab, setValueTab] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  let match = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(getProductDetails(match.id));
  }, [dispatch, match.id]);

  return (
    <main className="main">
      <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
        <div className="container d-flex align-items-center">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Trang chủ</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/products">Sản phẩm</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Chi tiết sản phẩm
            </li>
          </ol>
        </div>
        {/* End .container */}
      </nav>
      {/* End .breadcrumb-nav */}

      <div className="page-content">
        <div className="container">
          <div className="product-details-top">
            <div className="row">
              <div className="col-md-6">
                <div className="product-gallery product-gallery-vertical">
                  <div className="row">
                    <figure className="product-main-image">
                      <Zoom>
                        <img
                          id="product-zoom"
                          src={product.images && product.images[0].url}
                          alt={product && product.name}
                        />
                      </Zoom>
                    </figure>
                    {/* End .product-main-image */}

                    <div
                      id="product-zoom-gallery"
                      className="product-image-gallery"
                    >
                      <a
                        style={{
                          height: "fitContent",
                        }}
                        className="product-gallery-item active"
                        href="#"
                        // data-image="assets/images/products/single/1.jpg"
                        data-image={product.images && product.images[0].url}
                        data-zoom-image={
                          product.images && product.images[0].url
                        }
                      >
                        <img
                          src={product.images && product.images[0].url}
                          alt="product img1"
                        />
                      </a>

                      <a
                        className="product-gallery-item"
                        href="#"
                        data-image="assets/images/products/single/2.jpg"
                        data-zoom-image="assets/images/products/single/2-big.jpg"
                      >
                        <img
                          src="assets/images/products/single/2-small.jpg"
                          alt="product cross"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="product-details">
                  <h1 className="product-title">{product && product.name}</h1>
                  {/* End .product-title */}

                  <div className="ratings-container">
                    <Rating
                      defaultValue={5}
                      size="large"
                      value={product && product.ratings}
                      readOnly
                    />
                    <a
                      className="ratings-text"
                      href="#product-review-link"
                      id="review-link"
                    >
                      ( {product && product.numOfReviews} Reviews )
                    </a>
                  </div>
                  {/* End .rating-container */}

                  <div className="product-price">
                    {product.price && formatPrice(product.price)}
                  </div>
                  {/* End .product-price */}

                  <div className="product-content">
                    <p>{product.description} </p>
                  </div>
                  {/* End .product-content */}

                  <div className="details-filter-row details-row-size">
                    <label htmlFor="size">Size:</label>
                    <div className="select-custom">
                      <select name="size" id="size" className="form-control">
                        <option defaultValue="#">Select a size</option>
                        <option value="s">Small</option>
                        <option value="m">Medium</option>
                        <option value="l">Large</option>
                        <option value="xl">Extra Large</option>
                      </select>
                    </div>
                    {/* End .select-custom */}

                    <a href="#" className="size-guide">
                      <i className="icon-th-list"></i>size guide
                    </a>
                  </div>
                  {/* End .details-filter-row */}

                  <div
                    style={{
                      marginTop: "1rem",
                      display: "flex",
                    }}
                    className="details-filter-row details-row-size"
                  >
                    <label htmlFor="qty">Số lượng:</label>
                    <div
                      style={{
                        border: "1px solid #d7d7d7",
                        borderRadius: "3px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "40px",
                        lineHeight: "30px",
                        padding: "0 0.5rem",
                        cursor: "pointer",
                        width: "130px",
                        zIndex: "9999",
                      }}
                    >
                      {/* <span onClick={handleDecrement}>-</span> */}
                      <p style={{ margin: "0 auto" }}>-</p>
                      <input
                        style={{
                          width: "30px",
                          // borderLeft: "none",
                          // borderRight: "none",
                          // borderTop: "1px solid #d7d7d7",
                          // borderBottom: "1px solid #d7d7d7",
                          border: "none",
                          textAlign: "center",
                          height: "40px",
                          lineHeight: "30px",
                          outline: "none",
                        }}
                        type="text"
                        value={1}
                        readOnly
                      />
                      <p style={{ margin: "0 auto" }}>+</p>
                      {/* <span onClick={handleIncrement}>+</span> */}
                    </div>
                  </div>
                  {/* End .details-filter-row */}

                  <div className="product-details-action">
                    <a href="#" className="btn-product btn-cart">
                      <span>Thêm vào giỏ hàng</span>
                    </a>

                    <div className="details-action-wrapper">
                      <a
                        href="#"
                        className="btn-product btn-wishlist"
                        title="Wishlist"
                      >
                        <span>Thêm vào danh sách mong muốn</span>
                      </a>
                    </div>
                    {/* End .details-action-wrapper */}
                  </div>
                  {/* End .product-details-action */}

                  <div className="product-details-footer">
                    <div className="product-cat">
                      <span>Danh mục:</span>
                      <a href="#">Women</a>,
                      <a href="#">
                        {product && product.category && product.category.name}
                      </a>
                    </div>
                    {/* End .product-cat */}

                    <div className="social-icons social-icons-sm">
                      <span className="social-label">Share:</span>
                      <a
                        href="#"
                        className="social-icon"
                        title="Facebook"
                        target="_blank"
                      >
                        <i className="icon-facebook-f"></i>
                      </a>
                      <a
                        href="#"
                        className="social-icon"
                        title="Twitter"
                        target="_blank"
                      >
                        <i className="icon-twitter"></i>
                      </a>
                      <a
                        href="#"
                        className="social-icon"
                        title="Instagram"
                        target="_blank"
                      >
                        <i className="icon-instagram"></i>
                      </a>
                      <a
                        href="#"
                        className="social-icon"
                        title="Pinterest"
                        target="_blank"
                      >
                        <i className="icon-pinterest"></i>
                      </a>
                    </div>
                  </div>
                  {/* End .product-details-footer */}
                </div>
                {/* End .product-details */}
              </div>
              {/* End .col-md-6 */}
            </div>
            {/* End .row */}
          </div>
          {/* End .product-details-top */}

          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={valueTab.toString()}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  centered
                >
                  <Tab
                    label="Giới thiệu"
                    value="1"
                    sx={{
                      fontSize: "1.2rem",
                    }}
                  />
                  <Tab
                    label="Thông tin thêm"
                    value="2"
                    sx={{
                      fontSize: "1.2rem",
                    }}
                  />
                  <Tab
                    label={`Đánh giá (${product && product.numOfReviews})`}
                    value="3"
                    sx={{
                      fontSize: "1.2rem",
                    }}
                  />
                </TabList>
              </Box>
              <TabPanel
                value="1"
                className="product-desc-content"
                sx={{
                  fontSize: "1.5rem",
                  lineHeight: "1.7",
                }}
              >
                <h3 style={{ fontWeight: "bold" }}>Thông tin sản phẩm</h3>
                <p>{product && product.description}</p>
              </TabPanel>
              <TabPanel
                value="2"
                className="product-desc-content"
                sx={{
                  fontSize: "1.5rem",
                  lineHeight: "1.7",
                }}
              >
                <h3 style={{ fontWeight: "bold" }}>Thông số thêm về máy</h3>
                <ul>
                  <li>
                    Nhãn hiệu: {product.category && product.category.name}
                  </li>
                  <li>Kích cỡ: {product && product.dialSize}</li>
                  <li>Chất liệu dây: {product && product.ropeMaterial}</li>
                  <li>
                    Chất liệu mặt kính: {product && product.glassMaterial}
                  </li>
                  <li>Bảo hiểm: 5 năm cả lỗi người dùng tịa PVH</li>
                  <li>Bảo hành quốc tế: 1 năm</li>
                  <li>Giới tính: {product && product.sex}</li>
                </ul>
              </TabPanel>
              <TabPanel
                value="3"
                className="product-desc-content"
                sx={{
                  fontSize: "1.5rem",
                  lineHeight: "1.7",
                }}
              >
                <h3 style={{ fontWeight: "bold" }}>
                  Đánh giá ({product && product.numOfReviews})
                </h3>
                <div className="review">
                  <div className="row no-gutters">
                    <div className="col-auto">
                      <h4>
                        <a href="#">Saitama J.</a>
                      </h4>
                      {/* <div className="ratings-container">
                        <div className="ratings">
                          <div
                            className="ratings-val"
                            style={{ width: "80%" }}
                          ></div>
                      
                        </div>
                      </div> */}
                      {/* End .rating-container */}
                      <span className="review-date">6 days ago</span>
                    </div>
                    {/* End .col */}
                    <div className="col">
                      <h4>Good, perfect size</h4>

                      <div className="review-content">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Ducimus cum dolores assumenda asperiores facilis
                          porro reprehenderit animi culpa atque blanditiis
                          commodi perspiciatis doloremque, possimus, explicabo,
                          autem fugit beatae quae voluptas!
                        </p>
                      </div>
                      {/* End .review-content */}

                      <div className="review-action">
                        <a href="#">
                          <i className="icon-thumbs-up"></i>Helpful (2)
                        </a>
                        <a href="#">
                          <i className="icon-thumbs-down"></i>Unhelpful (0)
                        </a>
                      </div>
                      {/* End .review-action */}
                    </div>
                    {/* End .col-auto */}
                  </div>
                  {/* End .row */}
                </div>
              </TabPanel>
            </TabContext>
          </Box>

          <h2 className="title text-center mb-4">Sản phẩm liên quan</h2>
          {/* End .title text-center */}

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
                          "items":1
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
                <span className="product-label label-new">New</span>
                <a href="product.html">
                  <img
                    src="assets/images/products/product-4.jpg"
                    alt="Product image"
                    className="product-image"
                  />
                </a>

                <div className="product-action-vertical">
                  <a
                    href="#"
                    className="btn-product-icon btn-wishlist btn-expandable"
                  >
                    <span>add to wishlist</span>
                  </a>
                  <a
                    href="popup/quickView.html"
                    className="btn-product-icon btn-quickview"
                    title="Quick view"
                  >
                    <span>Quick view</span>
                  </a>
                  <a
                    href="#"
                    className="btn-product-icon btn-compare"
                    title="Compare"
                  >
                    <span>Compare</span>
                  </a>
                </div>
                {/* End .product-action-vertical */}

                <div className="product-action">
                  <a href="#" className="btn-product btn-cart">
                    <span>add to cart</span>
                  </a>
                </div>
                {/* End .product-action */}
              </figure>
              {/* End .product-media */}
              {/*  */}
              <div className="product-body">
                <div className="product-cat">
                  <a href="#">Women</a>
                </div>
                {/* End .product-cat */}
                <h3 className="product-title">
                  <a href="product.html">
                    Brown paperbag waist <br />
                    pencil skirt
                  </a>
                </h3>
                {/* End .product-title */}
                <div className="product-price">$60.00</div>
                {/* End .product-price */}
                <div className="ratings-container">
                  <div className="ratings">
                    <div className="ratings-val" style={{ width: "20%" }}></div>
                    {/* End .ratings-val */}
                  </div>
                  {/* End .ratings */}
                  <span className="ratings-text">( 2 Reviews )</span>
                </div>
                {/* End .rating-container */}

                <div className="product-nav product-nav-thumbs">
                  <a href="#" className="active">
                    <img
                      src="assets/images/products/product-4-thumb.jpg"
                      alt="product desc"
                    />
                  </a>
                  <a href="#">
                    <img
                      src="assets/images/products/product-4-2-thumb.jpg"
                      alt="product desc"
                    />
                  </a>

                  <a href="#">
                    <img
                      src="assets/images/products/product-4-3-thumb.jpg"
                      alt="product desc"
                    />
                  </a>
                </div>
                {/* End .product-nav */}
              </div>
              {/* End .product-body */}
            </div>
            {/* End .product */}

            <div className="product product-7 text-center">
              <figure className="product-media">
                <span className="product-label label-out">Out of Stock</span>
                <a href="product.html">
                  <img
                    src="assets/images/products/product-6.jpg"
                    alt="Product image"
                    className="product-image"
                  />
                </a>

                <div className="product-action-vertical">
                  <a
                    href="#"
                    className="btn-product-icon btn-wishlist btn-expandable"
                  >
                    <span>add to wishlist</span>
                  </a>
                  <a
                    href="popup/quickView.html"
                    className="btn-product-icon btn-quickview"
                    title="Quick view"
                  >
                    <span>Quick view</span>
                  </a>
                  <a
                    href="#"
                    className="btn-product-icon btn-compare"
                    title="Compare"
                  >
                    <span>Compare</span>
                  </a>
                </div>
                {/* End .product-action-vertical */}

                <div className="product-action">
                  <a href="#" className="btn-product btn-cart">
                    <span>add to cart</span>
                  </a>
                </div>
                {/* End .product-action */}
              </figure>
              {/* End .product-media */}

              <div className="product-body">
                <div className="product-cat">
                  <a href="#">Jackets</a>
                </div>
                {/* End .product-cat */}
                <h3 className="product-title">
                  <a href="product.html">Khaki utility boiler jumpsuit</a>
                </h3>
                {/* End .product-title */}
                <div className="product-price">
                  <span className="out-price">$120.00</span>
                </div>
                {/* End .product-price */}
                <div className="ratings-container">
                  <div className="ratings">
                    <div className="ratings-val" style={{ width: "80%" }}></div>
                    {/* End .ratings-val */}
                  </div>
                  {/* End .ratings */}
                  <span className="ratings-text">( 6 Reviews )</span>
                </div>
                {/* End .rating-container */}
              </div>
              {/* End .product-body */}
            </div>
            {/* End .product */}

            <div className="product product-7 text-center">
              <figure className="product-media">
                <span className="product-label label-top">Top</span>
                <a href="product.html">
                  <img
                    src="assets/images/products/product-11.jpg"
                    alt="Product image"
                    className="product-image"
                  />
                </a>

                <div className="product-action-vertical">
                  <a
                    href="#"
                    className="btn-product-icon btn-wishlist btn-expandable"
                  >
                    <span>add to wishlist</span>
                  </a>
                  <a
                    href="popup/quickView.html"
                    className="btn-product-icon btn-quickview"
                    title="Quick view"
                  >
                    <span>Quick view</span>
                  </a>
                  <a
                    href="#"
                    className="btn-product-icon btn-compare"
                    title="Compare"
                  >
                    <span>Compare</span>
                  </a>
                </div>
                {/* End .product-action-vertical */}

                <div className="product-action">
                  <a href="#" className="btn-product btn-cart">
                    <span>add to cart</span>
                  </a>
                </div>
                {/* End .product-action */}
              </figure>
              {/* End .product-media */}

              <div className="product-body">
                <div className="product-cat">
                  <a href="#">Shoes</a>
                </div>
                {/* End .product-cat */}
                <h3 className="product-title">
                  <a href="product.html">Light brown studded Wide fit wedges</a>
                </h3>
                {/* End .product-title */}
                <div className="product-price">$110.00</div>
                {/* End .product-price */}
                <div className="ratings-container">
                  <div className="ratings">
                    <div className="ratings-val" style={{ width: "80%" }}></div>
                    {/* End .ratings-val */}
                  </div>
                  {/* End .ratings */}
                  <span className="ratings-text">( 1 Reviews )</span>
                </div>
                {/* End .rating-container */}

                <div className="product-nav product-nav-thumbs">
                  <a href="#" className="active">
                    <img
                      src="assets/images/products/product-11-thumb.jpg"
                      alt="product desc"
                    />
                  </a>
                  <a href="#">
                    <img
                      src="assets/images/products/product-11-2-thumb.jpg"
                      alt="product desc"
                    />
                  </a>

                  <a href="#">
                    <img
                      src="assets/images/products/product-11-3-thumb.jpg"
                      alt="product desc"
                    />
                  </a>
                </div>
                {/* End .product-nav */}
              </div>
              {/* End .product-body */}
            </div>
            {/* End .product */}

            <div className="product product-7 text-center">
              <figure className="product-media">
                <a href="product.html">
                  <img
                    src="assets/images/products/product-10.jpg"
                    alt="Product image"
                    className="product-image"
                  />
                </a>

                <div className="product-action-vertical">
                  <a
                    href="#"
                    className="btn-product-icon btn-wishlist btn-expandable"
                  >
                    <span>add to wishlist</span>
                  </a>
                  <a
                    href="popup/quickView.html"
                    className="btn-product-icon btn-quickview"
                    title="Quick view"
                  >
                    <span>Quick view</span>
                  </a>
                  <a
                    href="#"
                    className="btn-product-icon btn-compare"
                    title="Compare"
                  >
                    <span>Compare</span>
                  </a>
                </div>
                {/* End .product-action-vertical */}

                <div className="product-action">
                  <a href="#" className="btn-product btn-cart">
                    <span>add to cart</span>
                  </a>
                </div>
                {/* End .product-action */}
              </figure>
              {/* End .product-media */}

              <div className="product-body">
                <div className="product-cat">
                  <a href="#">Jumpers</a>
                </div>
                {/* End .product-cat */}
                <h3 className="product-title">
                  <a href="product.html">Yellow button front tea top</a>
                </h3>
                {/* End .product-title */}
                <div className="product-price">$56.00</div>
                {/* End .product-price */}
                <div className="ratings-container">
                  <div className="ratings">
                    <div className="ratings-val" style={{ width: "0%" }}></div>
                    {/* End .ratings-val */}
                  </div>
                  {/* End .ratings */}
                  <span className="ratings-text">( 0 Reviews )</span>
                </div>
                {/* End .rating-container */}
              </div>
              {/* End .product-body */}
            </div>
            {/* End .product */}

            <div className="product product-7 text-center">
              <figure className="product-media">
                <a href="product.html">
                  <img
                    src="assets/images/products/product-7.jpg"
                    alt="Product image"
                    className="product-image"
                  />
                </a>

                <div className="product-action-vertical">
                  <a
                    href="#"
                    className="btn-product-icon btn-wishlist btn-expandable"
                  >
                    <span>add to wishlist</span>
                  </a>
                  <a
                    href="popup/quickView.html"
                    className="btn-product-icon btn-quickview"
                    title="Quick view"
                  >
                    <span>Quick view</span>
                  </a>
                  <a
                    href="#"
                    className="btn-product-icon btn-compare"
                    title="Compare"
                  >
                    <span>Compare</span>
                  </a>
                </div>
                {/* End .product-action-vertical */}

                <div className="product-action">
                  <a href="#" className="btn-product btn-cart">
                    <span>add to cart</span>
                  </a>
                </div>
                {/* End .product-action */}
              </figure>
              {/* End .product-media */}

              <div className="product-body">
                <div className="product-cat">
                  <a href="#">Jeans</a>
                </div>
                {/* End .product-cat */}
                <h3 className="product-title">
                  <a href="product.html">Blue utility pinafore denim dress</a>
                </h3>
                {/* End .product-title */}
                <div className="product-price">$76.00</div>
                {/* End .product-price */}
                <div className="ratings-container">
                  <div className="ratings">
                    <div className="ratings-val" style={{ width: "20%" }}></div>
                    {/* End .ratings-val */}
                  </div>
                  {/* End .ratings */}
                  <span className="ratings-text">( 2 Reviews )</span>
                </div>
                {/* End .rating-container */}
              </div>
              {/* End .product-body */}
            </div>
            {/* End .product */}
          </div>
          {/* End .owl-carousel */}
        </div>
        {/* End .container */}
      </div>
      {/* End .page-content */}
    </main>
  );
}

export default ProductDetail;
