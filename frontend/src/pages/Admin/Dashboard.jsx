import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import InventoryIcon from "@mui/icons-material/Inventory";
import FeedIcon from "@mui/icons-material/Feed";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EditIcon from "@mui/icons-material/Edit";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CancelIcon from "@mui/icons-material/Cancel";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
import { Doughnut, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  getAllOrders,
  getAllOrdersStatistical,
  getAllOrdersStatus,
} from "../../actions/orderAction";
import { getAdminProduct, getTopProducts } from "../../actions/productAction";
import { getAllUsers } from "../../actions/userAction";
import "./Admin.scss";
import Sidebar from "./components/Sidebar";
import formatPrice from "../../ultils/formatPrice";
import MetaData from "../../components/Layout/MetaData";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import "moment/locale/vi";
import { getAllBlogs } from "../../actions/blogAction";
moment.locale("vi");

const drawerWidth = 240;

const useStyles = makeStyles({
  root: {
    fontSize: "100%",
  },
  flexPaper: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    padding: "10px 20px",
  },
  flexBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "2rem",
    paddingBottom: "2rem",
    "&:first-child h6": {
      color: "red",
    },
  },
  orderBox: {
    textAlign: "center",
    padding: "2rem",
    "& h3": {
      marginTop: "0.7rem",
    },
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

export default function Dashboard() {
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
  const dispatch = useDispatch();

  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);

  const { user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.productsAdmin);
  const { products: topProducts } = useSelector((state) => state.topProducts);

  const { orders } = useSelector((state) => state.allOrders);

  const { ordersProssesing, ordersShipped, ordersDelivered, ordersCancel } =
    useSelector((state) => state.allOrdersStatus);

  const { blogs } = useSelector((state) => state.blogs);

  const { orders: ordersStatistical } = useSelector(
    (state) => state.allOrdersStatistical
  );

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;
  let lowStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
      if (item.Stock <= 5) {
        lowStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
    dispatch(getAllBlogs());
    dispatch(getTopProducts());
    dispatch(getAllOrdersStatus());
  }, [dispatch]);

  let totalAmount = 0;
  ordersStatistical &&
    ordersStatistical.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const [lineState, setLineState] = useState({
    labels: ["Số tiền ban đầu", "Tổng tiền nhận được"],
    datasets: [
      {
        label: "TỔNG TIỀN",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  });

  useEffect(() => {
    setLineState({
      labels: ["Số tiền ban đầu", "Tổng tiền nhận được"],
      datasets: [
        {
          label: "TỔNG TIỀN",
          backgroundColor: ["tomato"],
          hoverBackgroundColor: ["rgb(197, 72, 49)"],
          data: [0, totalAmount],
        },
      ],
    });
  }, [totalAmount]);

  const handleStatistical = () => {
    if (dateStart !== null && dateEnd !== null) {
      // let date = moment(datePicker).format("YYYY-MM-DD[T]HH:mm:ss");
      dispatch(getAllOrdersStatistical(dateStart, dateEnd));
      // totalAmount = 0;
      // ordersStatistical &&
      //   ordersStatistical.forEach((item) => {
      //     totalAmount += item.totalPrice;
      //   });

      // console.log(totalAmount);
      setLineState({
        labels: ["Số tiền ban đầu", "Tổng tiền nhận được"],
        datasets: [
          {
            label: "TỔNG TIỀN",
            backgroundColor: ["tomato"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            data: [0, totalAmount],
          },
        ],
      });
    }
  };

  const doughnutState = {
    labels: ["Hết hàng", "Còn hàng", "Sắp hết hàng"],
    datasets: [
      {
        backgroundColor: [
          "rgb(255, 61, 87)",
          "rgb(25, 118, 210)",
          "rgb(255, 175, 56)",
        ],
        hoverBackgroundColor: [
          "rgba(255, 61, 87, 0.7)",
          "rgba(25, 118, 210, 0.7)",
          "rgb(255, 175, 56, 0.7)",
        ],
        data: [outOfStock, products.length - outOfStock, lowStock],
      },
    ],
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let history = useHistory();

  const handleHistory = (his) => {
    history.push(`/admin/${his}`);
  };

  return (
    <Box sx={{ display: "flex" }} className={classes.root}>
      <MetaData title="Admin - Dashboard" />;
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
        <Typography variant="h3">Dashboard</Typography>

        <Grid container spacing={2} className="dashboardSummary">
          <Grid item xs={12} sm={6} md={3}>
            {/* <Paper
              className={classes.flexPaper}
              style={{ borderLeft: "5px solid red" }}
            >
              <AttachMoneyIcon />
              <div>
                <p className="statistical-number">{formatPrice(totalAmount)}</p>
                <p>Tổng tiền</p>
              </div>
            </Paper> */}
            <Paper
              className={classes.flexPaper}
              style={{ borderLeft: "5px solid yellow" }}
            >
              <InventoryIcon />
              <Link to="/admin/products">
                <p className="statistical-number">
                  {products && products.length}
                </p>
                <p>Sản phẩm</p>
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3} className="dashboardSummaryBox2">
            <Paper
              className={classes.flexPaper}
              style={{ borderLeft: "5px solid red" }}
            >
              <FeedIcon />
              {/* <div>
                <p className="statistical-number">{blogs && blogs.length}</p>
                <p>Tin tức</p>
              </div> */}
              <Link to="/admin/blogs">
                <p className="statistical-number">{blogs && blogs.length}</p>
                <p>Tin tức</p>
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              className={classes.flexPaper}
              style={{ borderLeft: "5px solid blue" }}
            >
              <ShoppingBasketIcon />
              <Link to="/admin/orders">
                <p className="statistical-number">{orders && orders.length}</p>
                <p>Đơn hàng</p>
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              className={classes.flexPaper}
              style={{ borderLeft: "5px solid green" }}
            >
              <PeopleIcon />
              <Link to="/admin/users">
                <p className="statistical-number">{users && users.length}</p>
                <p>Tài khoản</p>
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} className="lineChart">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2rem",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Chọn ngày bắt đầu"
                  value={dateStart}
                  onChange={(newValue) => {
                    setDateStart(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Chọn ngày kết thúc"
                  value={dateEnd}
                  onChange={(newValue) => {
                    setDateEnd(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <Button
                onClick={handleStatistical}
                variant="contained"
                sx={{
                  fontSize: "1.3rem",
                  padding: "10px 20px",
                }}
              >
                Thống kê
              </Button>
            </div>
            <Line data={lineState} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Paper
                  className={classes.flexPaper}
                  style={{ borderLeft: "5px solid #541690" }}
                >
                  <AttachMoneyIcon />
                  <div>
                    <p className="statistical-number">
                      {formatPrice(totalAmount)}
                    </p>
                    <p>Tổng tiền nhận được</p>
                  </div>
                </Paper>
              </Grid>
              {/* <Grid item xs={6}>
                <Paper
                  className={classes.flexPaper}
                  style={{ borderLeft: "5px solid #FF8D29" }}
                >
                  <AttachMoneyIcon />
                  <div>
                    <p className="statistical-number">
                      {formatPrice(totalAmount)}
                    </p>
                    <p>Tổng tiền</p>
                  </div>
                </Paper>
              </Grid> */}
            </Grid>
            {/* <Paper
              className={classes.flexPaper}
              style={{ borderLeft: "5px solid red" }}
            >
              <AttachMoneyIcon />
              <div>
                <p className="statistical-number">{formatPrice(totalAmount)}</p>
                <p>Tổng tiền</p>
              </div>
            </Paper> */}
          </Grid>
          <Grid item xs={12} md={6} className="doughnutChart" sx={{ mt: 5 }}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <Paper elevation={3} className={classes.orderBox}>
                  <CardGiftcardIcon fontSize="large" />
                  <Typography variant="h3">
                    {ordersProssesing && ordersProssesing.length}
                  </Typography>
                  <p
                    style={{
                      textTransform: "uppercase",
                    }}
                  >
                    Đang xử lý
                  </p>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper elevation={3} className={classes.orderBox}>
                  <LocalShippingIcon fontSize="large" />
                  <Typography variant="h3">
                    {ordersShipped && ordersShipped.length}
                  </Typography>
                  <p
                    style={{
                      textTransform: "uppercase",
                    }}
                  >
                    Đang vận chuyển
                  </p>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper elevation={3} className={classes.orderBox}>
                  <AssignmentTurnedInIcon fontSize="large" />
                  <Typography variant="h3">
                    {ordersDelivered && ordersDelivered.length}
                  </Typography>
                  <p
                    style={{
                      textTransform: "uppercase",
                    }}
                  >
                    Đã giao hàng
                  </p>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper elevation={3} className={classes.orderBox}>
                  <CancelIcon fontSize="large" />
                  <Typography variant="h3">
                    {ordersCancel && ordersCancel.length}
                  </Typography>
                  <p
                    style={{
                      textTransform: "uppercase",
                    }}
                  >
                    Huỷ đơn hàng
                  </p>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          className="dashboardSummary"
          sx={{
            mt: 2,
          }}
        >
          <Grid item xs={12} sm={6}>
            <Paper elevation={3}>
              <Box
                sx={{
                  pt: 1,
                  ml: 1,
                  mb: 1,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    mt: 2,
                    ml: 2,
                  }}
                >
                  Sản phẩm bán chạy
                </Typography>
              </Box>
              <Box>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Tên sản phẩm</TableCell>
                        <TableCell>Hình ảnh</TableCell>
                        <TableCell>Đã bán</TableCell>
                        <TableCell>Kho hàng</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {topProducts &&
                        topProducts.map((item) => (
                          <TableRow
                            key={item._id}
                            sx={{
                              "& td, & th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {item.name}
                            </TableCell>
                            <TableCell>
                              <Avatar
                                src={item.images[0].url}
                                alt={item.name}
                              />
                              {/* <img src={item.images[0].url} alt={item.name} /> */}
                            </TableCell>
                            <TableCell>{item.sold}</TableCell>
                            <TableCell>{item.Stock}</TableCell>
                            <TableCell>
                              <Link
                                to={`/admin/product/${item._id}`}
                                sx={{ color: "rgb(25, 118, 210)" }}
                              >
                                <EditIcon
                                  fontSize="large"
                                  sx={{ color: "rgb(25, 118, 210)" }}
                                />
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Paper>
          </Grid>
          <Grid item sx={12} sm={6}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
              }}
            >
              <Grid container spacing={2} className="tableInventory">
                <Grid item sx={12} sm={7}>
                  <Box className={classes.flexBox}>
                    <h6>Sản phẩm hết hàng</h6>
                    <h6>{outOfStock}</h6>
                  </Box>
                  <Box className={classes.flexBox}>
                    <h6>Sản phẩm sắp hết hàng</h6>
                    <h6>{lowStock}</h6>
                  </Box>
                  <Box className={classes.flexBox}>
                    <h6>Sản phẩm có sẵn</h6>
                    <h6>{products && products.length - outOfStock}</h6>
                  </Box>
                </Grid>
                <Grid item sx={12} sm={5}>
                  <Doughnut
                    data={doughnutState}
                    width={"200%"}
                    height={"200%"}
                    options={{ maintainAspectRatio: false }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* <div className="lineChart"></div> */}

        {/* <div className="doughnutChart"></div> */}
      </Main>
    </Box>
  );
}
