import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

function CheckProducts() {
  const [products, setProducts] = useState([]);

  // Fetch products from the database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products/all/x');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    fetchProducts();
  }, []);

  // Handle status change for a product
  const handleStatusChange = async (id, currentStatus) => {
    const newStatus = currentStatus === 'approved' ? 'not approved' : 'approved';
    try {
      await axios.patch(`/products/updatestatus/${id}`, { status: newStatus });
      // Update the status in the frontend after successful response
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product._id === id ? { ...product, status: newStatus } : product
        )
      );
    } catch (error) {
      console.error('Error updating product status:', error);
    }
  };

  return (
    <section className="featured-products">
      <div className="container" style={{ paddingTop: '40px' }}>
        <div className="row">
          {products.map(product => (
            <div className="col-md-4 mb-4" key={product._id}>
              <div className="card">
                <img src={product.imageUrl} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">${product.price}</p>
                  <Link to={`/adminproducts/${product.id}`} className="btn btn-secondary mr-2">View Details</Link>

                  {/* Status button */}
                  <button
                    className={`btn ${product.status === 'approved' ? 'btn-success' : 'btn-warning'}`}
                    
                  >
                    {product.status === 'approved' ? 'Approved' : 'Not Approved'}
                  </button>

<div style={{paddingLeft : 30 , display : 'inline-block'}}></div>
                  <button 
                   
                    onClick={() => handleStatusChange(product._id, product.status)}
                  >
                    {product.status === 'approved' ? 'Change Status' : 'Change Status'}
                  </button>
                 
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CheckProducts;
