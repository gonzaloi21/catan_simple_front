import React, { useState, useContext } from 'react';
import './LoginForm.css';
import axios from 'axios';
import { AuthContext } from '../../auth/AuthContext';

const LoginForm = ({ onClose }) => {
  const { tokens, setToken } = useContext(AuthContext); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleClose = () => {
    onClose();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const PORT = 3000;
    axios.post(`https://backend-oficial-catan.onrender.com/login`,
    { 
      mail: email, 
      password: password 
    }).then((response) => {
      const access_token = response.data.access_token;
      setToken(email, access_token);
      alert(`Te has logueado correctamente ${email}`)
      onClose();
    }).catch((error) => {
      alert(`Error al loguearse: ${error.response.data}`)
    });
  };

  return (
    <div className="login-overlay">
      <div className="login-form-conatiner">
        <button className="close-button" onClick={handleClose}>
          Cerrar
        </button>
        <form className="login-form" onSubmit={handleSubmit}>
            <h5>Formulario Log In</h5>
            <label>
                Email:
                <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                />
            </label>
            <label>
                Password:
                <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                />
            </label>
            <div className='buttons'>
                <button type="submit">Log In</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;