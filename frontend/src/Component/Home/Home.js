import React,{Fragment , useEffect} from 'react'
import ProductCard from "./ProductCard";
import { clearError, getAllProduct } from "../../action/productAction";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
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
          <h1>Welcome to RandoStore</h1>
          </div>
          
          <h2 className="homeHeading">Products</h2>
          <div className="container">
            {products &&
              products.map((product) => {
                return <ProductCard product={product} />;
              })}
          </div>
        </Fragment>
      )
}

export default Home
