import React from "react";
import ReactDOM from "react-dom/client";
// import './index.css';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./css/reset.css";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./core/store";
import SignIn from "./pages/SignIn";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
try {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
  reportWebVitals();
} catch (error) {
  console.log(error);
}
