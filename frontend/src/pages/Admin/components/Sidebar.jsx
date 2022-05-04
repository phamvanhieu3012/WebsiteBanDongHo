import CategoryIcon from "@mui/icons-material/Category";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ReviewsIcon from "@mui/icons-material/Reviews";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";

function Sidebar(props) {
  // console.log("props", props);
  const { handleHistory } = props;
  // console.log(handleHistory);

  return (
    <List>
      <ListItem button onClick={() => handleHistory("dashboard")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Trang chủ" />
      </ListItem>
      <ListItem button onClick={() => handleHistory("categories")}>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Danh mục" />
      </ListItem>
      <ListItem button onClick={() => handleHistory("products")}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Sản phẩm" />
      </ListItem>
      <ListItem button onClick={() => handleHistory("users")}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Tài khoản" />
      </ListItem>
      <ListItem button onClick={() => handleHistory("reviews")}>
        <ListItemIcon>
          <ReviewsIcon />
        </ListItemIcon>
        <ListItemText primary="Đánh giá" />
      </ListItem>
      <ListItem button onClick={() => handleHistory("orders")}>
        <ListItemIcon>
          <ShoppingBagIcon />
        </ListItemIcon>
        <ListItemText primary="Đơn hàng" />
      </ListItem>
      <ListItem button onClick={() => handleHistory("contacts")}>
        <ListItemIcon>
          <ContactMailIcon />
        </ListItemIcon>
        <ListItemText primary="Liên hệ" />
      </ListItem>
    </List>
  );
}

export default Sidebar;
