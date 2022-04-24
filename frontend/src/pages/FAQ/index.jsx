import React from "react";

function FAQ() {
  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{
          backgroundImage: "url('assets/images/page-header-bg.jpg')",
        }}
      >
        <div className="container">
          <h1 className="page-title">F.A.Q</h1>
        </div>
      </div>
      <nav aria-label="breadcrumb" className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Trang chủ</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              FAQ
            </li>
          </ol>
        </div>
      </nav>

      <div className="page-content">
        <div className="container">
          <h2 className="title text-center mb-3">Thông tin vận chuyển</h2>
          <div className="accordion accordion-rounded" id="accordion-1">
            <div className="card card-box card-sm bg-light">
              <div className="card-header" id="heading-1">
                <h2 className="card-title">
                  <a
                    role="button"
                    data-toggle="collapse"
                    href="#collapse-1"
                    aria-expanded="true"
                    aria-controls="collapse-1"
                  >
                    Đối tượng và phạm vi vận chuyển
                  </a>
                </h2>
              </div>
              <div
                id="collapse-1"
                className="collapse show"
                aria-labelledby="heading-1"
                data-parent="#accordion-1"
              >
                <div className="card-body">
                  Chính sách giao nhận được áp dụng cho tất cả các khách hàng
                  đặt hàng qua tất cả các kênh Online và Offline tại Đồng Hồ
                  PVH. Đồng Hồ PVH sẽ thực hiện tất cả các yêu cầu vận chuyển
                  cho khách hàng trên phạm vi toàn quốc..
                </div>
              </div>
            </div>
            <div className="card card-box card-sm bg-light">
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
                    Phí giao hàng?
                  </a>
                </h2>
              </div>
              <div
                id="collapse-2"
                className="collapse"
                aria-labelledby="heading-2"
                data-parent="#accordion-1"
              >
                <div className="card-body">
                  Tất cả sản phẩm (là đồng hồ) đều được hưởng dịch vụ MIỄN PHÍ
                  vận chuyển tiêu chuẩn, cho dù bạn ở đâu trên đất nước Việt Nam
                  này. Đối với các sản phẩm còn lại không phải đồng hồ (dây da,
                  trang sức, kính cường lực,…) được tính phí vận chuyển ĐỒNG GIÁ
                  TOÀN QUỐC 30k.
                </div>
              </div>
            </div>

            <div className="card card-box card-sm bg-light">
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
                    Thời gian giao hàng
                  </a>
                </h2>
              </div>
              <div
                id="collapse-3"
                className="collapse"
                aria-labelledby="heading-3"
                data-parent="#accordion-1"
              >
                <div className="card-body">
                  Nếu bạn là khách hàng mua sắm online thuộc TP. Hồ Chí Minh,
                  Biên Hòa, Bình Dương, Vũng Tàu, Cần Thơ, được trải nghiệm thêm
                  dịch vụ giao hàng siêu tốc trong 2 giờ (với mức phí được trao
                  đổi trực tiếp với bộ phận CSKH). Bạn không phải chờ đợi quá
                  lâu cho những sản phẩm sẽ thuộc về mình. Thời gian là 2-3 ngày
                  đối với khu vực trung tâm tỉnh thành phố, 3-7 ngày đối với khu
                  vực ngoại thành, huyện, xã, thị trấn…(Không tính thứ bảy, chủ
                  nhật hay các ngày lễ tết) Thời gian xử lý đơn hàng sẽ được
                  tính từ khi nhận được thanh toán hoàn tất của quý khách.
                </div>
              </div>
            </div>
          </div>

          <h2 className="title text-center mb-3">Chính sách đổi hàng</h2>
          <div className="accordion accordion-rounded" id="accordion-2">
            <div className="card card-box card-sm bg-light">
              <div className="card-header" id="heading2-1">
                <h2 className="card-title">
                  <a
                    className="collapsed"
                    role="button"
                    data-toggle="collapse"
                    href="#collapse2-1"
                    aria-expanded="false"
                    aria-controls="collapse2-1"
                  >
                    Thời gian
                  </a>
                </h2>
              </div>
              <div
                id="collapse2-1"
                className="collapse"
                aria-labelledby="heading2-1"
                data-parent="#accordion-2"
              >
                <div className="card-body">
                  Trong vòng 7 ngày kể từ ngày mua hàng từ Đồng Hồ Hải Triều,
                  Quý khách có thể yêu cầu đổi hàng hoàn toàn miễn phí. Thời hạn
                  7 ngày được tính theo dấu bưu điện khi Quý khách gửi sản phẩm
                  về cho chúng tôi hoặc thời gian chúng tôi tiếp nhận yêu cầu
                  trực tiếp (tại cửa hàng) của Quý khách.
                </div>
              </div>
            </div>

            <div className="card card-box card-sm bg-light">
              <div className="card-header" id="heading2-2">
                <h2 className="card-title">
                  <a
                    className="collapsed"
                    role="button"
                    data-toggle="collapse"
                    href="#collapse2-2"
                    aria-expanded="false"
                    aria-controls="collapse2-2"
                  >
                    Điều kiện đổi sản phẩm
                  </a>
                </h2>
              </div>
              <div
                id="collapse2-2"
                className="collapse"
                aria-labelledby="heading2-2"
                data-parent="#accordion-2"
              >
                <div className="card-body">
                  Yêu cầu đổi hàng cần được thực hiện trong vòng 7 ngày kể từ
                  ngày Quý khách nhận được hàng. Đồng hồ chưa qua sử dụng, còn
                  lớp keo bọc bên ngoài. Không trầy xước dù là nhỏ nhất, dây da
                  chưa đeo, không có dấu hiệu ngấn dây. Các bộ phận, linh kiện,
                  phụ kiện, tài liệu hướng dẫn sử dụng, tài liệu kỹ thuật, quà
                  tặng kèm theo (nếu có), … phải còn đầy đủ và không có dấu hiệu
                  đã qua sử dụng. Hộp đựng, bao bì đóng gói sản phẩm còn nguyên
                  vẹn, không bị móp, rách, ố vàng, …
                </div>
              </div>
            </div>
          </div>

          <h2 className="title text-center mb-3">Chính sách bảo hành</h2>
          <div className="accordion accordion-rounded" id="accordion-3">
            <div className="card card-box card-sm bg-light">
              <div className="card-header" id="heading3-1">
                <h2 className="card-title">
                  <a
                    className="collapsed"
                    role="button"
                    data-toggle="collapse"
                    href="#collapse3-1"
                    aria-expanded="false"
                    aria-controls="collapse3-1"
                  >
                    Điều kiện được bảo hành
                  </a>
                </h2>
              </div>
              <div
                id="collapse3-1"
                className="collapse"
                aria-labelledby="heading3-1"
                data-parent="#accordion-3"
              >
                <div className="card-body">
                  Bảo hành chỉ có giá trị khi đồng hồ có Phiếu bảo hành của hãng
                  & Phiếu bảo hành của Hải Triều đi kèm, điền chính xác, đầy đủ
                  các thông tin. Phiếu bảo hành phải còn nguyên vẹn, không rách,
                  chấp vá, hoen ố, mờ nhạt. Còn trong thời gian bảo hành. Thời
                  gian bảo hành được tính từ ngày mua có ghi trên Phiếu Bảo
                  Hành. Chỉ bảo hành thay thế mới cho những linh kiện, phụ tùng
                  bị hỏng – không thay thế bằng một chiếc đồng hồ khác.
                </div>
              </div>
            </div>

            <div className="card card-box card-sm bg-light">
              <div className="card-header" id="heading3-2">
                <h2 className="card-title">
                  <a
                    className="collapsed"
                    role="button"
                    data-toggle="collapse"
                    href="#collapse3-2"
                    aria-expanded="false"
                    aria-controls="collapse3-2"
                  >
                    Điều kiện không được bảo hành
                  </a>
                </h2>
              </div>
              <div
                id="collapse3-2"
                className="collapse"
                aria-labelledby="heading3-2"
                data-parent="#accordion-3"
              >
                <div className="card-body">
                  Đồng hồ không có Phiếu bảo hành của hãng và Phiếu bảo hành của
                  Hải Triều đi kèm. Các loại dây đeo, khoá, vỏ, màu xi, mặt số,
                  mặt kiếng bị hỏng hóc, vỡ do sử dụng không đúng, tai nạn, lão
                  hóa tự nhiên, va đập, … trong quá trình sử dụng. Hỏng hóc do
                  hậu quả gián tiếp của việc sử dụng sai hướng dẫn của hãng có
                  kèm theo đồng hồ. Trầy xước về dây hoặc mặt kiếng bị trầy
                  xước, vỡ do va chạm trong quá trình sử dụng. Tự ý thay đổi máy
                  móc bên trong, mở ra can thiệp sửa chữa trong thời gian còn
                  bảo hành – Tại những nơi không phải là trung tâm của hãng
                </div>
              </div>
            </div>
          </div>

          <h2 className="title text-center mb-3">Thanh toán và trả góp</h2>
          <div className="accordion accordion-rounded" id="accordion-4">
            <div className="card card-box card-sm bg-light">
              <div className="card-header" id="heading4-1">
                <h2 className="card-title">
                  <a
                    className="collapsed"
                    role="button"
                    data-toggle="collapse"
                    href="#collapse4-1"
                    aria-expanded="false"
                    aria-controls="collapse4-1"
                  >
                    Thanh toán
                  </a>
                </h2>
              </div>
              <div
                id="collapse4-1"
                className="collapse"
                aria-labelledby="heading4-1"
                data-parent="#accordion-4"
              >
                <div className="card-body">
                  Thanh toán khi nhận hàng (COD) & Thanh toán chuyển khoản ngân
                  hàng
                </div>
              </div>
            </div>

            <div className="card card-box card-sm bg-light">
              <div className="card-header" id="heading4-2">
                <h2 className="card-title">
                  <a
                    className="collapsed"
                    role="button"
                    data-toggle="collapse"
                    href="#collapse4-2"
                    aria-expanded="false"
                    aria-controls="collapse4-2"
                  >
                    Tài khoản
                  </a>
                </h2>
              </div>
              <div
                id="collapse4-2"
                className="collapse"
                aria-labelledby="heading3-2"
                data-parent="#accordion-3"
              >
                <div className="card-body">
                  <p>
                    Tài khoản SHB: - Chủ tài khoản: Nguyễn Văn Sơn - Số tài
                    khoản: 3116681668 - Ngân hàng: SHB Chi nhánh Ba Đình
                  </p>
                  <p>
                    Tài khoản Tienphong Bank: - Chủ tài khoản: Phạm Ngọc Phú -
                    Số tài khoản: 04184817201 - Ngân hàng: Tienphong Bank PGD
                    Trung Hòa - Nhân Chính
                  </p>
                </div>
              </div>
            </div>

            <div className="card card-box card-sm bg-light">
              <div className="card-header" id="heading4-3">
                <h2 className="card-title">
                  <a
                    className="collapsed"
                    role="button"
                    data-toggle="collapse"
                    href="#collapse4-3"
                    aria-expanded="false"
                    aria-controls="collapse4-3"
                  >
                    Trả góp
                  </a>
                </h2>
              </div>
              <div
                id="collapse4-3"
                className="collapse"
                aria-labelledby="heading4-3"
                data-parent="#accordion-4"
              >
                <div className="card-body">
                  MUA ĐỒNG HỒ TRẢ GÓP 0% LÃI SUẤT QUA FUNDIIN
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="cta cta-display bg-image pt-4 pb-4"
        style={{
          backgroundImage: "url(assets/images/backgrounds/cta/bg-7.jpg)",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-9 col-xl-7">
              <div className="row no-gutters flex-column flex-sm-row align-items-sm-center">
                <div className="col">
                  <h3 className="cta-title text-white">
                    Nếu bạn có thêm câu hỏi
                  </h3>
                  <p className="cta-desc text-white">
                    Quisque volutpat mattis eros
                  </p>
                </div>

                <div className="col-auto">
                  <a href="contact.html" className="btn btn-outline-white">
                    <span>CONTACT US</span>
                    <i className="icon-long-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default FAQ;
