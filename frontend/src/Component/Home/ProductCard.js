import React, { Fragment } from 'react'
import "./ProductCard.css"
import {Link} from "react-router-dom"

const ProductCard = ({product}) => {
    return (
      <Fragment>
       <Link className="productCart" to={`/cart/${product._id}`}>
      <img src={product.images[0]&& product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <span>{`price ${product.price}`}</span>
      </Link>
      </Fragment>
    )
}

export default ProductCard
