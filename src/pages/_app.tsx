import '../styles/globals.scss';
import { wrapper, store } from "../store/store";
import { Provider } from "react-redux";
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default wrapper.withRedux(App);