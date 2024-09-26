import React, { useState } from 'react';
import Loginn from './Loginpage.js';
import Register from './RegisterPage.js';
import ForgotPassword from './ForgotPassword.js';

function AuthPage() {
    const [isRegister, setIsRegister] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);

    return (
        <div>
            {isForgotPassword ? (
                <ForgotPassword setIsForgotPassword={setIsForgotPassword} />
            ) : isRegister ? (
                <Register setIsRegister={setIsRegister} />
            ) : (
                <Loginn setIsRegister={setIsRegister} setIsForgotPassword={setIsForgotPassword} />
            )}
        </div>
    );
}

export default AuthPage;
