import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
  } from "../constants/cartConstants";
  import axios from "axios";
  
  // ADD TO CART
  export const addItemsToCart = (id, Price) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        Price,
      },
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };
  
  // REMOVE TO CART  
  export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };
  