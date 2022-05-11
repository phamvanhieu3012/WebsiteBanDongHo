import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Autocomplete,
  Avatar,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
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
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllCategories } from "../../actions/categoryAction";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6
import {
  clearErrors,
  getProductDetails,
  updateProduct,
} from "../../actions/productAction";
import Loader from "../../components/Common/Loader";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import "./Admin.scss";
import Sidebar from "./components/Sidebar";
import MetaData from "../../components/Layout/MetaData";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

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

const sexOptions = ["Nam", "Nữ"];
const ropeMaterialOptions = [
  "Thép không gỉ",
  "Dây da",
  "Dây vải",
  "Dây cao su",
  "Dây nhựa",
  "Titanium",
];
const glassMaterialOptions = ["Kính cứng", "Kính Sapphire", "Kính nhựa"];

export default function UpdateProduct() {
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

  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const { user } = useSelector((state) => state.user);
  const { error, product } = useSelector((state) => state.productDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);
  const { loading: categoryLoading, categories } = useSelector(
    (state) => state.categories
  );
  const categoryOptions = categories.map((cate) => {
    return cate.name;
  });

  let history = useHistory();
  const dispatch = useDispatch();
  let match = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [moreDescription, setMoreDescription] = useState("");
  const [sex, setSex] = useState(sexOptions[0]);
  const [ropeMaterial, setRopeMaterial] = useState(ropeMaterialOptions[0]);
  const [glassMaterial, setGlassMaterial] = useState(glassMaterialOptions[0]);
  const [dialSize, setDialSize] = useState(0);
  const [category, setCategory] = useState("");
  const [categoryName, setCategoryName] = useState(categoryOptions[0]);
  const [Stock, setStock] = useState(0);
  const [unitPrice, setUnitPrice] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const [inputSexValue, setInputSexValue] = useState("");
  const [inputRopeMaterialValue, setInputRopeMaterialValue] = useState("");
  const [inputGlassMaterialValue, setInputGlassMaterialValue] = useState("");
  const [inputCategoryValue, setCategoryValue] = useState("");

  // const [discountName, setDiscountName] = useState("");
  // const [discountDesc, setDiscountDesc] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountActive, setDiscountActive] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleHistory = (his) => {
    history.push(`/admin/${his}`);
  };

  const productId = match.id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setSex(product.sex);
      setRopeMaterial(product.ropeMaterial);
      setGlassMaterial(product.glassMaterial);
      setDialSize(product.dialSize);
      setUnitPrice(product.unitPrice);
      setDescription(product.description);
      setMoreDescription(product.moreDescription);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
      setDiscountPercent(product.discountPercent);
      setDiscountActive(product.discountActive);

      // const cate = categories.filter((cate) => cate._id === category._id);
      // // setCategoryName(cate[0].name);
    }
    if (product && product.category) {
      setCategory(product.category._id);
      setCategoryName(product.category.name);
    }
    // if (product && product.discount) {
    //   setDiscountName(product.discount.name);
    //   setDiscountDesc(product.discount.description);
    //   setDiscountPercent(product.discount.percent);
    //   setDiscountActive(product.discount.discountActive);
    // }
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
      setSuccessAlert("Chỉnh sửa thông tin sản phẩm thành công");
      history.push("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
    dispatch(getAllCategories());
  }, [dispatch, error, history, isUpdated, productId, product, updateError]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    // const discount = {
    //   name: discountName,
    //   description: discountDesc,
    //   percent: discountPercent,
    //   discountActive: discountActive,
    // };

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("unitPrice", unitPrice);
    myForm.set("ropeMaterial", ropeMaterial);
    myForm.set("glassMaterial", glassMaterial);
    myForm.set("dialSize", dialSize);
    myForm.set("description", description);
    myForm.set("moreDescription", moreDescription);
    myForm.set("sex", sex);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    myForm.set("discountPercent", discountPercent);
    myForm.set("discountActive", discountActive);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
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
      {categoryLoading ? (
        <Loader />
      ) : (
        <Box sx={{ display: "flex" }} className={classes.root}>
          <MetaData title="Admin - Chỉnh sửa sản phẩm" />;
          <CssBaseline />
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
            <h3 id="productListHeading">Chỉnh sửa thông tin sản phẩm</h3>
            <form
              className="flexDiv"
              encType="multipart/form-data"
              onSubmit={updateProductSubmitHandler}
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
                  <p>Tên sản phẩm</p>
                </Grid>
                <Grid item xs={12} sm={8} md={10}>
                  <TextField
                    type="text"
                    label="Tên sản phẩm"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                    sx={{ width: "50%" }}
                  />
                </Grid>
                {/* </div> */}
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={2}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <p>Giá tiền</p>
                </Grid>
                <Grid item xs={12} sm={8} md={10}>
                  <TextField
                    type="number"
                    label="Giá tiền"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
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
                  <p>Đơn vị tính</p>
                </Grid>
                <Grid item xs={12} sm={8} md={10}>
                  <TextField
                    type="text"
                    label="Đơn vị tính"
                    required
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(e.target.value)}
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
                  <p>Giới tính</p>
                </Grid>
                <Grid item xs={12} sm={8} md={10}>
                  <Autocomplete
                    value={sex}
                    onChange={(event, newValue) => {
                      setSex(newValue);
                    }}
                    inputValue={inputSexValue}
                    onInputChange={(event, newInputValue) => {
                      setInputSexValue(newInputValue);
                    }}
                    id="controllable-sex"
                    options={sexOptions}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Giới tính" />
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
                  <p>Loại dây</p>
                </Grid>
                <Grid item xs={12} sm={8} md={10}>
                  <Autocomplete
                    value={ropeMaterial}
                    onChange={(event, newValue) => {
                      setRopeMaterial(newValue);
                    }}
                    inputValue={inputRopeMaterialValue}
                    onInputChange={(event, newInputValue) => {
                      setInputRopeMaterialValue(newInputValue);
                    }}
                    id="controllable-rope-material"
                    options={ropeMaterialOptions}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Loại dây" />
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
                  <p>Loại mặt kính</p>
                </Grid>
                <Grid item xs={12} sm={8} md={10}>
                  <Autocomplete
                    value={glassMaterial}
                    onChange={(event, newValue) => {
                      setGlassMaterial(newValue);
                    }}
                    inputValue={inputGlassMaterialValue}
                    onInputChange={(event, newInputValue) => {
                      setInputGlassMaterialValue(newInputValue);
                    }}
                    id="controllable-glass-material"
                    options={glassMaterialOptions}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Loại mặt kính" />
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
                  <p>Giới thiệu</p>
                </Grid>
                <Grid item xs={12} sm={8} md={10}>
                  <textarea
                    placeholder="Giới thiệu"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    cols="40"
                    rows="3"
                  ></textarea>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={2}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <p>Thông tin sản phẩm</p>
                </Grid>
                <Grid item xs={12} sm={8} md={10}>
                  {/* <textarea
                    placeholder="Thông tin sản phẩm"
                    value={moreDescription}
                    onChange={(e) => setMoreDescription(e.target.value)}
                    cols="40"
                    rows="3"
                  ></textarea> */}
                  <ReactQuill
                    theme="snow"
                    value={moreDescription || ""}
                    onChange={(html) => setMoreDescription(html)}
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
                  <p>Kích thước mặt đồng hồ</p>
                </Grid>
                <Grid item xs={12} sm={8} md={10}>
                  <TextField
                    inputProps={{
                      inputMode: "numeric",
                      type: "number",
                      pattern: "[0-9]*",
                      step: "0.01",
                      min: "0",
                    }}
                    label="Kích thước mặt đồng hồ"
                    required
                    value={dialSize}
                    onChange={(e) => setDialSize(e.target.value)}
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
                  <p>Thương hiệu</p>
                </Grid>
                <Grid item xs={12} sm={8} md={10}>
                  <Autocomplete
                    value={categoryName}
                    onChange={(event, newValue) => {
                      // setCategory(newValue);
                      const categoryId = categories.filter(
                        (cate) => cate.name === newValue
                      );
                      setCategoryName(newValue);
                      setCategory(categoryId[0]._id);
                    }}
                    inputValue={inputCategoryValue}
                    onInputChange={(event, newInputValue) => {
                      setCategoryValue(newInputValue);
                    }}
                    id="controllable-category"
                    options={categoryOptions}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Thương hiệu" />
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
                  <p>Kho hàng</p>
                </Grid>
                <Grid item xs={12} sm={8} md={10}>
                  <TextField
                    inputProps={{
                      inputMode: "numeric",
                      type: "number",
                      pattern: "[0-9]*",
                      min: "0",
                    }}
                    label="Kho hàng"
                    required
                    value={Stock}
                    onChange={(e) => setStock(e.target.value)}
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
                  <p>Giảm giá</p>
                </Grid>
                <Grid item xs={12} sm={8} md={10}>
                  {/* <TextField
                    label="Tên giảm giá"
                    // required
                    value={discountName}
                    onChange={(e) => setDiscountName(e.target.value)}
                    variant="outlined"
                    sx={{ width: "50%", marginBottom: "1.5rem" }}
                  />
                  <br />
                  <TextField
                    label="Giới thiệu về giảm giá"
                    // required
                    value={discountDesc}
                    onChange={(e) => setDiscountDesc(e.target.value)}
                    variant="outlined"
                    sx={{ width: "50%", marginBottom: "1.5rem" }}
                  /> */}
                  <br />
                  <TextField
                    inputProps={{
                      inputMode: "numeric",
                      type: "number",
                      pattern: "[0-9]*",
                      min: "0",
                    }}
                    label="Giảm giá (%)"
                    required
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(e.target.value)}
                    variant="outlined"
                    sx={{ width: "50%", marginBottom: "1.5rem" }}
                  />
                  <br />
                  {/* <TextField
                    label="Đang giảm giá"
                    required
                    value={discountActive}
                    onChange={(e) => setDiscountActive(e.target.value)}
                    variant="outlined"
                    sx={{ width: "50%", marginBottom: "1.5rem" }}
                  /> */}
                  <FormControl sx={{ width: "50%", marginBottom: "1.5rem" }}>
                    <InputLabel id="demo-simple-select-label">
                      Đang giảm giá
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={discountActive}
                      label="Đang giảm giá"
                      onChange={(e) => setDiscountActive(e.target.value)}
                    >
                      <MenuItem value={true}>Có</MenuItem>
                      <MenuItem value={false}>Không</MenuItem>
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
                        onChange={updateProductImagesChange}
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
                          alt="old Product Preview"
                          style={{
                            maxHeight: "150px",
                            maxWidth: "150px",
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
                        alt="Product Preview"
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
                    id="createProductBtn"
                    type="submit"
                    variant="contained"
                    disabled={loading ? true : false}
                    sx={{
                      marginBottom: "50px",
                    }}
                  >
                    Chỉnh sửa thông tin sản phẩm
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
