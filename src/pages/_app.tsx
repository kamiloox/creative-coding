import type { AppProps } from 'next/app';
import 'normalize.css/normalize.css';
import '../theme/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
