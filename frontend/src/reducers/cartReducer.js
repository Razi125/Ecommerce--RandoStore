import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
  } from "../constants/cartConstants";
  
  export const cartReducer = (
    state = { cartItems: [] },
    action
  ) => {
    switch (action.type) {
      case ADD_TO_CART:
        const item = action.payload;
  
        const isItemExist = state.cartItems.find((i) => {
          /** this code writting to compare Product which is already present in Array and does not add same product but add if new*/
          return i.product === item.product;
        });
  
        if (isItemExist) {
          return {
            ...state,
            cartItems: state.cartItems.map((i) => {
              return i.product === item.product ? item : i;
            }),
          };
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, item],
          };
        }
  
      case REMOVE_CART_ITEM:
        return {
          ...state,
          cartItems: state.cartItems.filter((i) => {
            return i.product !== action.payload;
          }),
        };
    
      default:
        return state;
    }
  };
  