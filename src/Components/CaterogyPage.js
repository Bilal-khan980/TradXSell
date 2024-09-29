import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CategoryPage = () => {
  const { categoryName } = useParams(); // Get the category name from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const formattedCategoryName = categoryName.toLowerCase().replace(/\s+/g, '');
        const response = await fetch(`http://localhost:5000/products/category/${formattedCategoryName}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading...</p>;

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>{categoryName}</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        {products.length > 0 ? (
          products.map(product => (
            <div key={product._id} style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'pointer',
              textAlign: 'center'
            }} 
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
            }} 
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
            }}>
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderBottom: '1px solid #e0e0e0'
                }} 
              />
              <div style={{ padding: '15px' }}>
                <h2 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  margin: '10px 0',
                  color: '#333'
                }}>{product.name}</h2>
                <p style={{
                  fontSize: '16px',
                  color: '#28a745', // Green color for price
                  margin: '5px 0'
                }}>{`$${product.price.toFixed(2)}`}</p>
                
                {/* Description */}
                <p style={{
                  fontSize: '14px',
                  color: '#555',
                  margin: '5px 0',
                  height: '40px', // Fixed height for consistency
                  overflow: 'hidden', // Hide overflow
                  textOverflow: 'ellipsis', // Ellipsis for overflowed text
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: '2', // Show only 2 lines
                }}>
                  {product.description}
                </p>

                {/* Rating */}
                {/* <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '5px 0',
                }}>
                  <span style={{
                    fontSize: '14px',
                    color: '#ffa500'
                  }}>
                    {'★'.repeat(Math.round(product.rating))}
                    {'☆'.repeat(5 - Math.round(product.rating))}
                  </span>
                  <span style={{
                    fontSize: '14px',
                    marginLeft: '5px',
                    color: '#777'
                  }}>
                    {`(${product.rating})`}
                  </span>
                </div> */}

                {/* <button style={{
                  padding: '10px 15px',
                  border: 'none',
                  borderRadius: '5px',
                  backgroundColor: '#28a745',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '14px',
                  marginTop: '10px',
                  transition: 'background-color 0.3s'
                }} 
                onMouseOver={e => e.currentTarget.style.backgroundColor = '#218838'}
                onMouseOut={e => e.currentTarget.style.backgroundColor = '#28a745'}>
                  Add to Cart
                </button> */}
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#555' }}>No products available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
