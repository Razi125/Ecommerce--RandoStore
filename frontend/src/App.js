import React from 'react';
import './App.css';
import Header from './Component/layout/Header/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Component/Home/Home';
import Cart from "./Component/Cart/Cart"
import NewProduct from './Component/Products/NewProduct';
import ProductsList from './Component/Products/ProductsList'
import UpdateProduct from './Component/Products/UpdateProduct';
import LoginSignUp from "./Component/User/LoginSignUp";
import { useSelector } from "react-redux";
import ProtectedRoute from './Component/Route/ProtectedRoute';

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
    <Router>
      {
        isAuthenticated? <Header/> : ""
      }
    
    <Routes>
    <Route exact path="/login" element={<LoginSignUp />} />
    <Route
            exact
            path="/cart/:id"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
     <Route
            exact
            path="/addproduct"
            element={
              <ProtectedRoute>
                <NewProduct />
              </ProtectedRoute>
            }
          />    
      <Route
            exact
            path="/productslist"
            element={
              <ProtectedRoute>
                <ProductsList />
              </ProtectedRoute>
            }
          />     
          
      <Route

          exact
          path="/updateproduct/:id"
          element={
            <ProtectedRoute>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />

      <Route
        exact
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
          }
/> 
    </Routes>
    </Router>
    </>
  );
}

export default App;
