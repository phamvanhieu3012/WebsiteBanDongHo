import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Grid, Paper } from "@mui/material";
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
import * as React from "react";
import { Doughnut, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getAllOrders } from "../../actions/orderAction";
import { getAdminProduct } from "../../actions/productAction";
import { getAllUsers } from "../../actions/userAction";
import "./Admin.scss";
import Sidebar from "./components/Sidebar";
import formatPrice from "../../ultils/formatPrice";

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
  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.productsAdmin);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  React.useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Số tiền ban đầu", "Tổng tiền nhận được"],
    datasets: [
      {
        label: "TỔNG TIỀN",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Hết hàng", "Còn hàng"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
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
            <Paper className={classes.flexPaper}>
              <AttachMoneyIcon />
              <div>
                <p className="statistical-number">{formatPrice(totalAmount)}</p>
                <p>Tổng tiền</p>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3} className="dashboardSummaryBox2">
            <Paper className={classes.flexPaper}>
              <InventoryIcon />
              <Link to="/admin/products">
                <p className="statistical-number">
                  {products && products.length}
                </p>
                <p>Sản phẩm</p>
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.flexPaper}>
              <ShoppingBasketIcon />
              <Link to="/admin/orders">
                <p className="statistical-number">{orders && orders.length}</p>
                <p>Đơn hàng</p>
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.flexPaper}>
              <PeopleIcon />
              <Link to="/admin/users">
                <p className="statistical-number">{users && users.length}</p>
                <p>Tài khoản</p>
              </Link>
            </Paper>
          </Grid>
          <Grid xs={12} md={6} className="lineChart">
            <Line data={lineState} />
          </Grid>
          <Grid xs={12} md={6} className="doughnutChart">
            <Doughnut
              data={doughnutState}
              width={"500%"}
              height={"500%"}
              options={{ maintainAspectRatio: false }}
            />
          </Grid>
        </Grid>

        {/* <div className="lineChart"></div> */}

        {/* <div className="doughnutChart"></div> */}
      </Main>
    </Box>
  );
}
