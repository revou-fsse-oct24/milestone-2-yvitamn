
import type { AppProps } from 'next/app';
import { AuthenticateProvider } from '../contexts/AuthenticateProvider';
import { CartProvider } from '../contexts/CartProvider';
import Layout from '../components/Layout';
import { ModalContext } from '../contexts/ModalContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthenticateProvider>
      <CartProvider>
      <ModalContext.Provider value={{ isCartModalOpen, setIsCartModalOpen }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </ModalContext.Provider>
      </CartProvider>
    </AuthenticateProvider>
  );
}

export default MyApp;