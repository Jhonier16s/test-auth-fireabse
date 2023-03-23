/* eslint-disable @next/next/no-img-element */

import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/authContex";
import Image from "next/image";
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
  console.log(user);
  return (
    <div>
      <h1>Dashboard</h1>
      <p>{user.email}</p>
      <div>
        {user.photoURL ? (
          <img src={user.photoURL} alt="user" />
        ) : (
          <p>loading..</p>
        )}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
