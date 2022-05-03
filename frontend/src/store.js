import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  newProductReducer,
  newReviewReducer,
  nProductsReducer,
  productDetailsReducer,
  productReducer,
  productReviewsReducer,
  productsAdminReducer,
  productsReducer,
  menProductsReducer,
  womenProductsReducer,
  reviewReducer,
} from "./reducers/productReducer";

import {
  newCategoryReducer,
  categoriesReducer,
  categoryReducer,
  categoryDetailsReducer,
} from "./reducers/categoryReducer.js";

import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";
import { cartLocalReducer, cartReducer } from "./reducers/cartReducer";

import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
  // Product
  products: productsReducer,
  productsAdmin: productsAdminReducer,
  productDetails: productDetailsReducer,
  nProducts: nProductsReducer,
  menProducts: menProductsReducer,
  womenProducts: womenProductsReducer,
  newProduct: newProductReducer,
  product: productReducer,
  productReviews: productReviewsReducer,
  // User
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  // Category
  categories: categoriesReducer,
  categoryDetails: categoryDetailsReducer,
  newCategory: newCategoryReducer,
  category: categoryReducer,
  //Review
  newReview: newReviewReducer,
  review: reviewReducer,
  //Cart
  cart: cartReducer,
  cartLocal: cartLocalReducer,
  //Order
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
});

let initialState = {
  cartLocal: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
