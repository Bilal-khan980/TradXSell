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
        type:'local'
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
        const { id, name, price, imageFile, latest, category, featured, sizes, colors, quantity, description,type:productType } = this.state;
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
            type:'local'
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

    render() {
        const { products, showForm, id, name, price, category, sizes, colors, quantity, description, latest, featured,type } = this.state;
        const categories = [
            'Jewelry, Eyewear', 'Vehicle Parts & Accessories', 'Industrial Machinery',
            'Luggage, Bags & Cases', 'Construction & Real Estate', 'Personal Care & Household',
            'Lights & Lighting', 'Renewable Energy', 'Shoes & Accessories', 'Furniture',
            'Tools & Hardware', 'Home Appliances', 'Vehicles & Transportation',
            'Vehicle Accessories', 'Gifts & Crafts', 'Health Care'
        ];

        return (
            <div className="manage-products-page" style={{ display: 'flex', minHeight: '100vh' }}>
                {/* SideNavbar */}
                <SideNavbar style={{ width: '20%' }} />

                {/* Main Content */}
                <div style={{ flex: 1, padding: '20px', marginLeft: '20%' }}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="text-left font-weight-bold" style={{ color: "#FF5733" }}>Manage Products</h2>
                        <button style={{ backgroundColor: "#FF5733", color: "white" }} onClick={this.toggleForm}>
                            {showForm ? "Close Form" : "Add Product"}
                        </button>
                    </div>

                    {/* Sliding Form */}
                    <div 
    className={`add-product-form ${showForm ? 'slide-in' : 'slide-out'}`} 
    style={{
        position: 'fixed',
        top: '100px', // Adjust this value as needed
        right: showForm ? '0' : '-50%',
        width: '50%',
        height: '100%',
        transition: 'right 0.5s ease',
        zIndex: 1000,
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderLeft: '2px solid #ddd'
    }}
>

                        <h2 className="text-left font-weight-bold" style={{ color: "#FF5733" }}>ADD NEW PRODUCT</h2>
                        <button onClick={this.toggleForm} style={{ backgroundColor: "transparent", color: "#FF5733", border: 'none', fontSize: '16px', cursor: 'pointer', float: 'right' }}>Close</button>
                        <form onSubmit={this.handleSubmit} className="mt-3" encType="multipart/form-data">
                            <div className="form-group">
                                <input type="text" className="form-control" name="id" value={id} onChange={this.handleChange} placeholder="Product ID" required />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" name="name" value={name} onChange={this.handleChange} placeholder="Product Name" required />
                            </div>
                            <div className="form-group">
                                <input type="number" className="form-control" name="price" value={price} onChange={this.handleChange} placeholder="Product Price" required />
                            </div>
                            <div className="form-group">
                                <input type="file" className="form-control" name="image" onChange={this.handleChange} required />
                            </div>
                            <div className="form-group">
                                <select
                                    className="form-control"
                                    id="category"
                                    name="category"
                                    value={category}
                                    onChange={this.handleChange}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="type">Type (Local/International):</label>
                                <select
                                    name="type"
                                    className="form-control"
                                    value={type}
                                    onChange={this.handleChange}
                                    required
                                >
                                    <option value="local">Local</option>
                                    <option value="international">International</option>
                                </select>
                            </div>

                            
                            <div className="form-group">
                                <input type="text" className="form-control" name="sizes" value={sizes} onChange={this.handleChange} placeholder="Sizes" required />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" name="colors" value={colors} onChange={this.handleChange} placeholder="Colors" required />
                            </div>
                            <div className="form-group">
                                <input type="number" className="form-control" name="quantity" value={quantity} onChange={this.handleChange} placeholder="Quantity" required />
                            </div>
                            <div className="form-group">
                                <textarea
                                    className="form-control"
                                    name="description"
                                    value={description}
                                    onChange={this.handleChange}
                                    placeholder="Product Description"
                                    required
                                />
                            </div>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" name="latest" checked={latest} onChange={this.handleChange} />
                                <label className="form-check-label">Latest</label>
                            </div>

                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" name="featured" checked={featured} onChange={this.handleChange} />
                                <label className="form-check-label">Featured</label>
                            </div>
                            <button type="submit" className="mt-3" style={{ backgroundColor: "#EF5B2B" }}>Add Product</button>
                        </form>
                    </div>

                    {/* Product Cards */}
                    <div className="featured-products mt-5">
                        <div className="row">
                            {products.map(product => (
                                <div className="col-md-4 mb-4" key={product.id}>
                                    <div className="card h-100" style={{ border: '1px solid #ddd', borderRadius: '5px' }}>
                                        <img src={product.imageUrl} className="card-img-top" alt={product.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">${product.price}</p>
                                            <p className="card-text">{product.description}</p>
                                            <Link to={`/adminproducts/${product.id}`} className="btn btn-secondary">View Details</Link>
                                            <button className="btn btn-danger ml-2" onClick={() => this.handleDeleteProduct(product.id)}>
                                                <i className="fas fa-trash"></i> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ManageProducts;