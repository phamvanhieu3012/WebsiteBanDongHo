import AddIcon from "@mui/icons-material/Add";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Avatar, Button } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { deleteCategory, getAllCategories } from "../../actions/categoryAction";
import { clearErrors } from "../../actions/productAction";
import { DELETE_CATEGORY_RESET } from "../../constants/categoryConstants";
import "./Admin.scss";
import Sidebar from "./components/Sidebar";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

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

export default function ProductList() {
  const { user } = useSelector((state) => state.user);
  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const { loading, error, categories } = useSelector(
    (state) => state.categories
  );

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.category
  );

  let history = useHistory();

  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleHistory = (his) => {
    history.push(`/admin/${his}`);
  };

  const deleteCategoryHandler = (id) => {
    dispatch(deleteCategory(id));
  };

  React.useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert(deleteError);
      dispatch(clearErrors);
    }

    if (isDeleted) {
      alert("Xóa danh mục thành công");
      history.push("/admin/categories");
      dispatch({ type: DELETE_CATEGORY_RESET });
    }

    console.log("Hêlo");

    dispatch(getAllCategories());
  }, [dispatch, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Tên danh mục",
      minWidth: 280,
      flex: 1,
    },
    {
      field: "desc",
      headerName: "Giới thiệu",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <React.Fragment>
            <Link to={`/admin/category/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() => {
                confirmAlert({
                  title: "Xác nhận",
                  message: "Bạn có muốn xóa danh mục này?",
                  buttons: [
                    {
                      label: "Có",
                      onClick: () => {
                        deleteCategoryHandler(params.getValue(params.id, "id"));
                      },
                    },
                    {
                      label: "Không",
                      onClick: () => {
                        return;
                      },
                    },
                  ],
                });
              }}
            >
              <DeleteIcon />
            </Button>
          </React.Fragment>
        );
      },
    },
  ];

  const rows = [];

  categories &&
    categories.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        desc: item.description,
      });
    });

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
        <h3 id="productListHeading">Tất cả danh mục</h3>
        <div dir="rtl" className="addButton">
          <span>Thêm danh mục</span>
          <IconButton href="/admin/newCategory">
            <AddIcon />
          </IconButton>
        </div>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          className="productListTable"
          autoHeight
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Main>
    </Box>
  );
}
