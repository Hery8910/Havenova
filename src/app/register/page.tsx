"use client"
import { useState } from 'react';
import api from '../../services/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await api.post('/users/register', { name, email, password });
      setMessage('Usuario registrado con éxito');
      console.log('Respuesta del backend:', response.data);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Error al registrar el usuario');
      console.error('Error al conectar con el backend:', error);
    }
  };

  return (
    <div className="register">
      <h1>Registrarse</h1>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <button onClick={handleRegister}>Registrar</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
