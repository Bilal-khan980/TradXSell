import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthContext.js';
import SideNavbar from './SideNavbar';

class ManageProducts extends Component {
    
    static contextType = AuthContext;
    

    state = {
        products: [],
        showForm: false,
        id: '',
        name: '',
        price: '',
        imageFile: null,
        latest: false,
        category: '',
        featured: false,
        sizes: '',
        colors: '',
        quantity: '',
        description: '',
        type: 'local',
        searchTerm: '',
        sortBy: 'name',
    };

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts = async () => {
        const { email } = this.context;
        const response = await axios.get(`/products/seller/${email}`);
        this.setState({ products: response.data });
    };

    handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'file') {
            this.setState({ imageFile: files[0] });
        } else {
            this.setState({ [name]: type === 'checkbox' ? checked : value });
        }
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { id, name, price, imageFile, latest, category, featured, sizes, colors, quantity, description, type: productType } = this.state;
        const { email } = this.context;

        const formData = new FormData();
        formData.append('id', id);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('image', imageFile);
        formData.append('latest', latest);
        formData.append('category', category);
        formData.append('featured', featured);
        formData.append('sizes', sizes);
        formData.append('colors', colors);
        formData.append('quantity', quantity);
        formData.append('description', description);
        formData.append('sellerEmail', email);
        formData.append('type', productType);

        await axios.post('/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        alert('Product added successfully');
        this.setState({
            id: '',
            name: '',
            price: '',
            imageFile: null,
            latest: false,
            category: '',
            featured: false,
            sizes: '',
            colors: '',
            quantity: '',
            description: '',
            type: 'local'
        });
        this.fetchProducts();
    };

    handleDeleteProduct = async (productId) => {
        await axios.delete(`/products/${productId}`);
        this.fetchProducts();
    };

    toggleForm = () => {
        this.setState({ showForm: !this.state.showForm });
    };

    handleSearch = (e) => {
        this.setState({ searchTerm: e.target.value });
    };

    handleSort = (e) => {
        this.setState({ sortBy: e.target.value });
    };

    render() {
        const { products, showForm, id, name, price, category, sizes, colors, quantity, description, latest, featured, type, searchTerm, sortBy } = this.state;
        const categories = [
            'Jewelry, Eyewear', 'Vehicle Parts & Accessories', 'Industrial Machinery',
            'Luggage, Bags & Cases', 'Construction & Real Estate', 'Personal Care & Household',
            'Lights & Lighting', 'Renewable Energy', 'Shoes & Accessories', 'Furniture',
            'Tools & Hardware', 'Home Appliances', 'Vehicles & Transportation',
            'Vehicle Accessories', 'Gifts & Crafts', 'Health Care'
        ];
    
        const filteredProducts = products
            .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => {
                if (sortBy === 'name') return a.name.localeCompare(b.name);
                if (sortBy === 'price') return a.price - b.price;
                return 0;
            });

        const { username: sellerusername } = this.context;
    
        return (
            <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#121212', color: '#E0E0E0' }}>
                <SideNavbar />
                <main style={{ flex: 1, padding: '20px' }}>
                <header style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                    borderBottom: '1px solid #333',
                    paddingBottom: '10px',
                }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Manage Products</h2>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ marginRight: '10px' }}>{sellerusername}</span>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: '#EF5B2B',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                        }}>
                            {sellerusername.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </header>
                <div >
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <input
                            type="text"
                            placeholder="Search products..."
                            style={{ ...styles.input, width: '50%' }}
                            value={searchTerm}
                            onChange={this.handleSearch}
                        />
                        <select
                            style={{ ...styles.input, width: '25%' }}
                            value={sortBy}
                            onChange={this.handleSort}
                        >
                            <option value="name">Sort by Name</option>
                            <option value="price">Sort by Price</option>
                        </select>
                        <button style={styles.button} onClick={this.toggleForm}>
                            {showForm ? "Close Form" : "Add Product"}
                        </button>
                    </div>
    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                        {filteredProducts.map(product => (
                            <div key={product.id} style={styles.card}>
                                <img src={product.imageUrl} alt={product.name} style={styles.cardImage} />
                                <div style={styles.cardBody}>
                                    <h5 style={styles.cardTitle}>{product.name}</h5>
                                    <p style={styles.cardPrice}>${product.price}</p>
                                    <p style={styles.cardDescription}>{product.description}</p>
                                    
                                    {/* Display the product status here */}
                                 
                                    
                                    <div style={styles.statusContainer}>
                                        <span style={{
                                            ...styles.statusIndicator,
                                            backgroundColor: 
                                            product.status === 'approved' ? 'green' : 
                                            product.status === 'not approved' ? 'red' : 
                                            product.status === 'pending' ? 'yellow' : 
                                            'transparent' // Default color if none of the conditions match
                                        
                                        }}></span>
                                        <span style={styles.statusText}>
                                            {product.status }
                                        </span>
                                    </div>

    
                                    <div style={styles.cardActions}>
                                        <Link to={`/adminproducts/${product.id}`} style={styles.viewButton}>View Details</Link>
                                        <button style={styles.deleteButton} onClick={() => this.handleDeleteProduct(product.id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
    
                {showForm && (
                    <div style={styles.formContainer}>
                        <h2 style={{ color: "#EF5B2B", fontWeight: 'bold', marginBottom: '20px' }}>Add New Product</h2>
                        <button onClick={this.toggleForm} style={styles.closeButton}>Close</button>
                        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                            <input type="text" style={styles.input} name="id" value={id} onChange={this.handleChange} placeholder="Product ID" required />
                            <input type="text" style={styles.input} name="name" value={name} onChange={this.handleChange} placeholder="Product Name" required />
                            <input type="number" style={styles.input} name="price" value={price} onChange={this.handleChange} placeholder="Product Price" required />
                            <input type="file" style={styles.fileInput} name="image" onChange={this.handleChange} required />
                            <select style={styles.input} name="category" value={category} onChange={this.handleChange} required>
                                <option value="">Select Category</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                            <select style={styles.input} name="type" value={type} onChange={this.handleChange} required>
                                <option value="local">Local</option>
                                <option value="international">International</option>
                            </select>
                            <input type="text" style={styles.input} name="sizes" value={sizes} onChange={this.handleChange} placeholder="Sizes" required />
                            <input type="text" style={styles.input} name="colors" value={colors} onChange={this.handleChange} placeholder="Colors" required />
                            <input type="number" style={styles.input} name="quantity" value={quantity} onChange={this.handleChange} placeholder="Quantity" required />
                            <textarea style={styles.textarea} name="description" value={description} onChange={this.handleChange} placeholder="Product Description" required />
                            <div style={styles.checkboxContainer}>
                                <input type="checkbox" id="latest" name="latest" checked={latest} onChange={this.handleChange} />
                                <label htmlFor="latest">Latest</label>
                            </div>
                            <div style={styles.checkboxContainer}>
                                <input type="checkbox" id="featured" name="featured" checked={featured} onChange={this.handleChange} />
                                <label htmlFor="featured">Featured</label>
                            </div>
                            <button type="submit" style={styles.submitButton}>Add Product</button>
                        </form>
                    </div>
                )}
                </main>
            </div>
        );
    }
}    

const styles = {
    statusContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
    },
    statusIndicator: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        marginRight: '8px',
    },
    statusText: {
        fontSize: '14px',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: "#EF5B2B",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "4px",
        cursor: "pointer",
    },
    input: {
        backgroundColor: "#333",
        color: "#E0E0E0",
        border: "1px solid #555",
        padding: "10px",
        borderRadius: "4px",
        marginBottom: "10px",
        width: "100%",
    },
    card: {
        backgroundColor: "#1E1E1E",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    cardImage: {
        width: "100%",
        height: "200px",
        objectFit: "cover",
    },
    cardBody: {
        padding: "15px",
    },
    cardTitle: {
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "10px",
    },
    cardPrice: {
        fontSize: "16px",
        color: "#EF5B2B",
        marginBottom: "10px",
    },
    cardDescription: {
        fontSize: "14px",
        marginBottom: "15px",
    },
    cardActions: {
        display: "flex",
        justifyContent: "space-between",
    },
    viewButton: {
        backgroundColor: "#2C3E50",
        color: "white",
        padding: "5px 10px",
        borderRadius: "4px",
        textDecoration: "none",
    },
    deleteButton: {
        backgroundColor: "#c0392b",
        color: "white",
        border: "none",
        padding: "5px 10px",
        borderRadius: "4px",
        cursor: "pointer",
    },
    formContainer: {
        position: 'fixed',
        top: '0',
        right: '0',
        width: '400px',
        height: '100%',
        backgroundColor: '#1E1E1E',
        boxShadow: '-2px 0 5px rgba(0,0,0,0.3)',
        padding: '20px',
        overflowY: 'auto',
    },
    closeButton: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        background: 'none',
        border: 'none',
        color: '#E0E0E0',
        cursor: 'pointer',
    },
    fileInput: {
        marginBottom: '10px',
    },
    textarea: {
        backgroundColor: "#333",
        color: "#E0E0E0",
        border: "1px solid #555",
        padding: "10px",
        borderRadius: "4px",
        marginBottom: "10px",
        width: "100%",
        minHeight: "100px",
    },
    checkboxContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    },
    submitButton: {
        backgroundColor: "#EF5B2B",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "4px",
        cursor: "pointer",
        width: "100%",
    },
};

export default ManageProducts;