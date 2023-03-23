import React from 'react'
import { useRouter } from "next/router";
import { useAuth } from "@/context/authContex";

const Dashboard = () => {
  
  const { user, logout } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <p>{user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard