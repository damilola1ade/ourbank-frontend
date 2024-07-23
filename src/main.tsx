import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ModalProvider } from "./components/ui/animated-modal";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ModalProvider>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ModalProvider>
);
