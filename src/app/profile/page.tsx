'use client'
import Cookies from "js-cookie";
import { useUser } from "../contexts/UserContext";
import { useEffect } from "react";

const Profile = () => {
  const { user, refreshUser } = useUser();

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      refreshUser(); // Llama al backend para obtener los datos del usuario
    }
  }, [refreshUser]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;
