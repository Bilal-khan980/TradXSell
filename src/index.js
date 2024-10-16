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

import RegisterAdmin from './Components/Admin/Register.js';

import ManageProductsQuality from './Components/QualityWale/ManageProductsQuality.js';

import Complains from './Components/Admin/Complains.js';

import Complaints from './Components/UserComplaints.js';

import Checkcomplaints from '../src/Components/MainAdmin/Checkcomplaints.js';

import CheckcomplaintsQuality from '../src/Components/QualityWale/Complains.js';

import Addquality from '../src/Components/MainAdmin/Addquality.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Navigationbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Aboutus />} />

          <Route path="admin/checkcomplaints" element={<Checkcomplaints />} />


          <Route path="/mens" element={<Mensproducts />} />
          <Route path="/womens" element={<WomensProducts />} />
          <Route path="/newarrivals" element={<NewArrivals />} />


          <Route path="/products/:id" element={<Details />} />
          <Route path="/adminproducts/:id" element={<ProductDetails />} />
          <Route path="/loginpage" element={<Login />} />
          <Route path="/registerpage" element={<Register />} />


          <Route path="/cart" element={<Cart />} />

          <Route path="/admin/support" element={<Complains />} />

          <Route path="/admin/support" element={<Complains />} />

          {/* <Route path='/account' element={<Admin />} /> */}
          <Route path='/customersupport' element={<Complaints />} />

          <Route path='/quality/complains' element={<CheckcomplaintsQuality />} />





          <Route path='/admin/qualityassuranceadd' element={<Addquality />} />
          

          <Route path="/" element={<CategoryCarousel />} />
                <Route path="/category/:categoryName" element={<CategoryPage />} />

               <Route path='/admin/sellerdashboard' element={<SellerDashboard></SellerDashboard>}></Route> 

               <Route path='/admin/registers' element={<RegisterAdmin></RegisterAdmin>}></Route> 


          <Route path='/userdashboard' element={<UserDashboard />} />
          <Route path='/quality/manageproducts' element={<ManageProductsQuality />} />
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
