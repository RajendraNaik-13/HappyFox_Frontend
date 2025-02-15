import './index.css';
import { makeServer } from './server';
import React from "react";
import ReactDOM from "react-dom/client"; 
import App from "./App";

if (process.env.NODE_ENV === 'development') {
  makeServer();
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  );