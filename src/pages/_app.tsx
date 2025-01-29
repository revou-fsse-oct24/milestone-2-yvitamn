
import type { AppProps } from 'next/app';
import { AuthenticateProvider } from '../contexts/AuthenticateProvider';
import { CartProvider } from '../contexts/CartProvider';
import Layout from '../components/Layout';
import { ModalProvider } from '../contexts/ModalContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthenticateProvider>
      <CartProvider>
      <ModalProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </ModalProvider>
      </CartProvider>
    </AuthenticateProvider>
  );
}

export default MyApp;