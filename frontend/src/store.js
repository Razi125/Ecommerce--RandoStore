import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newProductReducer,
  productReducuer,
  productsReducuer,
  productDetailsReducer
} from "./reducers/productReducer";

import {
  userReducer,
} from "./reducers/userReducer";

import { cartReducer } from "./reducers/cartReducer";

const reducer = combineReducers({
    user: userReducer,
    products: productsReducuer,
    newProduct: newProductReducer,
    product: productReducuer,
    cart: cartReducer,
    productDetails: productDetailsReducer
  });

  let initialState = {
    cart: {
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems")) // Store Data in LocalStorage so writte JSON.parse using to convert data again in to Object
        : [],
    },
  };

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;