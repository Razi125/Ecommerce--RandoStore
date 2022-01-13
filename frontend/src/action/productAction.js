import axios from "axios";
import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,

    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    

    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,

    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    CLEAR_ERRORS

  } from "../constants/productConstants";

  // Get All Products
export const getAllProduct = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });
      const { data } = await axios.get("/api/v1/products");
  
      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
          });
    }
  };
  

  // Create Product
export const createProduct = (productData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_PRODUCT_REQUEST });
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.post(
        "/api/v1/product/new",
        productData,
        config
      );
  
      dispatch({ type: NEW_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        console.log("Product does not Add" , error);
    }
  };

  // Delete Product
export const deleteProduct = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_PRODUCT_REQUEST });
      const { data } = await axios.delete(`/api/v1/product/${id}`);
      dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.success });
    } catch (error) {
        console.log("Product does not Deleted" , error);
    }
  };

  // Updated Product
export const updateProduct = (id, productData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.put(
        `/api/v1/product/${id}`,
        productData,
        config
      );
  
      dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data.success });
    } catch (error) {
        console.log("Product does not Updated" , error);
    }
  };

  export const clearError = () => async (dispatch) => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  // Get Product Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/productdetail/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};