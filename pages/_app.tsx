import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "../context/UserContext";
import Navbar from "../components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Navbar />
      <Component {...pageProps} />
    </UserProvider>
  );
}
