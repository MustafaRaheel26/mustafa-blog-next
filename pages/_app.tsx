import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <div className="pt-16"> {/* Add padding to avoid overlapping with fixed Navbar */}
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
