import { StrictMode } from 'react';
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

const defaultSetting = {
  theam: "light",
};

const savedSetting = JSON.parse(localStorage.getItem("CampusCoreSettings"));

if (!savedSetting) {
  localStorage.setItem("CampusCoreSettings", JSON.stringify(defaultSetting));
  document.documentElement.setAttribute("data-theme", "light");
} else {
  document.documentElement.setAttribute("data-theme", savedSetting.theam);
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
