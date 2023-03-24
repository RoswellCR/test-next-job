import { ReactElement, ReactNode, useEffect } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.css';

import '../styles/globals.css'

type NextPageWithLayout = NextPage & {
  getLayout?: (page : ReactElement) => ReactNode;
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  useEffect(()=>{
    require("bootstrap/dist/js/bootstrap");
},[])

  const getLayout = Component.getLayout || ((page) => page );

  // return (
  //   <>
  //     <Component {...pageProps} />
  //   </>
  // )
  return getLayout( <Component {...pageProps} /> )
}

export default MyApp