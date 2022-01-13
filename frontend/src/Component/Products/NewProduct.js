import React, { Fragment , useState , useEffect } from 'react'
import "./NewProduct.css"
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { clearError, createProduct } from "../../action/productAction";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";


const NewProduct = () => {

    const dispatch = useDispatch();
    const history = useNavigate();
    const { error, loading, success } = useSelector((state) => state.newProduct);


    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const createProductSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("price", price);
    
        images.forEach((image) => myForm.append("images", image));
    
        dispatch(createProduct(myForm));
      };

      useEffect(() => {
        if (error) {
          alert("Somting is wrong")
          dispatch(clearError());
        }
        if (success) {
          alert("Product Created Successfully");
          history("/");
          dispatch({ type: NEW_PRODUCT_RESET });
        }
      }, [dispatch, error, alert, success, history]);

      const createProductImagesChange = (e) => {
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
            onSubmit={createProductSubmitHandler}
          >
              <h1>Create Product</h1>

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
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
            >
              Create
            </Button>

          </form>
        </div>

        </Fragment>
        
    )
}

export default NewProduct
