/** Global Styles */
import '../styles/globals.css'
/** Libs */
import { Provider } from 'react-redux'
/** Utils */
import { store } from '../store';

/** Component */
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp