import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getBannerDetails, updateBanner } from "../../actions/bannerAction";
import { clearErrors } from "../../actions/productAction";
import Loader from "../../components/Common/Loader";
import MetaData from "../../components/Layout/MetaData";
import { UPDATE_BANNER_RESET } from "../../constants/bannerConstants";
import "./Admin.scss";
import Sidebar from "./components/Sidebar";

const drawerWidth = 240;

const useStyles = makeStyles({
  root: {
    fontSize: "100%",
  },
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function UpdateBanner() {
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

  const { user } = useSelector((state) => state.user);
  const theme = useTheme();
  const classes = useStyles();
  let match = useParams();
  const [open, setOpen] = useState(true);
  const {
    error,
    banner,
    loading: bannerLoading,
  } = useSelector((state) => state.bannerDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.banner);

  let history = useHistory();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const bannerId = match.id;

  useEffect(() => {
    if (banner && banner._id !== bannerId) {
      dispatch(getBannerDetails(bannerId));
    } else {
      setTitle(banner.title);
      setDescription(banner.description);
      setStatus(banner.status);
      setOldImages(banner.images);
    }
    if (error) {
      setOpenError(true);
      setErrorAlert(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      setOpenError(true);
      setErrorAlert(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      // alert("Chỉnh sửa thông tin sản phẩm thành công");
      setOpenSuccess(true);
      setSuccessAlert("Chỉnh sửa thông tin banner thành công");
      history.push("/admin/banners");
      dispatch({ type: UPDATE_BANNER_RESET });
    }
  }, [dispatch, error, history, isUpdated, bannerId, banner, updateError]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleHistory = (his) => {
    history.push(`/admin/${his}`);
  };

  const updateBannerSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("title", title);
    myForm.set("description", description);
    myForm.set("status", status);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(updateBanner(bannerId, myForm));
  };

  const updateBannerImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      {bannerLoading ? (
        <Loader />
      ) : (
        <Box sx={{ display: "flex" }} className={classes.root}>
          <MetaData title="Admin - Chỉnh sửa banner" />;
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
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{ mr: 2, ...(open && { display: "none" }) }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                  Đồng hồ PVH
                </Typography>
              </div>
              <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <span>Hi, {user.name}</span>
                <Avatar alt={user.name} src={user.avatar.url} />
              </Box>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <Sidebar handleHistory={handleHistory} />
            {/* <Divider /> */}
          </Drawer>
          <Main open={open}>
            <DrawerHeader />
            <h3 id="productListHeading">Chỉnh sửa banner</h3>
            <form
              className="flexDiv"
              encType="multipart/form-data"
              onSubmit={updateBannerSubmitHandler}
            >
              <Grid container spacing={2}>
                {/* <div className="flexDiv"> */}
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={2}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <p>Tiêu đề</p>
                </Grid>
                <Grid item xs={12} sm={8} md={10}>
                  <TextField
                    type="text"
                    label="Tiêu đề"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    variant="outlined"
                    sx={{ width: "50%" }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={2}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <p>Giới thiệu</p>
                </Grid>
                <Grid item xs={12} sm={8} md={10}>
                  <textarea
                    placeholder="Giới thiệu"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    cols="100"
                    rows="7"
                  ></textarea>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={2}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <p>Trạng thái</p>
                </Grid>
                <Grid item xs={12} sm={8} md={10}>
                  <FormControl sx={{ width: "50%", marginBottom: "1.5rem" }}>
                    <InputLabel id="demo-simple-select-label">
                      Trạng thái
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      label="Trạng thái"
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <MenuItem value={true}>Bật</MenuItem>
                      <MenuItem value={false}>Tắt</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={2}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <p>Chọn ảnh</p>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={10}
                  style={{ display: "flex", gap: "30px", alignItems: "center" }}
                >
                  <div id="createProductFormFile">
                    <Button variant="contained" component="label">
                      Tải ảnh lên
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={updateBannerImagesChange}
                        multiple
                        hidden
                      />
                    </Button>
                  </div>

                  <Box
                    id="createProductFormImage"
                    sx={{ display: "flex", alignItems: "center", gap: "30px" }}
                  >
                    {oldImages &&
                      oldImages.map((image, index) => (
                        <img
                          key={index}
                          src={image.url}
                          alt="old Banner Preview"
                          style={{
                            maxHeight: "150px",
                            maxWidth: "250px",
                          }}
                        />
                      ))}
                  </Box>

                  <Box
                    id="createProductFormImage"
                    sx={{ display: "flex", alignItems: "center", gap: "30px" }}
                  >
                    {imagesPreview.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt="Banner Preview"
                        style={{
                          maxHeight: "150px",
                          maxWidth: "150px",
                        }}
                      />
                    ))}
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    id="createCategoryBtn"
                    type="submit"
                    variant="contained"
                    disabled={loading ? true : false}
                    sx={{
                      marginBottom: "50px",
                    }}
                  >
                    Cập nhật banner
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Main>
        </Box>
      )}
    </>
  );
}
