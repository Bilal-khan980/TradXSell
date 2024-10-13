import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext'; // Assuming you have an AuthContext for managing user authentication
import Footer from './footer'; // Assuming you have a Footer component
import { Link } from 'react-router-dom';

function Checkout() {
  const { loggedIn, email, username } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (loggedIn) {
      const fetchCartItems = async () => {
        try {
          const response = await axios.get(`/cart/${email}`);
          setCartItems(response.data);
        } catch (error) {
          console.error('Error fetching cart items:', error);
          setError('Failed to fetch cart items');
        }
      };

      fetchCartItems();
    }
  }, [loggedIn, email]);

  const handleOrder = async () => {
    try {
      const order = {
        email: email,
        username: username, // Replace with actual username or fetch from context if available
        items: cartItems
      };

      // Step 1: Place the order
      const response = await axios.post('/orders/add', order); // Adjust the API endpoint as per your backend route
      console.log('Order placed successfully:', response.data);

      // Step 2: Delete cart items after placing the order
      await axios.delete(`/cart/remove/${email}`); // Adjust the API endpoint as per your backend route
      console.log('Cart items deleted successfully');

      // Optionally, you can clear the cartItems state or show a success message to the user
      setCartItems([]);

    } catch (error) {
      console.error('Error placing order or deleting cart items:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!loggedIn) {
    return <div>Please log in to see your cart items.</div>;
  }

  // Placeholder for when cart items are loading
  if (cartItems.length === 0) {
    return <div>Loading cart items...</div>;
  }

  const calculateTotalBill = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: "white", color: "white", minHeight: "100vh", paddingTop: "60px", alignContent: 'center', paddingLeft: 400 }}>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="card" style={{ backgroundColor: "white", color: "black" }}>
              <div className="card-header">
                <h5 className="card-title">ORDER SUMMARY</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  {cartItems.map(item => (
                    <li key={item._id} className="list-group-item" style={{ backgroundColor: "white", color: "black" }}>
                      <div className="row">
                        <div className="col"><img src={item.imageUrl} alt={item.name} style={{ height: 100 }} /></div>
                        <div className="col" style={{ paddingTop: 35 }}>{item.name}</div>
                        {item.color !== 'null' && ( // Only render the color if it's not null
                          <div className="col" style={{ paddingTop: 35 }}>Color: {item.color}</div>
                        )}
                        {item.size !== 'null' && ( // Only render the size if it's not null
                          <div className="col" style={{ paddingTop: 35 }}>Size: {item.size}</div>
                        )}
                        <div className="col" style={{ paddingTop: 35 }}>Quantity: {item.quantity}</div>
                        <div className="col" style={{ paddingTop: 35 }}>${item.price * item.quantity}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-footer" style={{ backgroundColor: "white", color: "black", fontWeight: "bold", paddingBottom: "60px" }}>
                Total Bill: ${calculateTotalBill().toFixed(2)}
              </div>
              <Link to="/order" className="btn btn-primary" onClick={handleOrder} style={{ fontSize: "20px", fontWeight: "bold", color: "white", backgroundColor: "#EF5B2B", border: "2px solid white" }}>PLACE ORDER</Link>
            </div>
          </div>
        </div>
        <div className="row mt-3" style={{ paddingTop: "200px" }}>
          <div className="col-md-12">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
