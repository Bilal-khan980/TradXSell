import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Assuming you are using react-router-dom for routing

class WomensProducts extends Component {
    state = {
        products: [],
        searchQuery: '',
        error: ''
    };

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts = async () => {
        try {
            const response = await axios.get('/products/womens');
            console.log('Fetched products:', response.data);
            this.setState({ products: response.data });
        } catch (error) {
            console.error('Error fetching products:', error);
            this.setState({ error: 'Failed to fetch products' });
        }
    };

    handleSearch = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    render() {
        const { products, searchQuery, error } = this.state;

        if (error) {
            return <div>Error: {error}</div>;
        }

        // Filter products based on search query
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
            <div className="home-container" style={{ backgroundColor: "black", paddingBottom: "30px" }}>
                <h1 style={{ textAlign: "center", fontWeight: "bold", color: "yellow", paddingTop: "40px" }}>WOMEN</h1>

                <section className="featured-products">
                    <div className="container-fluid" style={{ paddingTop: "40px", width: "80%" }}>
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Search for products..."
                                value={searchQuery}
                                onChange={this.handleSearch}
                                style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
                            />
                        </div>
                        <div className="product-list" style={{ width: "100%" }}>
                            {filteredProducts.map(product => (
                                <div className="product-card" key={product.id}>
                                    <img src={product.imageUrl} alt={product.name} />
                                    <div className="product-details">
                                        <h3>{product.name}</h3>
                                        <p>{product.price}</p>
                                        <Link to={`/products/${product.id}`} className="btn btn-secondary" style={{ backgroundColor: "black" }}>View Details</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default WomensProducts;
