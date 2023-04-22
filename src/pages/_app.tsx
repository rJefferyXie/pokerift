import '../styles/globals.scss';
import { wrapper } from "../store/store";
import { Provider } from "react-redux";
import type { AppProps } from 'next/app';

const App = ({ Component, ...pageProps }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default App;