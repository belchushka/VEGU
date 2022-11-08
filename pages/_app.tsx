import type { AppProps } from 'next/app'
import {NextPage} from "next";
import {ReactElement, ReactNode} from "react";
import "@styles/global.scss"
import {wrapper} from "@box/store";
import {initialAuth} from "@box/providers";
import {AuthGuard} from "@box/hoc";
import {Alert} from "@box/entities";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
  protected?: Array<any>;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function VeguApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const isProtected = !Component.protected == undefined;
  return <>
    { isProtected ? <AuthGuard permissions={Component?.protected || []}>{getLayout(<Component {...pageProps} />)}</AuthGuard> : getLayout(<Component {...pageProps} />)}
    <Alert />
  </>

}

VeguApp.getInitialProps = initialAuth()

export default wrapper.withRedux(VeguApp)


