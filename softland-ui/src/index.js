import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import {StoreProvider} from './crypto_service/store';
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <BrowserRouter>
     <StoreProvider>
     <App />
     </StoreProvider>
  
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();