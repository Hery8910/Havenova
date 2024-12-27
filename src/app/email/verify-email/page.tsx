"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import api from "../../../services/api";

const VerifyEmail = () => {
  const router = useRouter();
  const token = Cookies.get("token"); // Recuperar el token desde las cookies
  const [message, setMessage] = useState("Por favor verifica tu correo.");
  const [error, setError] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  console.log(Cookies.get())
    
  // Verificar el estado del usuario al cargar la página
  useEffect(() => {
    if (token) {
      validateUser();
    } else {
      setMessage("No estás autenticado. Revisa tu correo...");
    }
  }, [token]);

  // Función para validar al usuario
  const validateUser = async () => {
    try {
      const response = await api.get("/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        const { isVerified } = response.data;
        if (isVerified) {
          router.push("/home"); // Redirigir si ya está verificado
        } else {
          setIsVerified(false); // Permanece en la página de verificación
        }
      }
    } catch (error: any) {
      setError(true);
      setMessage(error.response?.data?.message || "Error al validar el usuario.");
    }
  };

  // Función para verificar el correo
  const verifyEmail = async () => {
    try {
      const response = await api.get(`/api/users/verify-email?token=${token}`);
      if (response.status === 200) {
        setMessage("Correo verificado con éxito. Redirigiendo...");
        setTimeout(() => router.push("/home"), 2000);
      }
    } catch (error: any) {
      setError(true);
      setMessage(error.response?.data?.message || "Error al verificar el correo.");
    }
  };

  // Función para reenviar el correo
  const resendEmail = async () => {
    try {
      const email = Cookies.get("email"); // Recuperar el correo desde las cookies
      const response = await api.post("/api/users/resend-verification", { email });
      if (response.status === 200) {
        setMessage("Correo de verificación reenviado con éxito.");
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Error al reenviar el correo.");
    }
  };

  return (
    <div>
      <h1>Verificación de Correo</h1>
      <p>{message}</p>
      <button onClick={verifyEmail}>Verficar</button>
      {!isVerified && error && (
        <div>
          <button onClick={resendEmail}>Reenviar Correo de Verificación</button>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
