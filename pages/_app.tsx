import type { AppProps } from "next/app";
import { GeistProvider, CssBaseline } from "@geist-ui/react";

import '../styles/components/Watch.css'
import '../styles/Home.module.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GeistProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </GeistProvider>
    </>
  );
}

export default MyApp;
