import React, { useState } from "react";
import { useAuth } from "@/context/authContex";
import { useRouter } from "next/router";
const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const { login, loginWithGoogle } = useAuth();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      await login(user.email, user.password);
      router.push("/");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const handleRegister = () => {
    router.push("/register");
  };
  const handleGoogleSingIn = async () => {
    await loginWithGoogle();
    router.push("/dashboard");
  };

  return (
    <>
      <div>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input onChange={handleChange} type="email" name="email" id="email" />
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            id="password"
          />

          <button type="submit">Login</button>
        </form>
      </div>
      <div>
        <button onClick={handleRegister}>go to Register</button>
      </div>
      <div>
        <button onClick={handleGoogleSingIn}>Login with Google</button>
      </div>
    </>
  );
};

export default Login;
