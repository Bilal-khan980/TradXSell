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

        return (
            <div className="manage-products-page" style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
                <SideNavbar style={{ width: '20%' }} />

                <div style={{ flex: 1, padding: '20px' }}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="text-left font-weight-bold" style={{ color: "#EF5B2B" }}>Manage Products</h2>
                        <button className="btn" style={{ backgroundColor: "#EF5B2B", color: "white" }} onClick={this.toggleForm}>
                            {showForm ? "Close Form" : "Add Product"}
                        </button>
                    </div>

                    <div className="mb-4 d-flex justify-content-between">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="form-control w-50"
                            value={searchTerm}
                            onChange={this.handleSearch}
                        />
                        <select
                            className="form-control w-25"
                            value={sortBy}
                            onChange={this.handleSort}
                        >
                            <option value="name">Sort by Name</option>
                            <option value="price">Sort by Price</option>
                        </select>
                    </div>

                    <div className="row">
                        {filteredProducts.map(product => (
                            <div className="col-md-4 mb-4" key={product.id}>
                                <div className="card h-100 shadow-sm">
                                    <img src={product.imageUrl} className="card-img-top" alt={product.name} style={{ height: '200px', objectFit: 'cover' }} />
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text text-muted mb-2">${product.price}</p>
                                        <p className="card-text flex-grow-1">{product.description}</p>
                                        <div className="mt-auto">
                                            <Link to={`/adminproducts/${product.id}`} className="btn btn-outline-primary btn-sm mr-2">View Details</Link>
                                            <button className="btn btn-outline-danger btn-sm" onClick={() => this.handleDeleteProduct(product.id)}>
                                                <i className="fas fa-trash"></i> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {showForm && (
                    <div className="add-product-form slide-in" style={{
                        position: 'fixed',
                        top: '0',
                        right: '0',
                        width: '400px',
                        height: '100%',
                        backgroundColor: '#fff',
                        boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
                        padding: '20px',
                        overflowY: 'auto'
                    }}>
                        <h2 className="text-left font-weight-bold mb-4" style={{ color: "#EF5B2B" }}>Add New Product</h2>
                        <button onClick={this.toggleForm} className="btn btn-link position-absolute" style={{ top: '20px', right: '20px' }}>Close</button>
                        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
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
                                <input type="file" className="form-control-file" name="image" onChange={this.handleChange} required />
                            </div>
                            <div className="form-group">
                                <select className="form-control" id="category" name="category" value={category} onChange={this.handleChange} required>
                                    <option value="">Select Category</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <select name="type" className="form-control" value={type} onChange={this.handleChange} required>
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
                                <textarea className="form-control" name="description" value={description} onChange={this.handleChange} placeholder="Product Description" required />
                            </div>
                            <div className="form-check mb-3">
                                <input type="checkbox" className="form-check-input" name="latest" checked={latest} onChange={this.handleChange} />
                                <label className="form-check-label">Latest</label>
                            </div>
                            <div className="form-check mb-3">
                                <input type="checkbox" className="form-check-input" name="featured" checked={featured} onChange={this.handleChange} />
                                <label className="form-check-label">Featured</label>
                            </div>
                            <button type="submit" className="btn btn-block" style={{ backgroundColor: "#EF5B2B", color: "white" }}>Add Product</button>
                        </form>
                    </div>
                )}
            </div>
        );
    }
}

export default ManageProducts;