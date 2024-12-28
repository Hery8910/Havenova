"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import api from "../../../services/api";

const VerifyEmail = () => {
  const { setUser } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Recuperar el token de los params
  const [message, setMessage] = useState("Por favor verifica tu correo.");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token]);

  const verifyEmail = async () => {
    try {
      const response = await api.get(`/api/users/verify-email?token=${token}`);
      if (response.status === 200) {
        setMessage("Correo verificado con éxito. Redirigiendo...");
        setUser(response.data); // Actualiza el estado global del usuario
        setTimeout(() => router.push("/home"), 2000);
      }
    } catch (error: any) {
      setError(true);
      setMessage(error.response?.data?.message || "Error al verificar el correo.");
    }
  };

  return (
    <div>
      <h1>Verificación de Correo</h1>
      <p>{message}</p>
      {error && <p>Error al verificar el correo.</p>}
    </div>
  );
};

export default VerifyEmail;
