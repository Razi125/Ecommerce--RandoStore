const express = require("express");
const {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getProductDetails,
} = require("../controller/productController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts); // GET

// create update and delete products
router
  .route("/product/new")
  .post(isAuthenticatedUser,createProduct); // POST
router
  .route("/product/:id")
  .put(isAuthenticatedUser,updateProduct)
  .delete(isAuthenticatedUser,deleteProduct);

  router.route("/productdetail/:id").get(isAuthenticatedUser, getProductDetails);

module.exports = router;






