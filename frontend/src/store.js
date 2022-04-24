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

const reducer = combineReducers({
  // Product
  products: productsReducer,
  productsAdmin: productsAdminReducer,
  productDetails: productDetailsReducer,
  nProducts: nProductsReducer,
  menProducts: menProductsReducer,
  womenProducts: womenProductsReducer,
  // User
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  // Category
  categories: categoriesReducer,
  categoryDetails: categoryDetailsReducer,
  //Review
  newReview: newReviewReducer,
  review: reviewReducer,
});

let initialState = {
  // cart: {
  //   cartItems: localStorage.getItem("cartItems")
  //     ? JSON.parse(localStorage.getItem("cartItems"))
  //     : [],
  //   shippingInfo: localStorage.getItem("shippingInfo")
  //     ? JSON.parse(localStorage.getItem("shippingInfo"))
  //     : {},
  // },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
