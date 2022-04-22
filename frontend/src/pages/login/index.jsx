import React from "react";

function Login() {
  return (
    <main className="main">
      <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Pages</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Login
            </li>
          </ol>
        </div>
      </nav>

      <div
        className="login-page bg-image pt-8 pb-8 pt-md-12 pb-md-12 pt-lg-17 pb-lg-17"
        style={{
          backgroundImage: "url('assets/images/backgrounds/login-bg.jpg')",
        }}
      >
        <div className="container">
          <div className="form-box">
            <div className="form-tab">
              <ul className="nav nav-pills nav-fill" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="signin-tab-2"
                    data-toggle="tab"
                    href="#signin-2"
                    role="tab"
                    aria-controls="signin-2"
                    aria-selected="false"
                    style={{
                      fontSize: "2.4rem",
                      padding: "0.9rem 1rem",
                    }}
                  >
                    ĐĂNG NHẬP
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="register-tab-2"
                    data-toggle="tab"
                    href="#register-2"
                    role="tab"
                    aria-controls="register-2"
                    aria-selected="true"
                    style={{
                      fontSize: "2.4rem",
                      padding: "0.9rem 1rem",
                    }}
                  >
                    ĐĂNG KÝ
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div
                  className="tab-pane fade"
                  id="signin-2"
                  role="tabpanel"
                  aria-labelledby="signin-tab-2"
                >
                  <form action="#">
                    <div className="form-group">
                      <label htmlFor="singin-email-2">Email của bạn *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="singin-email-2"
                        name="singin-email"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="singin-password-2">Mật khẩu *</label>
                      <input
                        type="password"
                        className="form-control"
                        id="singin-password-2"
                        name="singin-password"
                        required
                      />
                    </div>

                    <div className="form-footer">
                      <button
                        type="submit"
                        className="btn btn-outline-primary-2"
                      >
                        <span>Đăng nhập</span>
                        <i className="icon-long-arrow-right"></i>
                      </button>

                      <a href="#" className="forgot-link">
                        Quên mật khẩu?
                      </a>
                    </div>
                  </form>
                  <div className="form-choice"></div>
                </div>
                <div
                  className="tab-pane fade show active"
                  id="register-2"
                  role="tabpanel"
                  aria-labelledby="register-tab-2"
                >
                  <form action="#">
                    <div className="form-group">
                      <label htmlFor="register-email-2">Email của bạn *</label>
                      <input
                        type="email"
                        className="form-control"
                        id="register-email-2"
                        name="register-email"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="register-password-2">Mật khẩu *</label>
                      <input
                        type="password"
                        className="form-control"
                        id="register-password-2"
                        name="register-password"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="register-confirmpassword-2">
                        Xác nhận mật khẩu *
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="register-confirmpassword-2"
                        name="register-confirmpassword"
                        required
                      />
                    </div>

                    <div className="form-footer">
                      <button
                        type="submit"
                        className="btn btn-outline-primary-2"
                      >
                        <span>Đăng ký</span>
                        <i className="icon-long-arrow-right"></i>
                      </button>

                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="register-policy-2"
                          required
                          style={{ cursor: "pointer" }}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="register-policy-2"
                        >
                          Tôi đồng ý với <a href="#">điều khoản</a> *
                        </label>
                      </div>
                    </div>
                  </form>
                  <div className="form-choice"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
