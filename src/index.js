import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Details from './Components/Details';
import Login from './Components/Login';
import { AuthProvider } from './AuthContext';
import Navigationbar from './Components/Navigationbar';
import Cart from './Components/Cart';
import ManageProducts from './Components/Admin/ManageProducts';
import Checkout from './Components/Checkout';
import Order from './Components/Order.js'
import Userorders from './Components/Userorders.js'
import Aboutus from './Components/Aboutus.js'
import Contactus from './Components/Contactus.js'
import Manageorders from './Components/Admin/Manageorders.js';
import ProductDetails from './Components/Admin/ProductDetails.js';
import UserDashboard from './Components/UserDashboard.js'
import Mensproducts from './Components/Mens_products.js';
import WomensProducts from './Components/WomensProducts.js';
import NewArrivals from './Components/NewArrivals.js';
import CheckProducts from './Components/MainAdmin/CheckProducts.js';
import Register from './Components/RegisterPage.js';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Navigationbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/contact" element={<Contactus />} />


          <Route path="/mens" element={<Mensproducts />} />
          <Route path="/womens" element={<WomensProducts />} />
          <Route path="/newarrivals" element={<NewArrivals />} />


          <Route path="/products/:id" element={<Details />} />
          <Route path="/adminproducts/:id" element={<ProductDetails />} />
          <Route path="/loginpage" element={<Login />} />
          <Route path="/registerpage" element={<Register />} />


          <Route path="/cart" element={<Cart />} />
          {/* <Route path='/account' element={<Admin />} /> */}
          <Route path='/admindashboard' element={<UserDashboard />} />


          <Route path='/userdashboard' element={<UserDashboard />} />
          <Route path='/admin/products' element={<ManageProducts />} />
          <Route path='/admin/orders' element={<Manageorders />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/order' element={<Order />} />
          <Route path='/myorders' element={<Userorders />} />
          <Route path='/admin/checkproducts' element={<CheckProducts />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
