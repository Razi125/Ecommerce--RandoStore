import React, { Fragment , useEffect } from "react";
import "./ProductsList.css";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { clearError, getAllProduct , deleteProduct } from "../../action/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";


const ProductsList = () => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useNavigate();
  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 350, flex: 1 },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/updateproduct/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        price: item.price,
      });
    });

    useEffect(() => {
      if (error) {
        alert("Product does not found")
        dispatch(clearError());
      }
      if (deleteError) {
        alert("Product does not deleted")
        dispatch(clearError());
      }
      if (isDeleted) {
        alert("Product Deleted Successfully")
        history("/");
        dispatch({ type: DELETE_PRODUCT_RESET }); 
      }
  
      dispatch(getAllProduct());
    }, [alert, error, dispatch, deleteError, isDeleted, history]);


  return (
    <Fragment>
      <div className="dashboard">
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
          <DataGrid
            columns={columns}
            rows={rows}
            pageSize={5}
            disableSelectionOnClick
            autoHeight
            className="productListTable"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductsList;

