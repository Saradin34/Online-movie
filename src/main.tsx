import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { Provider } from "mobx-react";
import { movieStore } from "./stores/movieStore";
import "./i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider movieStore={movieStore}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>
);

