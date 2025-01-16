"use client"
import styles from './page.module.css';
import { useUser } from "../contexts/UserContext";
import { useState, useEffect } from "react";



const Profile = () => {
  const { user, refreshUser } = useUser();
  useEffect(() => {
    refreshUser();
  }, [refreshUser]);
  console.log(user);
  

  return (
    <h1>Profile Page</h1>
  );
};

export default Profile;