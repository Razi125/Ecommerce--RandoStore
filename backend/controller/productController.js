const Product = require("../model/productModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");
const Errorhandler = require("../utils/errorhandler");

// Create Product 
exports.createProduct = catchAsyncErrors(async (req, res) => {
    // For Store Images 
    let images = [];
  
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
    //Images Link
    const imagesLinks = [];

    //  Images adding in Cloudinary
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
      req.body.images = imagesLinks;
    }
  
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  });

  //Get All Products
 exports.getAllProducts = catchAsyncErrors(async (req, res) => {
    const products = await Product.find();
  
    res.status(200).json({
      success: true,
      products,
    });
  });

  // Update Product 
exports.updateProduct = catchAsyncErrors(async (req, res, next ) => {
    let product = await Product.findById(req.params.id);
   
    if (!product) {
      return next(new Errorhandler("Product not found", 404));
    }
    // Image Start Here
    let images = [];
  
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    // Now Old Images deleting from Cloudinary
    if (images !== undefined) {
      //Delete images from Cloudinary
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }
    }
  
    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "product",
      });
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
      req.body.images = imagesLinks;
    }
  
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      product,
    });
  });

  // Get Product Details
 exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Errorhandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

  // Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res ) => {
    let product = await Product.findById(req.params.id);
    
    if (!product) {
      return next(new Errorhandler("Product not found", 404));
    }
  
    // Deleting Images from Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    await product.remove();
    res.status(200).json({
      success: true,
      message: "Product Delete Successfully",
    });
  });
