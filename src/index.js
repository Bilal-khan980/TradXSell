import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Aboutus from './Components/Aboutus.js';
import Manageorders from './Components/Admin/Manageorders.js';
import ManageProducts from './Components/Admin/ManageProducts';
import ProductDetails from './Components/Admin/ProductDetails.js';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';
import Contactus from './Components/Contactus.js';
import Details from './Components/Details';
import Home from './Components/Home';
import Login from './Components/Login';
import CheckProducts from './Components/MainAdmin/CheckProducts.js';
import Mensproducts from './Components/Mens_products.js';
import Navigationbar from './Components/Navigationbar';
import NewArrivals from './Components/NewArrivals.js';
import Order from './Components/Order.js';
import Register from './Components/RegisterPage.js';
import UserDashboard from './Components/UserDashboard.js';
import Userorders from './Components/Userorders.js';
import WomensProducts from './Components/WomensProducts.js';
import './index.css';
import reportWebVitals from './reportWebVitals';

import CategoryCarousel from './Components/Category.js';

import CategoryPage from './Components/CaterogyPage.js';
import CheckSellers from './Components/MainAdmin/CheckSellers.js';

import SellerDashboard from './Components/Admin/SellerDashboard.js';


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

          <Route path="/" element={<CategoryCarousel />} />
                <Route path="/category/:categoryName" element={<CategoryPage />} />

               <Route path='/admin/sellerdashboard' element={<SellerDashboard></SellerDashboard>}></Route> 


          <Route path='/userdashboard' element={<UserDashboard />} />
          <Route path='/admin/products' element={<ManageProducts />} />
          <Route path='/admin/orders' element={<Manageorders />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/order' element={<Order />} />
          <Route path='/myorders' element={<Userorders />} />
          <Route path='/admin/checkproducts' element={<CheckProducts />} />
          <Route path='/admin/checksellers' element={<CheckSellers />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
