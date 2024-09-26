import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useContext } from 'react';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

function Navigationbar() {
    const { loggedIn, handleLogout, role } = useContext(AuthContext);

    return (
        <>
            {role !== "Admin" && (
                // Main Navbar
                <Navbar bg="white" variant="light" expand="lg" style={{ height: 80, paddingLeft: "20px", zIndex: "1000", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                    <Navbar.Brand as={Link} to="/">
                        <img src="Images/navbar_logo.png" height={50} alt="Logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/">HOME</Nav.Link>
                            <Nav.Link as={Link} to="/contact">CONTACT</Nav.Link>
                            <Nav.Link as={Link} to="/cart">CART</Nav.Link>
                            <Nav.Link as={Link} to="/myorders">ORDERS</Nav.Link>
                        </Nav>
                        <Form className="d-flex w-50 mx-auto" style={{ position: "relative" }}>
                            <FormControl
                                type="search"
                                placeholder="What are you looking for?"
                                className="mr-sm-2"
                                style={{ borderRadius: "50px", paddingLeft: "40px", width: "100%" }}
                            />
                            <Button variant="outline-none" style={{ position: "absolute", top: "1px" }}>
                                <i className="fas fa-search"></i>
                            </Button>
                        </Form>
                        <Nav className="ml-auto">
                            {loggedIn ? (
                                <>
                                    <Nav.Link as={Link} to="/userdashboard">ACCOUNT</Nav.Link>
                                    <Nav.Link onClick={handleLogout}>LOGOUT</Nav.Link>
                                </>
                            ) : (
                                <Nav.Link as={Link} to="/loginpage">LOGIN/REGISTER</Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            )}

            {role === "Admin" && (
                // Admin-specific Links
                <Navbar variant="dark" expand="lg" style={{ height: 90, paddingLeft: "20px", zIndex: "1000", backgroundColor: "#EF5B2B" }}>
                    <Navbar.Brand as={Link} to="/">
                        <img src="Images/navbar_logo.png" height={50} alt="Logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/admin/products">MANAGE PRODUCTS</Nav.Link>
                            <Nav.Link as={Link} to="/admin/orders">MANAGE ORDERS</Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">
                            <Nav.Link as={Link} to="/user">ACCOUNT</Nav.Link>
                            <Nav.Link onClick={handleLogout}>LOGOUT</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            )}
        </>
    );
}

export default Navigationbar;
