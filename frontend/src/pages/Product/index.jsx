import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import "./Product.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../../actions/productAction";
import { Collapse } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import formatPrice from "../../ultils/formatPrice";

function Product() {
  const [close, setClose] = useState(false);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openBrand, setOpenBrand] = React.useState(true);
  const [openPrice, setOpenPrice] = React.useState(true);
  const [openRope, setOpenRope] = React.useState(true);
  const [openGlass, setOpenGlass] = React.useState(true);
  const [openSize, setOpenSize] = React.useState(true);

  const handleClickOpenBrand = () => {
    setOpenBrand(!openBrand);
  };
  const handleClickOpenPrice = () => {
    setOpenPrice(!openPrice);
  };
  const handleClickOpenRope = () => {
    setOpenRope(!openRope);
  };
  const handleClickOpenGlass = () => {
    setOpenGlass(!openGlass);
  };
  const handleClickOpenSize = () => {
    setOpenSize(!openSize);
  };

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  // let match = useParams();

  // console.log(match);

  const data = useSelector((state) => state.products);
  // const keyword = match && match.params.keyword;

  const dispatch = useDispatch();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    dispatch(getProduct(currentPage, category, sort));
  }, [dispatch, currentPage, category, sort]);

  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: "url('assets/images/page-header-bg.jpg')" }}
      >
        <div className="container">
          <h1 className="page-title">Sản phẩm</h1>
        </div>
        {/* End .container */}
      </div>
      {/* End .page-header */}
      <nav aria-label="breadcrumb" className="breadcrumb-nav mb-2">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Trang chủ</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Sản phẩm
            </li>
          </ol>
        </div>
        {/* End .container */}
      </nav>
      {/* End .breadcrumb-nav */}

      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="toolbox">
                <div className="toolbox-left">
                  <div className="toolbox-info">
                    Đang xem{" "}
                    <span>
                      {filteredProductsCount} trong{" "}
                      {products && products.length}
                    </span>{" "}
                    Sản phẩm
                  </div>
                  {/* End .toolbox-info */}
                </div>
                {/* End .toolbox-left */}

                <div className="toolbox-right">
                  <div className="toolbox-sort">
                    <label htmlFor="sortby">Sắp xếp theo:</label>
                    <div className="select-custom">
                      <select
                        name="sortby"
                        id="sortby"
                        className="form-control"
                      >
                        <option defaultValue="popularity">Mới nhất</option>
                        <option value="rating">Cũ nhất</option>
                        <option value="price">Giá: Thấp- Cao</option>
                        <option value="-price">Giá: Cao- Thấp</option>
                      </select>
                    </div>
                  </div>
                  {/* End .toolbox-sort */}
                </div>
                {/* End .toolbox-right */}
              </div>
              {/* End .toolbox */}

              <div className="products mb-3">
                <div className="row justify-content-center">
                  {products &&
                    products.map((product) => (
                      <div
                        className="col-6 col-md-4 col-lg-4"
                        key={product._id}
                      >
                        <div className="product product-7 text-center">
                          <figure className="product-media">
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
                            </Link>

                            <div className="product-action-vertical">
                              <a
                                href="#"
                                className="btn-product-icon btn-wishlist btn-expandable"
                              >
                                <span>Thêm vào danh sách mong muốn</span>
                              </a>
                              <a
                                href="popup/quickView.html"
                                className="btn-product-icon btn-quickview"
                                title="Quick view"
                              >
                                <span>Xem nhanh</span>
                              </a>
                            </div>
                            {/* End .product-action-vertical */}

                            <div className="product-action">
                              <a href="#" className="btn-product btn-cart">
                                <span>
                                  <span
                                    style={{
                                      textTransform: "uppercase",
                                    }}
                                  >
                                    T
                                  </span>
                                  hêm vào giỏ hàng
                                </span>
                              </a>
                            </div>
                            {/* End .product-action */}
                          </figure>
                          {/* End .product-media */}

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
                              <span
                                className="out-price"
                                style={{
                                  color: "#c96",
                                }}
                              >
                                {formatPrice(product.price)}
                              </span>
                            </div>
                            {/* End .product-price */}
                            <div className="ratings-container">
                              {/* <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "80%" }}
                            ></div>
                          </div> */}
                              <Rating
                                size="large"
                                value={product.ratings}
                                readOnly
                              />
                              {/* End .ratings */}
                              <span className="ratings-text">
                                ( {product.numOfReviews} Reviews )
                              </span>
                            </div>
                            {/* End .rating-container */}
                          </div>
                          {/* End .product-body */}
                        </div>
                        {/* End .product */}
                      </div>
                    ))}
                </div>
              </div>
              {/* End .products */}

              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                  <li className="page-item disabled">
                    <a
                      className="page-link page-link-prev"
                      href="#"
                      aria-label="Previous"
                      tabIndex="-1"
                      aria-disabled="true"
                    >
                      <span aria-hidden="true">
                        <i className="icon-long-arrow-left"></i>
                      </span>
                      Prev
                    </a>
                  </li>
                  <li className="page-item active" aria-current="page">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item-total">of 6</li>
                  <li className="page-item">
                    <a
                      className="page-link page-link-next"
                      href="#"
                      aria-label="Next"
                    >
                      Next{" "}
                      <span aria-hidden="true">
                        <i className="icon-long-arrow-right"></i>
                      </span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            {/* End .col-lg-9 */}
            <aside className="col-lg-3 order-lg-first">
              <div className="sidebar sidebar-shop">
                <div className="widget widget-clean">
                  <label>Bộ lọc:</label>
                  <a href="#" className="sidebar-filter-clear">
                    Xóa trường
                  </a>
                </div>
                {/* End .widget widget-clean */}

                <div className="widget widget-collapsible">
                  <h3 className="widget-title">
                    <p
                      role="button"
                      aria-expanded="true"
                      aria-controls="widget-1"
                      onClick={handleClickOpenBrand}
                      style={{
                        cursor: "pointer",
                        fontWeight: "500",
                        fontSize: "1.6rem",
                        color: "black",
                        display: "flex",
                        justifyContent: "space-between",
                        marginRight: "10px",
                      }}
                    >
                      Thương hiệu
                      {openBrand ? (
                        <ExpandLess fontSize="large" />
                      ) : (
                        <ExpandMore fontSize="large" />
                      )}
                    </p>
                  </h3>
                  {/* End .widget-title */}

                  <Collapse
                    className="collapse show"
                    id="widget-1"
                    in={openBrand}
                    timeout="auto"
                    unmountOnExit
                  >
                    <div className="widget-body">
                      <div className="filter-items filter-items-count">
                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="cat-1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="cat-1"
                            >
                              Dresses
                            </label>
                          </div>
                          {/* End .custom-checkbox */}
                          <span className="item-count">3</span>
                        </div>
                        {/* End .filter-item */}

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="cat-2"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="cat-2"
                            >
                              T-shirts
                            </label>
                          </div>
                          {/* End .custom-checkbox */}
                          <span className="item-count">0</span>
                        </div>
                        {/* End .filter-item */}

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="cat-3"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="cat-3"
                            >
                              Bags
                            </label>
                          </div>
                          {/* End .custom-checkbox */}
                          <span className="item-count">4</span>
                        </div>
                        {/* End .filter-item */}

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="cat-4"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="cat-4"
                            >
                              Jackets
                            </label>
                          </div>
                          {/* End .custom-checkbox */}
                          <span className="item-count">2</span>
                        </div>
                        {/* End .filter-item */}

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="cat-8"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="cat-8"
                            >
                              Sportwear
                            </label>
                          </div>
                          {/* End .custom-checkbox */}
                          <span className="item-count">0</span>
                        </div>
                        {/* End .filter-item */}
                      </div>
                      {/* End .filter-items */}
                    </div>
                    {/* End .widget-body */}
                  </Collapse>
                  {/* End .collapse */}
                </div>
                {/* End .widget */}

                <div className="widget widget-collapsible">
                  <h3 className="widget-title">
                    <p
                      role="button"
                      aria-expanded="true"
                      aria-controls="widget-2"
                      onClick={handleClickOpenPrice}
                      style={{
                        cursor: "pointer",
                        fontWeight: "500",
                        fontSize: "1.6rem",
                        color: "black",
                        display: "flex",
                        justifyContent: "space-between",
                        marginRight: "10px",
                      }}
                    >
                      Mức giá
                      {openPrice ? (
                        <ExpandLess fontSize="large" />
                      ) : (
                        <ExpandMore fontSize="large" />
                      )}
                    </p>
                  </h3>
                  {/* End .widget-title */}

                  <Collapse
                    className="collapse show"
                    id="widget-2"
                    in={openPrice}
                    timeout="auto"
                    unmountOnExit
                  >
                    <div className="widget-body">
                      <div className="filter-items">
                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="price-1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="price-1"
                            >
                              Từ 2 triệu - triệu
                            </label>
                          </div>
                          {/* End .custom-checkbox */}
                        </div>
                        {/* End .filter-item */}

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="price-2"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="price-2"
                            >
                              Dưới 2 triệu
                            </label>
                          </div>
                          {/* End .custom-checkbox */}
                        </div>
                        {/* End .filter-item */}

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              checked
                              id="price-3"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="price-3"
                            >
                              Từ 5 triệu - 10 triệu
                            </label>
                          </div>
                          {/* End .custom-checkbox */}
                        </div>
                        {/* End .filter-item */}

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              checked
                              id="price-4"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="price-4"
                            >
                              Từ 10 triệu - 20 triệu
                            </label>
                          </div>
                          {/* End .custom-checkbox */}
                        </div>
                        {/* End .filter-item */}

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="price-5"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="price-5"
                            >
                              Từ 20 triệu - 50 triệu
                            </label>
                          </div>
                          {/* End .custom-checkbox */}
                        </div>
                        {/* End .filter-item */}

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="price-6"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="price-6"
                            >
                              Từ 50 triệu - 100 triệu
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Collapse>
                </div>

                <div className="widget widget-collapsible">
                  <h3 className="widget-title">
                    <p
                      role="button"
                      aria-expanded="true"
                      aria-controls="widget-4"
                      onClick={handleClickOpenRope}
                      style={{
                        cursor: "pointer",
                        fontWeight: "500",
                        fontSize: "1.6rem",
                        color: "black",
                        display: "flex",
                        justifyContent: "space-between",
                        marginRight: "10px",
                      }}
                    >
                      Loại dây
                      {openRope ? (
                        <ExpandLess fontSize="large" />
                      ) : (
                        <ExpandMore fontSize="large" />
                      )}
                    </p>
                  </h3>
                  {/* End .widget-title */}

                  <Collapse
                    className="collapse show"
                    id="widget-4"
                    in={openRope}
                    timeout="auto"
                    unmountOnExit
                  >
                    <div className="widget-body">
                      <div className="filter-items">
                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="brand-1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="brand-1"
                            >
                              Thép không gỉ
                            </label>
                          </div>
                          {/* End .custom-checkbox */}
                        </div>
                        {/* End .filter-item */}

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="brand-2"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="brand-2"
                            >
                              Dây da
                            </label>
                          </div>
                          {/* End .custom-checkbox */}
                        </div>
                        {/* End .filter-item */}

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="brand-3"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="brand-3"
                            >
                              Dây vải
                            </label>
                          </div>
                          {/* End .custom-checkbox */}
                        </div>
                        {/* End .filter-item */}

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="brand-4"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="brand-4"
                            >
                              Dây cao su
                            </label>
                          </div>
                          {/* End .custom-checkbox */}
                        </div>
                        {/* End .filter-item */}
                        {/*  */}
                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="brand-5"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="brand-5"
                            >
                              Dây nhựa
                            </label>
                          </div>
                          {/* End .custom-checkbox */}
                        </div>
                        {/* End .filter-item */}

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="brand-6"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="brand-6"
                            >
                              Titanium
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Collapse>
                </div>

                <div className="widget widget-collapsible">
                  <h3 className="widget-title">
                    <p
                      role="button"
                      onClick={handleClickOpenGlass}
                      style={{
                        cursor: "pointer",
                        fontWeight: "500",
                        fontSize: "1.6rem",
                        color: "black",
                        display: "flex",
                        justifyContent: "space-between",
                        marginRight: "10px",
                      }}
                    >
                      Loại mặt kính
                      {openGlass ? (
                        <ExpandLess fontSize="large" />
                      ) : (
                        <ExpandMore fontSize="large" />
                      )}
                    </p>
                  </h3>
                  {/* End .widget-title */}

                  <Collapse
                    className="collapse show"
                    id="widget-5"
                    in={openGlass}
                    timeout="auto"
                    unmountOnExit
                  >
                    <div className="widget-body">
                      <div className="filter-items">
                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="glass-1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="glass-1"
                            >
                              Kính cứng
                            </label>
                          </div>
                        </div>
                        {/* End .filter-item */}

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="glass-2"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="glass-2"
                            >
                              Kính Sapphire
                            </label>
                          </div>
                        </div>
                        {/* End .filter-item */}

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              checked
                              id="glass-3"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="glass-3"
                            >
                              Kính nhựa
                            </label>
                          </div>
                        </div>
                        {/* End .filter-item */}
                      </div>
                    </div>
                  </Collapse>
                </div>

                <div className="widget widget-collapsible">
                  <h3 className="widget-title">
                    <p
                      role="button"
                      aria-expanded="true"
                      aria-controls="widget-7"
                      onClick={handleClickOpenSize}
                      style={{
                        cursor: "pointer",
                        fontWeight: "500",
                        fontSize: "1.6rem",
                        color: "black",
                        display: "flex",
                        justifyContent: "space-between",
                        marginRight: "10px",
                      }}
                    >
                      Size mặt
                      {openSize ? (
                        <ExpandLess fontSize="large" />
                      ) : (
                        <ExpandMore fontSize="large" />
                      )}
                    </p>
                  </h3>
                  {/* End .widget-title */}

                  {/* Size mặt */}
                  <Collapse
                    className="collapse show"
                    id="widget-7"
                    in={openSize}
                    timeout="auto"
                    unmountOnExit
                  >
                    <div className="widget-body">
                      <div className="filter-items">
                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="dial-1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="dial-1"
                            >
                              {`<`}30 mm
                            </label>
                          </div>
                        </div>
                        {/* End .filter-item */}

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="dial-2"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="dial-2"
                            >
                              Từ 30mm - 34mm
                            </label>
                          </div>
                        </div>
                        {/* End .filter-item */}

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              checked
                              id="dial-3"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="dial-3"
                            >
                              Từ 35mm - 39mm
                            </label>
                          </div>
                        </div>
                        {/* End .filter-item */}

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="dial-4"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="dial-4"
                            >
                              Từ 40mm - 43mm
                            </label>
                          </div>
                        </div>
                        {/* End .filter-item */}

                        <div className="filter-item">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="dial-5"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="dial-5"
                            >
                              Trên 43mm
                            </label>
                          </div>
                        </div>
                        {/* End .filter-item */}
                      </div>
                    </div>
                  </Collapse>
                </div>

                <div className="widget widget-collapsible">
                  <h3 className="widget-title">
                    <a
                      data-toggle="collapse"
                      href="#widget-5"
                      role="button"
                      aria-expanded="true"
                      aria-controls="widget-5"
                    >
                      Giá
                    </a>
                  </h3>
                  {/* End .widget-title */}

                  <div className="collapse show" id="widget-5">
                    <div className="widget-body">
                      <div className="filter-price">
                        <div className="filter-price-text">
                          Khoảng giá:
                          <span id="filter-price-range"></span>
                        </div>
                        {/* End .filter-price-text */}

                        <div id="price-slider"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Product;
