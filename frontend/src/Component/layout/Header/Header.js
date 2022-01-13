import React, { Fragment } from 'react'
import './Header.css'
import {Link} from "react-router-dom"
import {  logout } from "../../../action/userAction";
import {  useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutUser = () => {
    dispatch(logout());
    navigate("/login")
  };
    return (
        <Fragment>
        <div className='header'>
        <Link to="/">
        Rando Store
      </Link>
      
      <div className="headerNav">
        <div className="headerOption">
          <span className="headerOptionLineOne">
          <Link to="/productslist">
          Products List
            </Link>
              </span>
        </div>
        <div className="headerOption">
          <span className="headerOptionLineOne">
            <Link to="/addproduct">
            Add New Products
            </Link>      
              </span>
          
        </div>
        <div className="headerOption">
          <span className="headerOptionLineOne">
            <Link to="" onClick={logoutUser}>
            LogOut
            </Link>      
              </span>
          
        </div>

      </div>          
        </div>
        </Fragment>
    )
}

export default Header
