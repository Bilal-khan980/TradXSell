import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

import logo from './Assets/logo.png';
function Navigationbar() {
    const { loggedIn, handleLogout, role } = useContext(AuthContext);

    return (
        <>
            {role !== "seller" && role!== "MainAdmin" &&  (
                // Main Navbar
                <Navbar bg="white" variant="light" expand="lg" style={{ height: 80, paddingLeft: "20px", zIndex: "1000", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                    <Navbar.Brand as={Link} to="/">
                        <img src={logo} height={50} alt="Logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/">HOME</Nav.Link>
                            <Nav.Link as={Link} to="/contact">CONTACT</Nav.Link>
                            <Nav.Link as={Link} to="/cart">CART</Nav.Link>
                            <Nav.Link as={Link} to="/myorders">ORDERS</Nav.Link>
                        </Nav>
                        
                        <Nav className="ml-auto">
                            {loggedIn ? (
                                <>
                                <button style={{border : 'white' , backgroundColor : 'white'}}>
                                    <Nav.Link as={Link} to="/userdashboard" style={{color : '#EF5B2B'}}><i class="fa-solid fa-user" style={{color : '#EF5B2B'}} ></i> ACCOUNT</Nav.Link>
                                    </button>
                                    <div style={{paddingLeft : 20}}></div>
                                    <button style={{backgroundColor : '#EF5B2B' , borderRadius : 20 , border : 'white' , width : 120}}> 
                                    <Nav.Link onClick={handleLogout} style={{color : 'white'}}>LOGOUT</Nav.Link>
                                    </button>
                                    <div style={{paddingRight : 20}}></div>
                                </>
                            ) : (
                                <>
                                <button style={{border : 'white' , backgroundColor : 'white'}}>
                                    
                                    <Nav.Link as={Link} to="/loginpage" style={{color : '#EF5B2B'}}><i class="fa-solid fa-user" style={{color : '#EF5B2B'}} ></i> SIGN IN</Nav.Link>
                                    
                                </button>

                                <div style={{paddingLeft : 20}}></div>
                                <button style={{backgroundColor : '#EF5B2B' , borderRadius : 20 , border : 'white' , width : 120}}> 
                                <Nav.Link as={Link} to="/registerpage" style={{color : 'white'}}>SIGN UP</Nav.Link>
                                
                            </button>
                            <div style={{paddingRight : 20}}>  </div>
                            </>
                                
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            )}



            {/* {role === "seller" && (
                // Admin-specific Links
                <Navbar variant="dark" expand="lg" style={{ height: 90, paddingLeft: "20px", zIndex: "1000", backgroundColor: "white" }}>
                    <Navbar.Brand as={Link} to="/">
                        <img src={logo} height={50} alt="Logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/admin/products" style={{color:'#EF5B2B'}}>MANAGE PRODUCTS</Nav.Link>
                            <Nav.Link as={Link} to="/admin/orders" style={{color:'#EF5B2B'}}>MANAGE ORDERS</Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">
                            <Nav.Link as={Link} to="/admin/sellerdashboard" style={{color:'#EF5B2B'}}>ACCOUNT</Nav.Link>
                            <button style={{backgroundColor : '#EF5B2B' , borderRadius : 20 , border : 'white' , width : 120}}> 
                            <Nav.Link style={{color : 'white'}} onClick={handleLogout} >LOGOUT</Nav.Link>
                            </button>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            )} */}

            {role === "MainAdmin" && (
                // Admin-specific Links
                <Navbar variant="dark" expand="lg" style={{ height: 90, paddingLeft: "20px", zIndex: "1000", backgroundColor: "white" }}>
                    <Navbar.Brand as={Link} to="/">
                        <img src={logo} height={50} alt="Logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link style={{color: '#ef5b2b'}} as={Link} to="/admin/checksellers">CHECK SELLERS</Nav.Link>
                        <Nav.Link style={{color: '#ef5b2b'}} as={Link} to="/admin/checkproducts">CHECK PRODUCTS</Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">
                            <Nav.Link  style={{color: '#ef5b2b' , paddingLeft : 1100}} as={Link} to="/user">ACCOUNT</Nav.Link>
                            <button style={{backgroundColor : '#EF5B2B' , borderRadius : 20 , border : 'white' , width : 120}}> 
                            <Nav.Link onClick={handleLogout}>LOGOUT</Nav.Link>
                            </button>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            )}
        </>
    );
}

export default Navigationbar;
