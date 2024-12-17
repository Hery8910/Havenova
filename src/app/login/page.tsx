"use client"
import { useState } from 'react';
import api from '../../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await api.post('api/users/login', { email, password });
      console.log('Login exitoso:', response.data);
    } catch (error) {
      console.error('Error de autenticación:', error);
    }
  };

  return (
    <div className="login">
      <h1>Iniciar Sesión</h1>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
};

export default Login;
