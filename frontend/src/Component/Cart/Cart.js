
import React,{Fragment , useEffect} from 'react'
import ItemAddtoCart from "./ItemAddtoCart";
import { clearError, getAllProduct } from "../../action/productAction";
import { useSelector, useDispatch } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();
  const { error, products } = useSelector((state) => state.products);
  
  useEffect(() => {
    if (error) {
      alert("Somting is wrong")
      dispatch(clearError());
    }
    dispatch(getAllProduct());
  }, [dispatch, error, alert]);

    return (
        <Fragment>
          <div className="banner">
            <h1>Items Add to Card</h1>
          </div>
          <div className="container">
            {products &&
              products.map((product) => {
                return <ItemAddtoCart product={product} />;
              })}
          </div>
        </Fragment>
      )
}

export default Cart