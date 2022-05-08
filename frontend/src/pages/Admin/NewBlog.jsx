import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import { Autocomplete, Avatar, Button, Grid, TextField } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createBlog } from "../../actions/blogAction";
import { clearErrors } from "../../actions/productAction";
import MetaData from "../../components/Layout/MetaData";
import { NEW_BLOG_RESET } from "../../constants/blogConstants";
import "./Admin.scss";
import Sidebar from "./components/Sidebar";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

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

const categoryOptions = ["Trang sức", "Đồng hồ", "Kiến thức"];

export default function NewBlog() {
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
  const [open, setOpen] = React.useState(true);
  const { loading, error, success } = useSelector((state) => state.newBlog);

  let history = useHistory();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [detail, setDetail] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [category, setCategory] = useState(categoryOptions[0]);

  const [inputCategoryValue, setInputCategoryValue] = useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleHistory = (his) => {
    history.push(`/admin/${his}`);
  };

  useEffect(() => {
    if (error) {
      setOpenError(true);
      setErrorAlert(error);
      dispatch(clearErrors());
    }

    if (success) {
      // alert("Tạo tin tức thành công");
      // setOpenSuccess(true);
      // setSuccessAlert("Tạo tin tức thành công");
      Swal.fire("Thành công!", "Tạo tin tức thành công!", "success");
      history.push("/admin/blogs");
      dispatch({ type: NEW_BLOG_RESET });
    }
  }, [dispatch, error, history, success]);

  const registerDataChange = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview(reader.result);
          setImage(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const createBlogSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("detail", detail);
    myForm.set("category", category);
    myForm.set("image", image);

    dispatch(createBlog(myForm));
  };

  return (
    <Box sx={{ display: "flex" }} className={classes.root}>
      <MetaData title="Admin - Tạo tin tức" />;
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
        <h3 id="productListHeading">Thêm danh mục</h3>
        <form
          className="flexDiv"
          encType="multipart/form-data"
          onSubmit={createBlogSubmitHandler}
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                required
                onChange={(e) => setDescription(e.target.value)}
                cols="100"
                rows="7"
                style={{ outline: "none" }}
              ></textarea>
            </Grid>

            <Grid
              item
              xs={12}
              sm={4}
              md={2}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <p>Nội dung</p>
            </Grid>
            <Grid item xs={12} sm={8} md={10}>
              <ReactQuill
                theme="snow"
                value={detail || ""}
                onChange={(html) => setDetail(html)}
                style={{
                  marginBottom: "50px",
                  height: "200px",
                }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={4}
              md={2}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <p>Danh mục</p>
            </Grid>
            <Grid item xs={12} sm={8} md={10}>
              <Autocomplete
                value={category}
                onChange={(event, newValue) => {
                  setCategory(newValue);
                }}
                inputValue={inputCategoryValue}
                onInputChange={(event, newInputValue) => {
                  setInputCategoryValue(newInputValue);
                }}
                id="controllable-cate"
                options={categoryOptions}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Danh mục" />
                )}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={4}
              md={2}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <p>Ảnh đại diện</p>
            </Grid>
            <Grid
              item
              xs={12}
              sm={8}
              md={10}
              sx={{ display: "flex", alignItems: "center", gap: "1.2rem" }}
            >
              <img
                src={imagePreview}
                alt="Blog Preview"
                // className={classes.avatarPreview}
              />
              <input
                id="register-avatar"
                // className={classes.avatarFile}
                type="file"
                name="image"
                accept="image/*"
                onChange={registerDataChange}
              />
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
                Tạo tin tức
              </Button>
            </Grid>
          </Grid>
        </form>
      </Main>
    </Box>
  );
}
