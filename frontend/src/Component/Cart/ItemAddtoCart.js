import React, { Fragment } from 'react'
import "./ItemAddtoCart.css"
import {Link} from "react-router-dom"

const ItemAddtoCart = ({product}) => {
    return (
      <Fragment>
      <div className="productCart">
      <img src={product.images[0]&& product.images[0].url} alt={product.name} />
      <button>Add To Cart</button>
      </div>
      </Fragment>
    )
}

export default ItemAddtoCart
