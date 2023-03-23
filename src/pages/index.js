import { useRouter } from "next/router";
import { useAuth } from "@/context/authContex";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

 /*  console.log(user);   */
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }else{
      router.push("/login");
    }
  
  }, [user]);
  return (
    <>
      <div>
          <div>
            <h1>Home</h1>
            <h1>welcome {user?.email}</h1>            
          </div>
      </div>
    </>
  );
}
