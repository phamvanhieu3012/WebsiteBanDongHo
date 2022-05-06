import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearErrors, getAllBlogs } from "../../actions/blogAction";
import Loader from "../../components/Common/Loader";
import MetaData from "../../components/Layout/MetaData";
import moment from "moment";
import "moment/locale/vi";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
moment.locale("vi");

const categoryOptions = ["Trang sức", "Đồng hồ", "Kiến thức"];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Blog() {
  const { blogs, loading, error } = useSelector((state) => state.blogs);

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

  let match = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      setOpenError(true);
      setErrorAlert(error);
      dispatch(clearErrors());
    }

    dispatch(getAllBlogs());
  }, [dispatch, error]);

  return (
    <main className="main">
      <MetaData title="Tin tức" />;
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
          <h1 className="page-title">Tin tức</h1>
        </div>
      </div>
      <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Trang chủ</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Tin tức
            </li>
          </ol>
        </div>
      </nav>
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              {loading ? (
                <Loader />
              ) : (
                <>
                  {blogs &&
                    blogs.map((blog) => (
                      <article className="entry entry-list">
                        <div className="row align-items-center">
                          <div className="col-md-5">
                            <figure className="entry-media">
                              <a href="single.html">
                                <img
                                  src={blog.image.url}
                                  alt="blog desc"
                                  style={{ maxHeight: "300px" }}
                                />
                              </a>
                            </figure>
                          </div>

                          <div className="col-md-7">
                            <div className="entry-body">
                              <div className="entry-meta">
                                <span className="entry-author">
                                  bởi {blog.user.name}
                                </span>
                                <span className="meta-separator">|</span>
                                <a href="#">
                                  {moment(blog.createdAt).format("DD/MM/YYYY")}
                                </a>
                                <span className="meta-separator">|</span>
                                <a href="#">{blog.numOfReviews} Comments</a>
                              </div>

                              <h2 className="entry-title">
                                <Link to={`/blog/${blog._id}`}>
                                  {blog.name}
                                </Link>
                              </h2>

                              <div className="entry-cats">
                                trong <a href="#">{blog.category}</a>,
                              </div>

                              <div className="entry-content">
                                <p>{blog.description} ... </p>
                                <Link
                                  to={`/blog/${blog._id}`}
                                  className="read-more"
                                >
                                  Tiếp tục xem
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}

                  {/* <nav aria-label="Page navigation">
                    <ul className="pagination">
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
                  </nav> */}
                </>
              )}
            </div>

            <aside className="col-lg-3">
              <div className="sidebar">
                <div className="widget widget-search">
                  <h3 className="widget-title">Tìm kiếm</h3>

                  <form action="#">
                    <label htmlFor="ws" className="sr-only">
                      Tìm kiếm trong tin tức
                    </label>
                    <input
                      type="search"
                      className="form-control"
                      name="ws"
                      id="ws"
                      placeholder="Tìm kiếm trong tin tức"
                      required
                    />
                    <button type="submit" className="btn">
                      <i className="icon-search"></i>
                      <span className="sr-only">Search</span>
                    </button>
                  </form>
                </div>

                <div className="widget widget-cats">
                  <h3 className="widget-title">Danh mục</h3>

                  <ul>
                    {categoryOptions.map((cate) => (
                      <li>
                        <a href="#">{cate}</a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="widget widget-banner-sidebar">
                  <div className="banner-sidebar-title">ad box 280 x 280</div>

                  <div className="banner-sidebar banner-overlay">
                    <a href="#">
                      <img
                        src="assets/images/blog/sidebar/banner.jpg"
                        alt="banner"
                      />
                    </a>
                  </div>
                </div>

                <div className="widget widget-text">
                  <h3 className="widget-title">Về Blog</h3>

                  <div className="widget-text-content">
                    <p>Chia sẻ các kiến thức về đồng hồ, trang sức,...</p>
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

export default Blog;
