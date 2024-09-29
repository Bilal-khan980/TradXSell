import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'; // Import FontAwesome
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Sample data for categories
const categories = [
    { name: 'Jewelry, Eyewear', icon: 'fa-gem' },
    { name: 'Vehicle Parts & Accessories', icon: 'fa-car' },
    { name: 'Industrial Machinery', icon: 'fa-industry' },
    { name: 'Luggage, Bags & Cases', icon: 'fa-suitcase' },
    { name: 'Construction & Real Estate', icon: 'fa-building' },
    { name: 'Personal Care & Household', icon: 'fa-bath' },
    { name: 'Lights & Lighting', icon: 'fa-lightbulb' },
    { name: 'Renewable Energy', icon: 'fa-solar-panel' },
    { name: 'Shoes & Accessories', icon: 'fa-shoe-prints' },
    { name: 'Furniture', icon: 'fa-couch' },
    { name: 'Tools & Hardware', icon: 'fa-wrench' },
    { name: 'Home Appliances', icon: 'fa-tv' },
    { name: 'Vehicles & Transportation', icon: 'fa-truck' },
    { name: 'Vehicle Accessories', icon: 'fa-tools' },
    { name: 'Gifts & Crafts', icon: 'fa-gift' },
    { name: 'Health Care', icon: 'fa-heartbeat' },
];

function CategoryCarousel() {
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(0);

    // Chunk categories array into groups of itemsPerPage
    const chunkedCategories = [];
    for (let i = 0; i < categories.length; i += itemsPerPage) {
        chunkedCategories.push(categories.slice(i, i + itemsPerPage));
    }

    // Handle previous page navigation
    const handlePrev = () => {
        setCurrentPage((prevPage) => {
            // Go to last page if at first page
            if (prevPage === 0) {
                return chunkedCategories.length - 1;
            }
            return prevPage - 1; // Otherwise go to the previous page
        });
    };

    // Handle next page navigation
    const handleNext = () => {
        setCurrentPage((prevPage) => {
            if (prevPage < chunkedCategories.length - 1) {
                return prevPage + 1; // Go to the next page
            }
            return prevPage; // Prevent going above the last page
        });
    };

    return (
        <div className="category-section" style={{ backgroundColor: "#fff", padding: "50px 0", position: 'relative' }}>
            <style>{`
                .category-icon-wrapper {
                    transition: background-color 0.3s ease, transform 0.3s ease;
                    overflow: hidden; /* Prevent overflow */
                }

                .category-icon-wrapper:hover {
                    background-color: #EF5B2B;
                    transform: scale(0.9); /* Scale effect */
                }

                .category-icon {
                    transition: color 0.3s ease;
                }

                .category-icon:hover {
                    color: #fff; /* Change icon color on hover */
                }

                .category-name {
                    text-align: center;
                    margin-top: 10px;
                    color: #333;
                    font-weight: bold;
                    transition: color 0.3s ease;
                }

                .category-item:hover .category-name {
                    color: #EF5B2B; /* Change category name color on hover */
                }
            `}</style>

            <div className="container">
                <div className="carousel-wrapper" style={{ overflow: 'hidden', position: 'relative' }}>
                    {/* Categories container with sliding effect */}
                    <div
                        className="categories-container"
                        style={{
                            display: 'flex',
                            transition: 'transform 0.5s ease-in-out',
                            transform: `translateX(-${currentPage * 100}%)`,
                        }}
                    >
                        {chunkedCategories.map((categoryGroup, groupIndex) => (
                            <div
                                key={groupIndex}
                                style={{
                                    minWidth: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap',
                                }}
                            >
                                {categoryGroup.map((category, index) => (
                                    <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4" key={index}>
                                        <Link
                                            to={`/category/${category.name}`} // Corrected to use template literals
                                            className="category-item"
                                            style={{ textDecoration: "none", color: "#333" }}
                                        >
                                            <div
                                                className="category-icon-wrapper"
                                                style={{
                                                    width: "100px",
                                                    height: "100px",
                                                    borderRadius: "50%",
                                                    backgroundColor: "#fff",
                                                    border: "2px solid #EF5B2B",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    margin: "0 auto",
                                                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                                }}
                                            >
                                                <i
                                                    className={`fa ${category.icon} category-icon`}
                                                    style={{ fontSize: "32px", color: "#EF5B2B" }}
                                                ></i>
                                            </div>
                                            <p className="category-name">
                                                {category.name}
                                            </p>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Left Arrow */}
            {currentPage > 0 && ( // Show left button only if not on the first page
                <button
                    onClick={handlePrev}
                    style={{
                        marginLeft: '50px',
                        position: 'absolute',
                        top: '50%',
                        left: '0',
                        transform: 'translateY(-50%)',
                        background: 'linear-gradient(135deg, #EF5B2B, #FF8E53)',
                        borderRadius: '50%',
                        border: 'none',
                        width: '50px',
                        height: '50px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        color: '#fff',
                        opacity: 0.85,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.85)}
                >
                    <i className="fa fa-chevron-left" style={{ fontSize: '22px' }}></i>
                </button>
            )}

            {/* Right Arrow */}
            {currentPage < chunkedCategories.length - 1 && ( // Show right button only if not on the last page
                <button
                    onClick={handleNext}
                    style={{
                        marginRight: '50px',
                        position: 'absolute',
                        top: '50%',
                        right: '0',
                        transform: 'translateY(-50%)',
                        background: 'linear-gradient(135deg, #EF5B2B, #FF8E53)',
                        borderRadius: '50%',
                        border: 'none',
                        width: '50px',
                        height: '50px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        color: '#fff',
                        opacity: 0.85,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.85)}
                >
                    <i className="fa fa-chevron-right" style={{ fontSize: '22px' }}></i>
                </button>
            )}
        </div>
    );
}

export default CategoryCarousel;
