import React, { Fragment , useState , useEffect } from 'react'
import "./NewProduct.css"
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  updateProduct,
  getProductDetails,
} from "../../action/productAction";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { id } = useParams();
  const { product } = useSelector((state) => state.productDetails);
  console.log("Product is" , product);

  const {
    error,
    isUpdated,
  } = useSelector((state) => state.product);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("price", price);
    
        images.forEach((image) => myForm.append("images", image));
    
         dispatch(updateProduct(id , myForm));
      };

      useEffect(() => {

         // If ID does not match then go on Details apage
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setPrice(product.price);
      setOldImages(product.images);
    }
        
        if (error) {
          alert("Somthing is Wrong");
          dispatch(clearError());
        }
    
        if (isUpdated) {
          alert("Product Updated Successfully");
          history("/productslist");
          dispatch({ type: UPDATE_PRODUCT_RESET });
        }
      }, [dispatch, error, alert, history, isUpdated, id]);

      const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);
    
        files.forEach((file) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImagesPreview((old) => [...old, reader.result]);
              setImages((old) => [...old, reader.result]);
            }
          };
          reader.readAsDataURL(file);
        });
      };

    return (
        <Fragment>
        <div className="newProductContainer">
        <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
              <h1>Update Product</h1>

              <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>
            {}

            <Button
              id="createProductBtn"
              type="submit"
            >
              update 
            </Button>
          </form>
        </div>
        </Fragment>
    )
}

export default UpdateProduct
