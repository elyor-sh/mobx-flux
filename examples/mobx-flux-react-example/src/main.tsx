import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {Provider} from "mobx-flux-react";
import {store} from "./store";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
      <Provider store={store}>
          <App />
      </Provider>
  </>,
)
