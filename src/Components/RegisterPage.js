import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Lottie from 'lottie-react';
import animationData from '../Animation/Animation - 1719863439089.json';

function Register({ setIsRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const handleRegisterValidation = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/users/addnew', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, username, address, phoneNumber, role: 'user' }),
                credentials: 'include'
            });
            const data = await response.json();

            console.log('Register response data:', data);
            if (data.message) {
                setIsRegister(false); // Switch back to login after successful registration
            } else {
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 5000);
            }
        } catch (error) {
            console.error('Error registering:', error);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 5000);
        }
    };

    return (
        <div className='home-container' style={{ backgroundColor: "black", height: "100%" }}>
            <div style={{ backgroundColor: "black", height: "100vh" }}>
                <div style={{ backgroundColor: "black", height: "100%" }}>
                    <div>
                        <div className="col-md-6">
                            <Lottie animationData={animationData} style={{ height: '700px', width: "700px" }} />
                        </div>
                        <div className="col-md-6" style={{ paddingTop: "230px" }}>
                            <div className="card p-4" style={{ textAlign: "center", width: "500px", height: "700px", backgroundColor: "black", color: "white", border: "none", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
                                <h2 className="text-center mb-4" style={{ color: "#fff", fontWeight: "bold", fontSize: "50px" }}>REGISTER</h2>
                                <form onSubmit={handleRegisterValidation}>
                                    <div className="form-group mb-3">
                                        <p style={{ textAlign: "left", fontWeight: "bold", fontSize: "30px", color: "yellow" }}>USERNAME</p>
                                        <input
                                            style={{ height: "50px" }}
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <p style={{ textAlign: "left", fontWeight: "bold", fontSize: "30px", color: "yellow" }}>EMAIL</p>
                                        <input
                                            style={{ height: "50px" }}
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="abc@gmail.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <p style={{ textAlign: "left", fontWeight: "bold", fontSize: "30px", color: "yellow" }}>PASSWORD</p>
                                        <input
                                            style={{ height: "50px" }}
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <p style={{ textAlign: "left", fontWeight: "bold", fontSize: "30px", color: "yellow" }}>ADDRESS</p>
                                        <input
                                            style={{ height: "50px" }}
                                            type="text"
                                            className="form-control"
                                            id="address"
                                            placeholder="Address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <p style={{ textAlign: "left", fontWeight: "bold", fontSize: "30px", color: "yellow" }}>PHONE NUMBER</p>
                                        <input
                                            style={{ height: "50px" }}
                                            type="text"
                                            className="form-control"
                                            id="phoneNumber"
                                            placeholder="Phone Number"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-warning btn-block">REGISTER</button>
                                    <span style={{ paddingTop: "40px", paddingLeft: "170px" }}>Already have an account?
                                        <span style={{ paddingLeft: "20px" }}><button type="button" className="btn btn-warning btn-block" onClick={() => setIsRegister(false)}>LOGIN</button></span></span>
                                </form>
                                {showAlert && (
                                    <div className="alert alert-danger mt-3" role="alert" style={{ backgroundColor: "black" }}>
                                        Email Already in use.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
