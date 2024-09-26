import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../AuthContext';
import Lottie from 'lottie-react';
import animationData from '../Animation/Animation - 1719863439089.json';

function Login({ setIsRegister, setIsForgotPassword }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const { handleLogin } = useContext(AuthContext);

    const handleLoginValidation = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });
            const data = await response.json();

            console.log('Login response data:', data);
            if (data.success) {
                handleLogin(data.user.email, data.user.username, data.user.role, data.user.id); // Pass user id from response
                window.location.href = '/';
            } else {
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 5000);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 5000);
        }
    };


    return (
        <div style={{ backgroundColor: "black", height: "90%", overflow: "hidden" }}>
            <div className="container-fluid d-flex align-items-center justify-content-center" style={{ backgroundColor: "black", height: "100vh" }}>
                <div className="row align-items-center">
                    <div className="col-md-6 d-flex justify-content-center">
                        <Lottie animationData={animationData} style={{ height: '700px', width: "700px" }} />
                    </div>
                    <div className="col-md-6 d-flex justify-content-center" style={{ paddingTop: "100px" }}>
                        <div className="card p-4" style={{ textAlign: "center", width: "500px", height: "700px", backgroundColor: "black", color: "white", border: "none", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
                            <h2 className="text-center mb-4" style={{ color: "#fff", fontWeight: "bold", fontSize: "50px" }}>LOGIN</h2>
                            <form onSubmit={handleLoginValidation}>
                                <div className="form-group mb-3">
                                    <p style={{ textAlign: "left", fontWeight: "bold", fontSize: "30px", color: "#EF5B2B" }}>EMAIL</p>
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
                                    <p style={{ textAlign: "left", fontWeight: "bold", fontSize: "30px", color: "#EF5B2B" }}>PASSWORD</p>
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
                                <button style={ {backgroundColor: "#EF5B2B" , color : "white"}} type="submit" >LOGIN</button><br /><br />
                            </form>
                            <br />
                            {/* className="btn btn-warning btn-block" */}
                            <button style={ {backgroundColor: "#EF5B2B" , color:"white"}} type="button"  onClick={() => setIsForgotPassword(true)}>Forgot Password?</button>
                            <span style={{ paddingTop: "40px", paddingLeft: "170px" }}>Don't have an account?
                                <span style={{ paddingLeft: "20px" }}><button style={ {backgroundColor: "#EF5B2B",color:"white"}} type="button" onClick={() => setIsRegister(true)}>REGISTER</button></span></span>

                            {showAlert && (
                                <div className="alert alert-danger mt-3" role="alert">
                                    Wrong credentials
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
