import React from "react";

function Checkout() {
  return (
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
            <form action="#">
              <div className="row">
                <div className="col-lg-9">
                  <h2 className="checkout-title">Thông tin thanh toán</h2>

                  <label>Họ và tên *</label>
                  <input type="text" className="form-control" required />

                  <label>Địa chỉ email *</label>
                  <input type="email" className="form-control" required />

                  <label>Số điện thoại *</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Số điện thoại"
                    required
                  />

                  <div className="row">
                    <div className="col-sm-6">
                      <label>Tỉnh / Thành phố *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        placeholder="VD: Hà Nội"
                      />
                    </div>

                    <div className="col-sm-6">
                      <label>Quận / Huyện *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        placeholder="VD: Cầu Giấy"
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
                      />
                    </div>

                    <div className="col-sm-6">
                      <label>Địa chỉ *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        placeholder="VD: Số nhà 100, Ngõ 50 Trần Bình"
                      />
                    </div>
                  </div>

                  <div className="custom-control custom-checkbox">
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
                  </div>

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
                        <tr>
                          <td>
                            <a href="#">Beige knitted elastic runner shoes</a>
                          </td>
                          <td>$84.00</td>
                        </tr>

                        <tr>
                          <td>
                            <a href="#">Blue utility pinafore denimdress</a>
                          </td>
                          <td>$76,00</td>
                        </tr>
                        <tr className="summary-subtotal">
                          <td>Tạm tính:</td>
                          <td>$160.00</td>
                        </tr>
                        <tr>
                          <td>Phí giao hàng:</td>
                          <td>Miễn phí</td>
                        </tr>
                        <tr className="summary-total">
                          <td>Tổng cộng:</td>
                          <td>$160.00</td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="accordion-summary" id="accordion-payment">
                      <div className="card">
                        <div className="card-header" id="heading-1">
                          <h2 className="card-title">
                            <a
                              role="button"
                              data-toggle="collapse"
                              href="#collapse-1"
                              aria-expanded="true"
                              aria-controls="collapse-1"
                            >
                              Chuyển khoản ngân hàng
                            </a>
                          </h2>
                        </div>
                        {/* End .card-header */}
                        <div
                          id="collapse-1"
                          className="collapse show"
                          aria-labelledby="heading-1"
                          data-parent="#accordion-payment"
                        >
                          <div className="card-body">
                            Giữ lại ID đơn hàng khi thanh toán. Đon hàng của bạn
                            sẽ được vận chuyển khi thanh toán.
                          </div>
                        </div>
                      </div>

                      <div className="card">
                        <div className="card-header" id="heading-2">
                          <h2 className="card-title">
                            <a
                              className="collapsed"
                              role="button"
                              data-toggle="collapse"
                              href="#collapse-2"
                              aria-expanded="false"
                              aria-controls="collapse-2"
                            >
                              Trả tiền mặt khi nhận hàng
                            </a>
                          </h2>
                        </div>
                        <div
                          id="collapse-2"
                          className="collapse"
                          aria-labelledby="heading-2"
                          data-parent="#accordion-payment"
                        >
                          <div className="card-body">
                            Ipsum dolor sit amet, consectetuer adipiscing elit.
                            Donec odio. Quisque volutpat mattis eros. Nullam
                            malesuada erat ut turpis.
                          </div>
                        </div>
                      </div>

                      <div className="card">
                        <div className="card-header" id="heading-3">
                          <h2 className="card-title">
                            <a
                              className="collapsed"
                              role="button"
                              data-toggle="collapse"
                              href="#collapse-3"
                              aria-expanded="false"
                              aria-controls="collapse-3"
                            >
                              Chuyển khoản bằng Stripe
                            </a>
                          </h2>
                        </div>
                        {/* End .card-header */}
                        <div
                          id="collapse-3"
                          className="collapse"
                          aria-labelledby="heading-3"
                          data-parent="#accordion-payment"
                        >
                          <div className="card-body">
                            Quisque volutpat mattis eros. Lorem ipsum dolor sit
                            amet, consectetuer adipiscing elit. Donec odio.
                            Quisque volutpat mattis eros.
                          </div>
                        </div>
                      </div>

                      <div className="card">
                        <div className="card-header" id="heading-4">
                          <h2 className="card-title">
                            <a
                              className="collapsed"
                              role="button"
                              data-toggle="collapse"
                              href="#collapse-4"
                              aria-expanded="false"
                              aria-controls="collapse-4"
                            >
                              PayPal{" "}
                              <small className="float-right paypal-link">
                                What is PayPal?
                              </small>
                            </a>
                          </h2>
                        </div>
                        {/* End .card-header */}
                        <div
                          id="collapse-4"
                          className="collapse"
                          aria-labelledby="heading-4"
                          data-parent="#accordion-payment"
                        >
                          <div className="card-body">
                            Nullam malesuada erat ut turpis. Suspendisse urna
                            nibh, viverra non, semper suscipit, posuere a, pede.
                            Donec nec justo eget felis facilisis fermentum.
                          </div>
                        </div>
                      </div>

                      <div className="card">
                        <div className="card-header" id="heading-5">
                          <h2 className="card-title">
                            <a
                              className="collapsed"
                              role="button"
                              data-toggle="collapse"
                              href="#collapse-5"
                              aria-expanded="false"
                              aria-controls="collapse-5"
                            >
                              Chuyển khoản bằng VNPAY
                              <img
                                src="assets/images/payments-summary.png"
                                alt="payments cards"
                              />
                            </a>
                          </h2>
                        </div>
                        {/* End .card-header */}
                        <div
                          id="collapse-5"
                          className="collapse"
                          aria-labelledby="heading-5"
                          data-parent="#accordion-payment"
                        >
                          <div className="card-body">
                            {" "}
                            Donec nec justo eget felis facilisis fermentum.Lorem
                            ipsum dolor sit amet, consectetuer adipiscing elit.
                            Donec odio. Quisque volutpat mattis eros. Lorem
                            ipsum dolor sit ame.
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* End .accordion */}

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
  );
}

export default Checkout;
