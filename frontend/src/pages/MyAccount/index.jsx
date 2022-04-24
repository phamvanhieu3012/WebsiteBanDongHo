import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  clearErrors,
  loadUser,
  logout,
  updatePassword,
  updateProfile,
} from "../../actions/userAction";
import {
  UPDATE_PASSWORD_RESET,
  UPDATE_PROFILE_RESET,
} from "../../constants/userConstants";

function MyAccount() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let history = useHistory();

  function logoutUser() {
    dispatch(logout());
    alert("Đăng xuất thành công");
    history.push("/");
  }

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = {
      name,
      email,
    };
    dispatch(updateProfile(myForm));
  };

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = {
      oldPassword,
      newPassword,
      confirmPassword,
    };
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert("Cập nhật thành công");
      dispatch(loadUser());
      history.push("/my-account");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, history, user, isUpdated]);

  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{
          backgroundImage: "url('assets/images/page-header-bg.jpg')",
        }}
      >
        <div className="container">
          <h1 className="page-title">Tài khoản của tôi</h1>
        </div>
      </div>
      <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Trang chủ</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Tài khoản của tôi
            </li>
          </ol>
        </div>
      </nav>

      <div className="page-content">
        <div className="dashboard">
          <div className="container">
            <div className="row">
              <aside className="col-md-4 col-lg-3">
                <ul
                  className="nav nav-dashboard flex-column mb-3 mb-md-0"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="tab-dashboard-link"
                      data-toggle="tab"
                      href="#tab-dashboard"
                      role="tab"
                      aria-controls="tab-dashboard"
                      aria-selected="true"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="tab-orders-link"
                      data-toggle="tab"
                      href="#tab-orders"
                      role="tab"
                      aria-controls="tab-orders"
                      aria-selected="false"
                    >
                      Đơn hàng
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="tab-address-link"
                      data-toggle="tab"
                      href="#tab-address"
                      role="tab"
                      aria-controls="tab-address"
                      aria-selected="false"
                    >
                      Địa chỉ
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="tab-account-link"
                      data-toggle="tab"
                      href="#tab-account"
                      role="tab"
                      aria-controls="tab-account"
                      aria-selected="false"
                    >
                      Chi tiết tài khoản
                    </a>
                  </li>
                  <li className="nav-item">
                    <span
                      className="nav-link"
                      onClick={logoutUser}
                      style={{ cursor: "pointer" }}
                    >
                      Đăng xuất
                    </span>
                  </li>
                </ul>
              </aside>
              {/* End .col-lg-3 */}

              <div className="col-md-8 col-lg-9">
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="tab-dashboard"
                    role="tabpanel"
                    aria-labelledby="tab-dashboard-link"
                  >
                    <p>
                      Xin chào{" "}
                      <span className="font-weight-normal text-dark">
                        {user.name}
                      </span>{" "}
                      (Không phải{" "}
                      <span className="font-weight-normal text-dark">
                        {user.name}
                      </span>
                      ?{" "}
                      <span style={{ cursor: "pointer" }} onClick={logoutUser}>
                        Đăng xuất
                      </span>
                      )
                      <br />
                      Từ giao diện tài khoản bạn có thể xem{" "}
                      <a
                        href="#tab-orders"
                        className="tab-trigger-link link-underline"
                      >
                        những đơn hàng gần đây
                      </a>
                      , quản lý{" "}
                      <a href="#tab-address" className="tab-trigger-link">
                        thông tin ship của bạn
                      </a>
                      , và{" "}
                      <a href="#tab-account" className="tab-trigger-link">
                        chỉnh sửa thông tin bản thân và tài khoản của bạn
                      </a>
                      .
                    </p>
                  </div>
                  {/* .End .tab-pane */}

                  <div
                    className="tab-pane fade"
                    id="tab-orders"
                    role="tabpanel"
                    aria-labelledby="tab-orders-link"
                  >
                    <p>Chưa có đơn hàng nào được tạo.</p>
                    <a href="/products" className="btn btn-outline-primary-2">
                      <span>Đi xem Shop</span>
                      <i className="icon-long-arrow-right"></i>
                    </a>
                  </div>
                  {/* .End .tab-pane */}

                  <div
                    className="tab-pane fade"
                    id="tab-address"
                    role="tabpanel"
                    aria-labelledby="tab-address-link"
                  >
                    <p>
                      Thông tin địa chỉ sẽ được dùng để thanh toán mặc định.
                    </p>

                    <div className="row">
                      <div className="col-lg-6">
                        <div className="card card-dashboard">
                          <div className="card-body">
                            <h3 className="card-title">Thông tin của bạn</h3>
                            {/* End .card-title */}

                            <p>
                              Họ và tên: {user.name}
                              <br />
                              Email của bạn: {user.email}
                              <br />
                              Địa chỉ: New York, NY 10001
                              <br />
                              Số điện thoại: 1-234-987-6543
                              <br />
                              <a href="#">
                                Sửa <i className="icon-edit"></i>
                              </a>
                            </p>
                          </div>
                          {/* End .card-body */}
                        </div>
                        {/* End .card-dashboard */}
                      </div>
                      {/* End .col-lg-6 */}

                      <div className="col-lg-6">
                        <div className="card card-dashboard">
                          <div className="card-body">
                            <h3 className="card-title">Địa chỉ giao hàng</h3>
                            {/* End .card-title */}

                            <p>
                              Bạn chưa nhập địa chỉ của bạn.
                              <br />
                              <a href="#">
                                Sửa <i className="icon-edit"></i>
                              </a>
                            </p>
                          </div>
                          {/* End .card-body */}
                        </div>
                        {/* End .card-dashboard */}
                      </div>
                      {/* End .col-lg-6 */}
                    </div>
                    {/* End .row */}
                  </div>
                  {/* .End .tab-pane */}

                  <div
                    className="tab-pane fade"
                    id="tab-account"
                    role="tabpanel"
                    aria-labelledby="tab-account-link"
                  >
                    <form
                      encType="multipart/form-data"
                      onSubmit={updateProfileSubmit}
                    >
                      <label>Họ và tên *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <small className="form-text">
                        Tên của bạn sẽ được hiển thị ở phần tài khoản và bình
                        luận
                      </small>

                      <label>Địa chỉ email *</label>
                      <input
                        type="email"
                        className="form-control"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      <button
                        type="submit"
                        className="btn btn-outline-primary-2"
                      >
                        <span>LƯU THAY ĐỔI</span>
                        <i className="icon-long-arrow-right"></i>
                      </button>
                    </form>
                    <form
                      encType="multipart/form-data"
                      onSubmit={updatePasswordSubmit}
                    >
                      <label>Mật khẩu hiện tại *</label>
                      <input
                        type="password"
                        className="form-control"
                        required
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />

                      <label>Mật khẩu mới *</label>
                      <input
                        type="password"
                        className="form-control"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />

                      <label>Xác nhận mật khẩu *</label>
                      <input
                        type="password"
                        className="form-control mb-2"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />

                      <button
                        type="submit"
                        className="btn btn-outline-primary-2"
                      >
                        <span>ĐỔI MẬT KHẨU</span>
                        <i className="icon-long-arrow-right"></i>
                      </button>
                    </form>
                  </div>
                  {/* .End .tab-pane */}
                </div>
              </div>
              {/* End .col-lg-9 */}
            </div>
            {/* End .row */}
          </div>
          {/* End .container */}
        </div>
        {/* End .dashboard */}
      </div>
      {/* End .page-content */}
    </main>
  );
}

{
  /*  */
}

export default MyAccount;
