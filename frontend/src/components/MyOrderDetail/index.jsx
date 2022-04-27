import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearErrors, getOrderDetails } from "../../actions/orderAction";
import formatPrice from "../../ultils/formatPrice";
import Loader from "../Common/Loader";
import "./MyOrderDetail.scss";

function MyOrderDetail() {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  const match = useParams();

  console.log(match);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(match.id));
  }, [dispatch, error, match.id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        // <MetaData title="Chi tiết đơn hàng" />
        <main className="main">
          <div
            className="page-header text-center"
            style={{
              backgroundImage: "url('assets/images/page-header-bg.jpg')",
            }}
          >
            <div className="container">
              <h1 className="page-title">Chi tiết đơn hàng</h1>
            </div>
          </div>
          <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
            <div className="container">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Trang chủ</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/my-account">Đơn hàng của tôi</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Chi tiết đơn hàng
                </li>
              </ol>
            </div>
          </nav>
          <div className="page-content">
            <div className="container">
              <div className="orderDetailsPage">
                <div className="orderDetailsContainer">
                  <h3>Đơn hàng #{order && order._id}</h3>
                  <h4>Thông tin ship hàng</h4>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Họ và tên:</p>
                      <span>{order.name}</span>
                    </div>
                    <div>
                      <p>Số điện thoại:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Địa chỉ:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.country}, ${order.shippingInfo.state}, ${order.shippingInfo.city}`}
                      </span>
                    </div>
                  </div>
                  <h4>Thông tin thanh toán</h4>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === "Chuyển khoản ngân hàng"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        Phương thức thanh toán:<span> </span>
                        {order.paymentInfo && order.paymentInfo.status}
                      </p>
                    </div>

                    <div>
                      <p>Tổng đơn hàng:</p>
                      <span>
                        {order.totalPrice && formatPrice(order.totalPrice)}
                      </span>
                    </div>
                  </div>

                  <h4>Trạng thái đơn hàng</h4>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="orderDetailsCartItems">
                  <h4>Các sản phẩm trong giỏ hàng:</h4>
                  <table className="table table-cart table-mobile">
                    <thead>
                      <tr>
                        <th>Sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Tạm tính</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderItems &&
                        order.orderItems.map((item) => (
                          <tr key={item.product}>
                            <td className="product-col">
                              <div className="product">
                                <figure className="product-media">
                                  <Link to={`/product/${item.product}`}>
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      style={{
                                        width: "5vmax",
                                      }}
                                    />
                                  </Link>
                                </figure>

                                <h3 className="product-title">
                                  <Link to={`/product/${item.product}`}>
                                    {item.name}
                                  </Link>
                                </h3>
                              </div>
                            </td>
                            <td className="price-col">
                              {formatPrice(item.price)}
                            </td>
                            <td className="quantity-col">{item.quantity}</td>
                            <td className="total-col">
                              {formatPrice(item.quantity * item.price)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default MyOrderDetail;
