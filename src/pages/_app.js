import "@/styles/globals.css";
import { AuthProvider } from "../context/authContex";
import { useEffect } from "react";
export default function App({ Component, pageProps }) {
  useEffect(() => {
    if("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
       navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log("Service Worker registration successful with scope: ", registration.scope);
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, [])
  return(
  <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>
  )
}
