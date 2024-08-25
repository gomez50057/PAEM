"use client";
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Añadido para manejar el estado de carga

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true); // Iniciar la carga

    axios.post('http://localhost:8000/auth/inicio-sesion/', { username, password })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        window.location.href = '/dashboard'; // Redirigir después de un inicio de sesión exitoso
      })
      .catch(error => {
        setError('Usuario o contraseña incorrectos.');
        console.error('Error al iniciar sesión:', error);
      })
      .finally(() => {
        setLoading(false); // Finalizar la carga
      });
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
        <p>Inicia Sesión</p>
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
          {loading ? (
            <div className="loading-indicator">Cargando...</div>
          ) : (
            <button type="submit">INGRESAR</button>
          )}
        </form>
        <p>¿No tienes una cuenta? <a href="/" className="link-registrarse">REGÍSTRATE</a></p>
      </div>
    </section>
  );
};

export default Login;
