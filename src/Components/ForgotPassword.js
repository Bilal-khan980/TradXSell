import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ForgotPassword({ setIsForgotPassword }) {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleResetPassword = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/users/update-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, newPassword })
            });
            const data = await response.json();

            if (data.success) {
                setMessage("Password updated successfully.");
            } else {
                setMessage("Error updating password. Please try again.");
            }
        } catch (error) {
            console.error('Error in updating password:', error);
            setMessage("Error updating password. Please try again.");
        }
    };

    return (
        <div style={{ backgroundColor: "black", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="card p-4" style={{ textAlign: "center", width: "500px", backgroundColor: "black", color: "white", border: "none", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
                <h2 className="text-center mb-4" style={{ color: "#fff", fontWeight: "bold", fontSize: "50px" }}>RESET PASSWORD</h2>
                <form onSubmit={handleResetPassword}>
                    <div className="form-group mb-3">
                        <p style={{ textAlign: "left", fontWeight: "bold", fontSize: "30px", color: "yellow" }}>EMAIL</p>
                        <input
                            style={{ height: "50px" }}
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <p style={{ textAlign: "left", fontWeight: "bold", fontSize: "30px", color: "yellow" }}>NEW PASSWORD</p>
                        <input
                            style={{ height: "50px" }}
                            type="password"
                            className="form-control"
                            id="newPassword"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-warning btn-block">Reset Password</button>
                    <br />
                    <button type="button" className="btn btn-secondary btn-block" onClick={() => setIsForgotPassword(false)}>Back to Login</button>
                </form>
                {message && <div className="alert alert-info mt-3" role="alert" style={{ backgroundColor: "yellow", color: "black" }}>{message}</div>}
            </div>
        </div>
    );
}

export default ForgotPassword;
