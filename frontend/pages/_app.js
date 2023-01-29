import "@/assets/css/output.css"
import { store } from "@/redux/store/store.js"
import { Provider } from "react-redux"

export default function App({ Component, pageProps }) {
  return <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
}
