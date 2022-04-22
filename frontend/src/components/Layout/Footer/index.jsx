import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-middle">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-lg-3">
              <div className="widget widget-about">
                <h4 className="widget-title">about PVH</h4>
                <p>
                  PVH là Hệ thống phân phối đồng hồ chính hãng UY TÍN, thuộc TOP
                  3 thương hiệu đồng hồ lớn nhất tại Việt Nam.{" "}
                </p>

                <div className="social-icons">
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
                    title="Youtube"
                    target="_blank"
                  >
                    <i className="icon-youtube"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="widget">
                <h4 className="widget-title">Chăm sóc khách hàng</h4>

                <ul className="widget-list">
                  <li>
                    <a href="/faq">Hướng dẫn mua hàng</a>
                  </li>
                  <li>
                    <a href="/faq">Chính sách đổi trả</a>
                  </li>
                  <li>
                    <a href="/faq">FAQ</a>
                  </li>
                  <li>
                    <a href="/faq">Chính sách bảo hành</a>
                  </li>
                  <li>
                    <a href="/faq">Vận chuyển và giao nhận</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="widget">
                <h4 className="widget-title">Về PVH</h4>

                <ul className="widget-list">
                  <li>
                    <a href="/about">About</a>
                  </li>
                  <li>
                    <a href="/about">Triết lý kinh doanh</a>
                  </li>
                  <li>
                    <a href="/about">Giấy chứng nhận và giải thưởng</a>
                  </li>
                  <li>
                    <a href="/about">Khách hàng nói gì về chúng tôi</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="widget">
                <h4 className="widget-title">Tham khảo</h4>

                <ul className="widget-list">
                  <li>
                    <a href="/blog">Thông báo mới</a>
                  </li>
                  <li>
                    <a href="/faq">Bảo mật thông tin</a>
                  </li>
                  <li>
                    <a href="/contact">Hỏi đáp - Góp ý</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <img
            // src="assets/images/demos/demo-6/logo-footer.png"
            src="/logo.png"
            alt="Molla Logo"
            width="82"
            height="25"
          />
          <p className="footer-copyright">
            Copyright © 2022 PVH Store. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
