import emailjs from "@emailjs/browser";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Button, Chip, Grid, TextField } from "@mui/material";
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
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getContactDetails, updateContact } from "../../actions/contactAction";
import { clearErrors } from "../../actions/productAction";
import Loader from "../../components/Common/Loader";
import MetaData from "../../components/Layout/MetaData";
import { UPDATE_CONTACT_RESET } from "../../constants/contactConstants";
import "./Admin.scss";
import Sidebar from "./components/Sidebar";

const drawerWidth = 240;

const useStyles = makeStyles({
  root: {
    fontSize: "100%",
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

export default function ReplyContact() {
  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const { user: userNow } = useSelector((state) => state.user);
  const { contact, error, loading } = useSelector(
    (state) => state.contactDetails
  );
  const {
    error: updateError,
    isUpdated,
    loading: updateLoading,
  } = useSelector((state) => state.contact);

  const [reply, setReply] = useState("");
  const form = useRef();

  let history = useHistory();
  const dispatch = useDispatch();
  let match = useParams();

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
      alert(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert("Trả lời thành công");
      dispatch({ type: UPDATE_CONTACT_RESET });
    }

    dispatch(getContactDetails(match.id));
  }, [dispatch, error, match.id, isUpdated, updateError]);

  const updateContactSubmitHandler = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_pvsg1up",
        "template_njdoplr",
        form.current,
        "a0yKVEz_2_0NaPTQu"
      )
      .then(
        (result) => {
          const myForm = new FormData();

          myForm.set("reply", reply);
          myForm.set("status", true);

          dispatch(updateContact(match.id, myForm));
          setReply("");
        },
        (error) => {
          alert(error.text);
        }
      );
  };

  return (
    <Box sx={{ display: "flex" }} className={classes.root}>
      <MetaData title="Admin - Trả lời email" />;
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
            <span>Hi, {userNow.name}</span>
            <Avatar alt={userNow.name} src={userNow.avatar.url} />
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
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <h3 id="productListHeading">Trả lời liên hệ</h3>
        {loading ? (
          <Loader />
        ) : (
          <div
            className="confirmOrderPage"
            // style={{
            //   display: order.orderStatus === "Delivered" ? "block" : "grid",
            // }}
          >
            <div>
              <Grid container spacing={2} className="confirmshippingArea">
                <Grid item xs={12} md={6}>
                  <Typography variant="h4">Địa chỉ giao hàng</Typography>
                  <div className="orderDetail">
                    <div>
                      <p>Họ tên khách hàng:</p>
                      <span>{contact.name}</span>
                    </div>
                    <div>
                      <p>Email:</p>
                      <span>{contact.email}</span>
                    </div>
                    <div>
                      <p>Tiêu đề:</p>
                      <span>{contact.title}</span>
                    </div>
                    <div>
                      <p>Nội dung:</p>
                      <span>{contact.detail}</span>
                    </div>
                    <div>
                      <p>Trạng thái:</p>
                      <span>
                        {contact.status === false ? (
                          <Chip label="Chưa trả lời" color="error" />
                        ) : (
                          <Chip label="Đã trả lời" color="success" />
                        )}
                      </span>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className="confirmCartItems">
                    <Typography variant="h4">Trả lời khách hàng:</Typography>
                    <div className="confirmCartItemsContainer"></div>
                  </div>
                  <div>
                    <form
                      className="updateOrderForm"
                      ref={form}
                      onSubmit={updateContactSubmitHandler}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <p style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>
                          Họ tên
                        </p>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <TextField
                          type="text"
                          disabled
                          variant="standard"
                          value={userNow.name}
                          // onChange={(e) => setReply(e.target.value)}
                          style={{ width: "60%", outline: "none" }}
                          name="from_name"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <p style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>
                          Họ tên khách hàng
                        </p>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <TextField
                          type="text"
                          disabled
                          variant="standard"
                          value={contact.name}
                          // onChange={(e) => setReply(e.target.value)}
                          style={{ width: "60%", outline: "none" }}
                          name="user_name"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <p style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>
                          Trả lời
                        </p>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <textarea
                          type="text"
                          placeholder="Trả lời"
                          required
                          rows="7"
                          value={reply}
                          onChange={(e) => setReply(e.target.value)}
                          style={{ width: "60%", outline: "none" }}
                          name="message"
                        />
                      </Grid>

                      <Button
                        id="createProductBtn"
                        type="submit"
                        variant="contained"
                        sx={{
                          marginTop: "10px",
                          fontSize: "1.5rem",
                          width: "20%",
                        }}
                        disabled={updateLoading ? true : false}
                      >
                        Trả lời
                      </Button>
                    </form>
                  </div>
                </Grid>
              </Grid>
            </div>
            {/*  */}
          </div>
        )}
      </Main>
    </Box>
  );
}
