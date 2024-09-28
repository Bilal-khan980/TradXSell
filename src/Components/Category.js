import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css'; // Import FontAwesome

// Sample data for categories
const categories = [
    { name: 'Fashion Accessories', icon: 'fa-hat-cowboy' },
    { name: 'Consumer Electronics', icon: 'fa-headphones' },
    { name: 'Home & Garden', icon: 'fa-mug-hot' },
    { name: 'Packaging & Printing', icon: 'fa-box-open' },
    { name: 'Jewelry, Eyewear', icon: 'fa-gem' },
    { name: 'Vehicle Parts & Accessories', icon: 'fa-car' },
    { name: 'Measurement & Analysis', icon: 'fa-ruler' },
    { name: 'Apparel & Accessories', icon: 'fa-tshirt' },
    { name: 'Sports & Entertainment', icon: 'fa-dumbbell' },
    { name: 'Commercial Equipment', icon: 'fa-briefcase' },
    { name: 'Mother, Kids & Toys', icon: 'fa-baby' },
    { name: 'Shoes & Accessories', icon: 'fa-shoe-prints' },
];

function Category() {
    return (
        <>
        <div className="category-section" style={{ backgroundColor: "#fff", padding: "50px 0" }}>
            <div className="container">
                <div className="row justify-content-center">
                    {categories.map((category, index) => (
                        <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4" key={index}>
                            <Link to={`/category/${category.name}`} className="category-item" style={{ textDecoration: "none", color: "#333" }}>
                                <div
                                    className="category-icon-wrapper"
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        borderRadius: "50%",
                                        backgroundColor: "#fff",
                                        border: "2px solid #EF5B2B", // orange border
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        margin: "0 auto",
                                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                    }}
                                >
                                    <i
                                        className={`fa ${category.icon}`}
                                        style={{ fontSize: "32px", color: "#EF5B2B" }}
                                    ></i>
                                </div>
                                <p style={{ textAlign: "center", marginTop: "10px", color: "#333", fontWeight: "bold" }}>
                                    {category.name}
                                </p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
}

export default Category;
