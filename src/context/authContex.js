import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const logout = () => {
  signOut(auth);
};

export const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const singUp = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);
  const login = async (email, password) =>
    await signInWithEmailAndPassword(auth, email, password);

  useEffect(() => {
    onAuthStateChanged(auth, (userCurrent) => {
      setUser(userCurrent);
      setLoading(false);
    });
  }, []);

  return (
    <authContext.Provider
      value={{ singUp, login, user, logout, loading, loginWithGoogle }}
    >
      {children}
    </authContext.Provider>
  );
}
