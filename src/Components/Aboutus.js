import React from 'react';

function Aboutus() {
    return (
        <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', padding: '20px' }}>
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <h1 style={{ color: 'yellow', fontWeight: 'bold' }}>ABOUT US</h1>
                <p>Welcome to our clothing store! We are dedicated to providing you with the latest and most stylish clothing options.</p>
            </div>
            <div style={{ margin: '20px' }}>
                <h2 style={{ color: 'yellow', fontWeight: 'bold' }}>Our Mission</h2>
                <p>Our mission is to offer high-quality clothing at affordable prices. We believe that everyone deserves to look and feel their best.</p>
            </div>
            <div style={{ margin: '20px' }}>
                <h2 style={{ color: 'yellow', fontWeight: 'bold' }}>Our Values</h2>
                <p>We value:</p>
                <ul>
                    <li><strong style={{ color: 'yellow' }}>Quality</strong> - We ensure that all our products meet the highest standards.</li>
                    <li><strong style={{ color: 'yellow' }}>Customer Satisfaction</strong> - Your happiness is our top priority.</li>
                    <li><strong style={{ color: 'yellow' }}>Innovation</strong> - We continuously update our collection to reflect the latest trends.</li>
                </ul>
            </div>
            <div style={{ margin: '20px' }}>
                <h2 style={{ color: 'yellow', fontWeight: 'bold' }}>Contact Us</h2>
                <p>If you have any questions or feedback, please don't hesitate to contact us at <a href="mailto:support@wardrobrox.com" style={{ color: 'yellow', fontWeight: 'bold' }}>support@wardrobrix.com</a>.</p>
            </div>
        </div>
    );
}

export default Aboutus;
