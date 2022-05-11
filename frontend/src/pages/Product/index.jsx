import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearErrors, getProduct } from "../../actions/productAction";
import { Collapse } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import formatPrice from "../../ultils/formatPrice";
import { getAllCategories } from "../../actions/categoryAction";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import "./Product.scss";
import MetaData from "../../components/Layout/MetaData";
import Loader from "../../components/Common/Loader";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Product() {
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
  const [close, setClose] = useState(false);
  const [category, setCategory] = useState("");
  const [ropeMaterial, setRopeMaterial] = useState("");
  const [glassMaterial, setGlassMaterial] = useState("");
  const [dialSize, setDialSize] = useState([0, 43]);
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openBrand, setOpenBrand] = React.useState(true);
  const [openPrice, setOpenPrice] = React.useState(true);
  const [openRope, setOpenRope] = React.useState(true);
  const [openGlass, setOpenGlass] = React.useState(true);
  const [openSize, setOpenSize] = React.useState(true);
  const [price, setPrice] = useState([0, 40]);

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

  const { categories } = useSelector((state) => state.categories);

  let match = useParams();

  const data = useSelector((state) => state.products);
  const keyword = match && match.keyword;

  const dispatch = useDispatch();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      setOpenError(true);
      setErrorAlert(error);
      dispatch(clearErrors());
    }
    dispatch(getAllCategories());
    dispatch(
      getProduct(
        currentPage,
        category,
        price,
        sort,
        keyword,
        ropeMaterial,
        glassMaterial,
        dialSize
      )
    );
  }, [
    dispatch,
    error,
    currentPage,
    category,
    price,
    sort,
    keyword,
    ropeMaterial,
    glassMaterial,
    dialSize,
  ]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="main">
          <MetaData title="Tất cả sản phẩm" />;
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
          <div
            className="page-header text-center"
            style={{
              backgroundImage: "url('assets/images/page-header-bg.jpg')",
            }}
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
                      {/* <div className="toolbox-info">
                    Đang xem{" "}
                    <span>
                      {resultPerPage} trong {productsCount}
                    </span>{" "}
                    Sản phẩm
                  </div> */}
                    </div>

                    <div className="toolbox-right">
                      <div className="toolbox-sort">
                        <label htmlFor="sortby">Sắp xếp theo:</label>
                        <div className="select-custom">
                          <select
                            name="sortby"
                            id="sortby"
                            className="form-control"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                          >
                            <option value="">Mới nhất</option>
                            <option value="sort=oldest">Cũ nhất</option>
                            <option value="sort=price">Giá: Thấp- Cao</option>
                            <option value="sort=-price">Giá: Cao- Thấp</option>
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
                      {products ? (
                        products.map((product) => (
                          <div
                            className="col-6 col-md-4 col-lg-4"
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
                                {product.Stock <= 0 ? (
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
                                </div>
                                {/* End .product-action-vertical */}

                                <div className="product-action">
                                  <a href="#" className="btn-product btn-cart">
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
                                    <span
                                      className="out-price"
                                      style={{
                                        color: "#c96",
                                      }}
                                    >
                                      {formatPrice(product.price)}
                                    </span>
                                  )}
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
                        ))
                      ) : (
                        <p>Không có sản phẩm nào</p>
                      )}
                    </div>
                  </div>
                  {/* End .products */}

                  {resultPerPage < filteredProductsCount && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={productsCount}
                        onChange={setCurrentPageNo}
                        nextPageText="Trang sau"
                        prevPageText="Trang trước"
                        firstPageText="Trang đầu"
                        lastPageText="Trang cuối"
                        itemClass="page-item"
                        linkClass="page-link"
                      />
                    </div>
                  )}
                </div>
                {/* End .col-lg-9 */}
                <aside className="col-lg-3 order-lg-first">
                  <div className="sidebar sidebar-shop">
                    <div className="widget widget-clean">
                      <label>Bộ lọc:</label>
                      {/* <a href="#" className="sidebar-filter-clear">
                        Xóa trường
                      </a> */}
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
                          <div className="filter-items">
                            {categories &&
                              categories.map((cat) => {
                                return (
                                  <div className="filter-item" key={cat._id}>
                                    <div className="custom-control custom-checkbox">
                                      <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id={`${cat._id}`}
                                        onClick={(e) => {
                                          if (e.target.checked) {
                                            setCategory(cat._id);
                                            setPrice([0, 40]);
                                            setRopeMaterial("");
                                            setGlassMaterial("");
                                            setDialSize([0, 43]);
                                          } else {
                                            setCategory("");
                                          }
                                        }}
                                        checked={
                                          category === cat._id ? true : false
                                        }
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor={`${cat._id}`}
                                      >
                                        {cat.name}
                                      </label>
                                    </div>
                                    {/* End .custom-checkbox */}
                                    {/* <span className="item-count">3</span> */}
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </Collapse>
                    </div>

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
                                  id="price-2"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setPrice([0, 2]);
                                      setCategory("");
                                      setRopeMaterial("");
                                      setGlassMaterial("");
                                      setDialSize([0, 43]);
                                    } else {
                                      setPrice([0, 40]);
                                    }
                                  }}
                                  checked={price[0] === 0 && price[1] === 2}
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
                                  id="price-3"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setPrice([5, 10]);
                                      setCategory("");
                                      setRopeMaterial("");
                                      setGlassMaterial("");
                                      setDialSize([0, 43]);
                                    } else {
                                      setPrice([0, 40]);
                                    }
                                  }}
                                  checked={price[0] === 5 && price[1] === 10}
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
                                  id="price-4"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setPrice([10, 20]);
                                      setCategory("");
                                      setRopeMaterial("");
                                      setGlassMaterial("");
                                      setDialSize([0, 43]);
                                    } else {
                                      setPrice([0, 40]);
                                    }
                                  }}
                                  checked={price[0] === 10 && price[1] === 20}
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
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setPrice([20, 40]);
                                      setCategory("");
                                      setRopeMaterial("");
                                      setGlassMaterial("");
                                      setDialSize([0, 43]);
                                    } else {
                                      setPrice([0, 40]);
                                    }
                                  }}
                                  checked={price[0] === 20 && price[1] === 40}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="price-5"
                                >
                                  Từ 20 triệu - 40 triệu
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
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setPrice([40, 100]);
                                      setCategory("");
                                      setRopeMaterial("");
                                      setGlassMaterial("");
                                      setDialSize([0, 43]);
                                    } else {
                                      setPrice([0, 40]);
                                    }
                                  }}
                                  checked={price[0] === 40 && price[1] === 100}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="price-6"
                                >
                                  Trên 40 triệu
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
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setRopeMaterial("Thép không gỉ");
                                      setPrice([0, 40]);
                                      setCategory("");
                                      setGlassMaterial("");
                                      setDialSize([0, 43]);
                                    } else {
                                      setRopeMaterial("");
                                    }
                                  }}
                                  checked={ropeMaterial === "Thép không gỉ"}
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
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setRopeMaterial("Dây da");
                                      setPrice([0, 40]);
                                      setCategory("");
                                      setGlassMaterial("");
                                      setDialSize([0, 43]);
                                    } else {
                                      setRopeMaterial("");
                                    }
                                  }}
                                  checked={ropeMaterial === "Dây da"}
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
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setRopeMaterial("Dây vải");
                                      setPrice([0, 40]);
                                      setCategory("");
                                      setGlassMaterial("");
                                      setDialSize([0, 43]);
                                    } else {
                                      setRopeMaterial("");
                                    }
                                  }}
                                  checked={ropeMaterial === "Dây vải"}
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
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setRopeMaterial("Dây cao su");
                                      setPrice([0, 40]);
                                      setCategory("");
                                      setGlassMaterial("");
                                      setDialSize([0, 43]);
                                    } else {
                                      setRopeMaterial("");
                                    }
                                  }}
                                  checked={ropeMaterial === "Dây cao su"}
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
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setRopeMaterial("Dây nhựa");
                                      setPrice([0, 40]);
                                      setCategory("");
                                      setGlassMaterial("");
                                      setDialSize([0, 43]);
                                    } else {
                                      setRopeMaterial("");
                                    }
                                  }}
                                  checked={ropeMaterial === "Dây nhựa"}
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
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setRopeMaterial("Titanium");
                                      setPrice([0, 40]);
                                      setCategory("");
                                      setGlassMaterial("");
                                      setDialSize([0, 43]);
                                    } else {
                                      setRopeMaterial("");
                                    }
                                  }}
                                  checked={ropeMaterial === "Titanium"}
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
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setGlassMaterial("Kính cứng");
                                      setPrice([0, 40]);
                                      setCategory("");
                                      setRopeMaterial("");
                                      setDialSize([0, 43]);
                                    } else {
                                      setGlassMaterial("");
                                    }
                                  }}
                                  checked={glassMaterial === "Kính cứng"}
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
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setGlassMaterial("Kính Sapphire");
                                      setPrice([0, 40]);
                                      setCategory("");
                                      setRopeMaterial("");
                                      setDialSize([0, 43]);
                                    } else {
                                      setGlassMaterial("");
                                    }
                                  }}
                                  checked={glassMaterial === "Kính Sapphire"}
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
                                  id="glass-3"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setGlassMaterial("Kính nhựa");
                                      setPrice([0, 40]);
                                      setCategory("");
                                      setRopeMaterial("");
                                      setDialSize([0, 43]);
                                    } else {
                                      setGlassMaterial("");
                                    }
                                  }}
                                  checked={glassMaterial === "Kính nhựa"}
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
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setDialSize([0, 30]);
                                      setPrice([0, 40]);
                                      setCategory("");
                                      setRopeMaterial("");
                                      setGlassMaterial("");
                                    } else {
                                      setDialSize([0, 43]);
                                    }
                                  }}
                                  checked={
                                    dialSize[0] === 0 && dialSize[1] === 30
                                  }
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
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setDialSize([30, 34]);
                                      setPrice([0, 40]);
                                      setCategory("");
                                      setRopeMaterial("");
                                      setGlassMaterial("");
                                    } else {
                                      setDialSize([0, 43]);
                                    }
                                  }}
                                  checked={
                                    dialSize[0] === 30 && dialSize[1] === 34
                                  }
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
                                  id="dial-3"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setDialSize([34, 39]);
                                      setPrice([0, 40]);
                                      setCategory("");
                                      setRopeMaterial("");
                                      setGlassMaterial("");
                                    } else {
                                      setDialSize([0, 43]);
                                    }
                                  }}
                                  checked={
                                    dialSize[0] === 34 && dialSize[1] === 39
                                  }
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
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setDialSize([40, 43]);
                                      setPrice([0, 40]);
                                      setCategory("");
                                      setRopeMaterial("");
                                      setGlassMaterial("");
                                    } else {
                                      setDialSize([0, 43]);
                                    }
                                  }}
                                  checked={
                                    dialSize[0] === 40 && dialSize[1] === 43
                                  }
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
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setDialSize([43, 100]);
                                      setPrice([0, 40]);
                                      setCategory("");
                                      setRopeMaterial("");
                                      setGlassMaterial("");
                                    } else {
                                      setDialSize([0, 43]);
                                    }
                                  }}
                                  checked={
                                    dialSize[0] === 43 && dialSize[1] === 100
                                  }
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
                              Khoảng giá: (triệu)
                              <Slider
                                value={price}
                                onChange={priceHandler}
                                aria-labelledby="range-slider"
                                min={0}
                                max={40}
                                valueLabelDisplay="on"
                                sx={{ mt: 3 }}
                              />
                            </div>
                            {/* End .filter-price-text */}
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
      )}
    </>
  );
}

export default Product;
