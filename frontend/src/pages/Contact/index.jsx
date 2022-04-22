import React from "react";

function Contact() {
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
              Contact us
            </li>
          </ol>
        </div>
      </nav>
      <div className="container">
        <div
          className="page-header page-header-big text-center"
          style={{
            backgroundImage: "url('assets/images/contact-header-bg.jpg'",
          }}
        >
          <h1 className="page-title text-white">
            Liên hệ
            <span className="text-white">Giữ liên lạc với chúng tôi</span>
          </h1>
        </div>
      </div>

      <div className="page-content pb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-2 mb-lg-0">
              <h2 className="title mb-1">Thông tin liên hệ</h2>
              <p className="mb-3">
                Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod
                dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu,
                dapibus eu, fermentum et, dapibus sed, urna.
              </p>
              <div className="row">
                <div className="col-sm-7">
                  <div className="contact-info">
                    <h3>Văn phòng</h3>

                    <ul className="contact-list">
                      <li>
                        <i className="icon-map-marker"></i>
                        Ngõ 90 Dương Khuê, Mai Dịch, Quận Cầu Giấy, Hà Nội
                      </li>
                      <li>
                        <i className="icon-phone"></i>
                        <a href="tel:#">+84 12345678</a>
                      </li>
                      <li>
                        <i className="icon-envelope"></i>
                        <a href="mailto:#">phamvanhieu@gmail.com</a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-sm-5">
                  <div className="contact-info">
                    <h3>Văn phòng</h3>

                    <ul className="contact-list">
                      <li>
                        <i className="icon-clock-o"></i>
                        <span className="text-dark">
                          Thứ hai - Thứ bảy
                        </span>{" "}
                        <br />8 am - 7 pm
                      </li>
                      <li>
                        <i className="icon-calendar"></i>
                        <span className="text-dark">Chủ nhật</span> <br />
                        9am - 5 pm
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <h2 className="title mb-1">Bạn có câu hỏi cho chúng tôi?</h2>
              <p className="mb-2">
                Điền vào form bên dưới để liên hệ với đội ngũ chúng tôi
              </p>

              <form action="#" className="contact-form mb-3">
                <div className="row">
                  <div className="col-sm-6">
                    <label htmlFor="cname" className="sr-only">
                      Tên
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cname"
                      placeholder="Tên *"
                      required
                    />
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="cemail" className="sr-only">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="cemail"
                      placeholder="Email *"
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <label htmlFor="cphone" className="sr-only">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="cphone"
                      placeholder="Số điện thoại"
                    />
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="csubject" className="sr-only">
                      Vấn đề
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="csubject"
                      placeholder="Vấn đề"
                    />
                  </div>
                </div>

                <label htmlFor="cmessage" className="sr-only">
                  Lời nhắn
                </label>
                <textarea
                  className="form-control"
                  cols="30"
                  rows="4"
                  id="cmessage"
                  required
                  placeholder="Lời nhắn *"
                ></textarea>

                <button
                  type="submit"
                  className="btn btn-outline-primary-2 btn-minwidth-sm"
                >
                  <span>GỬI</span>
                  <i className="icon-long-arrow-right"></i>
                </button>
              </form>
            </div>
          </div>

          <hr className="mt-4 mb-5" />

          <div className="stores mb-4 mb-lg-5">
            <h2 className="title text-center mb-3">Cửa hàng của chúng tôi</h2>

            <div className="row">
              <div className="col-lg-6">
                <div className="store">
                  <div className="row">
                    <div className="col-sm-5 col-xl-6">
                      <figure className="store-media mb-2 mb-lg-0">
                        <img
                          src="assets/images/stores/img-1.jpg"
                          alt="Hải Dương"
                        />
                      </figure>
                    </div>
                    <div className="col-sm-7 col-xl-6">
                      <div className="store-content">
                        <h3 className="store-title">
                          Trung tâm thương mại Plaza
                        </h3>
                        <address>88 Nguyễn Huệ, Thanh Xuân, Hà Nội</address>
                        <div>
                          <a href="tel:#">+84 12345678</a>
                        </div>

                        <h4 className="store-subtitle">Mở cửa:</h4>
                        <div>Thứ hai - Thứ bảy 8am đến 10pm</div>
                        <div>Chủ nhật 8am đến 11pm</div>

                        <a
                          href="https://www.google.com/maps/place/Si%C3%AAu+Th%E1%BB%8B+Big+C+Th%C4%83ng+Long/@21.0076674,105.7908089,17z/data=!3m1!4b1!4m5!3m4!1s0x3135ab55cdd10bf1:0x30858e944b154a88!8m2!3d21.0076674!4d105.7929976?hl=vi-VN"
                          className="btn btn-link"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span>Xem bản đồ</span>
                          <i className="icon-long-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="store">
                  <div className="row">
                    <div className="col-sm-5 col-xl-6">
                      <figure className="store-media mb-2 mb-lg-0">
                        <img src="assets/images/stores/img-2.jpg" alt="image" />
                      </figure>
                    </div>

                    <div className="col-sm-7 col-xl-6">
                      <div className="store-content">
                        <h3 className="store-title">Aeon Hà Đông</h3>
                        <address>
                          Aeon Mall Hà Đông, Dương Nội, Hà Đông, Hà Nội
                        </address>
                        <div>
                          <a href="tel:#">+84 12345678</a>
                        </div>

                        <h4 className="store-subtitle">Mở cửa:</h4>
                        <div>Thứ hai - Thứ bảy 8am đến 10pm</div>
                        <div>Chủ nhật 8am đến 11pm</div>

                        <a
                          href="https://www.google.com/maps/place/AEON+Mall+H%C3%A0+%C4%90%C3%B4ng/@20.9897037,105.7495282,17z/data=!3m1!4b1!4m5!3m4!1s0x3135ab7bee9f7757:0x4ebf8ccfc24ec4ae!8m2!3d20.9897037!4d105.7517169?hl=vi-VN"
                          className="btn btn-link"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span>Xem bản đồ</span>
                          <i className="icon-long-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="map"></div>
      </div>
    </main>
  );
}

export default Contact;
