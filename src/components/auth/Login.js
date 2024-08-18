"use client";
import React, { useState } from 'react';
import './Login.css';

const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Lógica de manejo de inicio de sesión omitida por ahora.
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <section id='login' className="container_login">
            <div className="background-login" />
            <div className="login_txt">
                <img src={`${imgBasePath}estrella.webp`} alt="img_representativa" />
                <p>Inicia sesión</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Usuario"
                            value={username}
                            onChange={handleUsernameChange}
                            autoComplete="username"
                        />
                    </div>
                    <div className="input-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Contraseña"
                            value={password}
                            onChange={handlePasswordChange}
                            autoComplete="current-password"
                        />
                        <img
                            className="input-img"
                            src={showPassword ? `${imgBasePath}password_visible.webp` : `${imgBasePath}password.webp`}
                            alt="img_representativa"
                            onClick={togglePassword}
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit">INGRESAR</button>
                </form>
                <p>¿No tienes una cuenta? <a href="/" className="link-registrarse">REGÍSTRATE</a></p>
            </div>
        </section>
    );
};

export default Login;
