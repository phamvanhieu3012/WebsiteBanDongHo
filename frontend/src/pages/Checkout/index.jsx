import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { clearErrors, createOrder } from "../../actions/orderAction.js";
import Loader from "../../components/Common/Loader/index.jsx";
import formatPrice from "../../ultils/formatPrice.js";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import "./Checkout.scss";
import { updateShippingInfo } from "../../actions/userAction.js";
import { UPDATE_SHIP_RESET } from "../../constants/userConstants.js";
import { getCart } from "../../actions/cartAction.js";

const useStyles = makeStyles({
  root: {},
  accordionContainer: {
    background: "#f9f9f9 !important",
    border: "none !important",
    boxShadow: "none !important",
    padding: "0 !important",
  },
  radioButton: {},
});

function Checkout() {
  const classes = useStyles();
  const { cart, loading: cartLoading } = useSelector((state) => state.cart);
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const { error, isSubmit } = useSelector((state) => state.newOrder);
  const {
    error: errorProfile,
    isUpdated,
    loading: profileLoading,
  } = useSelector((state) => state.profile);

  console.log(user);

  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [comments, setComments] = useState("");

  const [payment, setPayment] = useState("Chuyển khoản ngân hàng");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    if (user && user.shippingInfo) {
      setCity(user.shippingInfo.city);
      setState(user.shippingInfo.state);
      setCountry(user.shippingInfo.country);
      setAddress(user.shippingInfo.address);
      setPhoneNo(user.shippingInfo.phoneNo);
    }
  }, [user]);

  const handleChangePayment = (event) => {
    setPayment(event.target.value);
  };

  const checkoutSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 7 || phoneNo.length > 11) {
      alert("Số điện thoại cần từ 8 -> 10 số");
      return;
    }

    const shippingInfo = {
      city: city,
      state: state,
      country: country,
      address: address,
      phoneNo: phoneNo,
    };

    const cartItems = cart.cartItems.map((item) => {
      return {
        ...item,
        product: item.product._id,
      };
    });

    const order = {
      name: user.name,
      email: user.email,
      shippingInfo: shippingInfo,
      orderItems: cartItems,
      user: user && user._id,
      itemsPrice: cart && cart.totalPrice,
      shippingPrice: 0,
      totalPrice: cart && cart.totalPrice,
      paymentInfo: {
        id: "abc",
        type: payment,
        status: "Chưa thanh toán",
      },
      orderComments: comments,
    };

    console.log(order);

    sessionStorage.setItem("order", JSON.stringify(order));
    sessionStorage.setItem(
      "paidAt",
      JSON.stringify(new Date().toLocaleDateString("en-GB"))
    );
    // //Lưu thông tin ship vào user nếu đã đăng nhập
    // // Chưa đăng nhập thì lưu vào localStorage
    // dispatch(
    //   saveShippingInfo({
    //     address,
    //     selectedCity,
    //     selectedDistrict,
    //     selectedWard,
    //     phoneNo,
    //   })
    // );
    dispatch(updateShippingInfo(shippingInfo));
    dispatch(createOrder(order));
  };

  useEffect(() => {
    if (errorProfile) {
      alert(errorProfile);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      dispatch({ type: UPDATE_SHIP_RESET });
    }
  }, [dispatch, errorProfile, isUpdated]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (isSubmit) {
      alert("Tạo đơn hàng thành công");
      history.push("/");
    }
  }, [dispatch, error, history, isSubmit]);

  console.log(payment);

  return (
    <>
      {loading && cartLoading ? (
        <Loader />
      ) : (
        <main className="main">
          <div
            className="page-header text-center"
            style={{
              backgroundImage: "url('assets/images/page-header-bg.jpg')",
            }}
          >
            <div className="container">
              <h1 className="page-title">Thanh toán</h1>
            </div>
          </div>
          <nav aria-label="breadcrumb" className="breadcrumb-nav">
            <div className="container">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Trang chủ</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Thanh toán
                </li>
              </ol>
            </div>
          </nav>

          <div className="page-content">
            <div className="checkout">
              <div className="container">
                <form encType="multipart/form-data" onSubmit={checkoutSubmit}>
                  <div className="row">
                    <div className="col-lg-9">
                      <h2 className="checkout-title">Thông tin thanh toán</h2>

                      <label>Họ và tên *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />

                      <label>Địa chỉ email *</label>
                      <input
                        type="email"
                        className="form-control"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      <label>Số điện thoại *</label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Số điện thoại"
                        required
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                      />

                      <div className="row">
                        <div className="col-sm-6">
                          <label>Tỉnh / Thành phố *</label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            placeholder="VD: Hà Nội"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </div>

                        <div className="col-sm-6">
                          <label>Quận / Huyện *</label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            placeholder="VD: Cầu Giấy"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-6">
                          <label>Xã / Phường *</label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            placeholder="VD: Mai Dịch"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                          />
                        </div>

                        <div className="col-sm-6">
                          <label>Địa chỉ *</label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            placeholder="VD: Số nhà 100, Ngõ 50 Trần Bình"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="checkout-create-acc"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="checkout-create-acc"
                        >
                          Tạo một tài khoản mới?
                        </label>
                      </div> */}

                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="checkout-diff-address"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="checkout-diff-address"
                        >
                          Giao hàng đến một địa chỉ khác?
                        </label>
                      </div>

                      <label>Thông tin bổ sung (Tùy chọn)</label>
                      <textarea
                        className="form-control"
                        cols="30"
                        rows="4"
                        placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                      ></textarea>
                    </div>
                    <aside className="col-lg-3">
                      <div className="summary">
                        <h3 className="summary-title">Đơn hàng của bạn</h3>

                        <table className="table table-summary">
                          <thead>
                            <tr>
                              <th>Sản phẩm</th>
                              <th>Tạm tính</th>
                            </tr>
                          </thead>

                          <tbody>
                            {cart &&
                              cart.cartItems.map((item) => (
                                <tr>
                                  <td>
                                    <Link to={`/product/${item.product._id}`}>
                                      {item.name}
                                    </Link>
                                  </td>
                                  <td>
                                    {formatPrice(item.quantity * item.price)}
                                  </td>
                                </tr>
                              ))}
                            <tr className="summary-subtotal">
                              <td>Tạm tính:</td>
                              <td>{cart && formatPrice(cart.totalPrice)}</td>
                            </tr>
                            <tr>
                              <td>Phí giao hàng:</td>
                              <td>Miễn phí</td>
                            </tr>
                            <tr className="summary-total">
                              <td>Tổng cộng:</td>
                              <td>{cart && formatPrice(cart.totalPrice)}</td>
                            </tr>
                          </tbody>
                        </table>

                        <div
                          className="accordion-summary"
                          id="accordion-payment"
                        >
                          <RadioGroup
                            name="controlled-radio-buttons-group"
                            value={payment}
                            onChange={handleChangePayment}
                          >
                            <Accordion className={classes.accordionContainer}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <FormControlLabel
                                  value="Chuyển khoản ngân hàng"
                                  control={
                                    <Radio
                                      sx={{
                                        "& .MuiSvgIcon-root": {
                                          fontSize: 20,
                                        },
                                        color: "#c96",
                                        "&.Mui-checked": {
                                          color: "#c96",
                                        },
                                      }}
                                    />
                                  }
                                  label="Chuyển khoản ngân hàng"
                                  // className={classes.labelForm}
                                />
                              </AccordionSummary>
                              <AccordionDetails sx={{ padding: "0" }}>
                                <Typography sx={{ fontSize: "1.3rem" }}>
                                  Giữ lại ID đơn hàng khi thanh toán. Đơn hàng
                                  của bạn sẽ được vận chuyển khi thanh toán.
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordionContainer}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                              >
                                <FormControlLabel
                                  value="Trả tiền mặt khi nhận hàng"
                                  control={
                                    <Radio
                                      sx={{
                                        "& .MuiSvgIcon-root": {
                                          fontSize: 20,
                                        },
                                        color: "#c96",
                                        "&.Mui-checked": {
                                          color: "#c96",
                                        },
                                      }}
                                    />
                                  }
                                  label="Trả tiền mặt khi nhận hàng"
                                  // className={classes.labelForm}
                                />
                              </AccordionSummary>
                              <AccordionDetails sx={{ padding: "0" }}>
                                <Typography sx={{ fontSize: "1.3rem" }}>
                                  Thanh toán khi nhận hàng để hoàn tất.
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordionContainer}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                              >
                                <FormControlLabel
                                  value="Chuyển khoản bằng Stripe"
                                  control={
                                    <Radio
                                      sx={{
                                        "& .MuiSvgIcon-root": {
                                          fontSize: 20,
                                        },
                                        color: "#c96",
                                        "&.Mui-checked": {
                                          color: "#c96",
                                        },
                                      }}
                                    />
                                  }
                                  label="Chuyển khoản bằng Stripe"
                                  // className={classes.labelForm}
                                />
                              </AccordionSummary>
                              <AccordionDetails sx={{ padding: "0" }}>
                                <Typography sx={{ fontSize: "1.3rem" }}>
                                  Quisque volutpat mattis eros. Lorem ipsum
                                  dolor sit amet, consectetuer adipiscing elit.
                                  Donec odio. Quisque volutpat mattis eros.
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordionContainer}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel4a-content"
                                id="panel4a-header"
                              >
                                <FormControlLabel
                                  value="Chuyển khoản bằng VNPAY"
                                  control={
                                    <Radio
                                      sx={{
                                        "& .MuiSvgIcon-root": {
                                          fontSize: 20,
                                        },
                                        color: "#c96",
                                        "&.Mui-checked": {
                                          color: "#c96",
                                        },
                                      }}
                                    />
                                  }
                                  label="Chuyển khoản bằng VNPAY"
                                  // className={classes.labelForm}
                                />
                              </AccordionSummary>
                              <AccordionDetails sx={{ padding: "0" }}>
                                <Typography sx={{ fontSize: "1.3rem" }}>
                                  Quisque volutpat mattis eros. Lorem ipsum
                                  dolor sit amet, consectetuer adipiscing elit.
                                  Donec odio. Quisque volutpat mattis eros.
                                  <img
                                    style={{
                                      margin: "0 5px",
                                    }}
                                    src="assets/images/payments-summary.png"
                                    alt="payments cards"
                                  />
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                          </RadioGroup>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-outline-primary-2 btn-order btn-block"
                        >
                          <span className="btn-text">Đặt hàng</span>
                          <span className="btn-hover-text">
                            Tiến hành thanh toán
                          </span>
                        </button>
                      </div>
                    </aside>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default Checkout;
