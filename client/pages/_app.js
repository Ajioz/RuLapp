import "@/styles/globals.css";
import { useEffect, useState } from "react";
import Preloader from "@/components/Preloader";

export default function App({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000); // 1 second delay
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
      <Component {...pageProps} />;
    </>
  );
}
