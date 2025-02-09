import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store from "./context/store.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
