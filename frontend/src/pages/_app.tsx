import { SnackbarProvider } from '@/utils/context/SnackBar/SnackBar';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <SnackbarProvider>
        <Component {...pageProps} />
      </SnackbarProvider>
    </ChakraProvider>
  );
}

export default MyApp;
