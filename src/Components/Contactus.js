import React from 'react';

function Contactus() {
    return (
        <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', padding: '20px' }}>
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <h1 style={{ color: 'yellow', fontWeight: 'bold' }}>CONTACT US</h1>
                <p>If you have any questions, comments, or concerns, we'd love to hear from you. Here's how you can get in touch with us:</p>
            </div>
            <div style={{ margin: '20px' }}>
                <h2 style={{ color: 'yellow', fontWeight: 'bold' }}>CUSTOMER SERVICE</h2>
                <p>For any customer service inquiries, please email us at <a href="mailto:support@clothingstore.com" style={{ color: 'yellow', fontWeight: 'bold' }}>support@clothingstore.com</a>.</p>
            </div>
            <div style={{ margin: '20px' }}>
                <h2 style={{ color: 'yellow', fontWeight: 'bold' }}>HEADQUATERS</h2>
                <p>Visit us at our headquarters:</p>
                <p>
                    <strong style={{ color: 'yellow' }}>wardrobrix Inc.</strong><br />
                    123 ABC<br />
                    XYZ, St # 12
                </p>
            </div>
            <div style={{ margin: '20px' }}>
                <h2 style={{ color: 'yellow', fontWeight: 'bold' }}>BUSINESS INQUIRIES</h2>
                <p>For business-related inquiries, please contact our business team at <a href="mailto:business@clothingstore.com" style={{ color: 'yellow', fontWeight: 'bold' }}>business@clothingstore.com</a>.</p>
            </div>
            <div style={{ margin: '20px' }}>
                <h2 style={{ color: 'yellow', fontWeight: 'bold' }}>FOLLOW US</h2>
                <p>Stay connected with us on social media:</p>
                <p>
                    <a href="https://www.facebook.com/clothingstore" target='blank' style={{ fontWeight: 'bold' }}>Facebook</a>

                    <span style={{ paddingLeft: "30px" }}><a href="https://www.instagram.com/clothingstore" target='blank' style={{ fontWeight: 'bold' }}>Instagram</a></span>
                    <span style={{ paddingLeft: "30px" }}><a href="https://www.twitter.com/clothingstore" target='blank' style={{ fontWeight: 'bold' }}>Twitter</a></span>
                </p>
            </div>
        </div>
    );
}

export default Contactus;
