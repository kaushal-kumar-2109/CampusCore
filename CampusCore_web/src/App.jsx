import { useState } from 'react';
import './App.css'
import AppRoutes from './routes/appRouter';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (<>
    <AppRoutes />
    <ToastContainer
      position="top-right"
      autoClose={1500}
      theme="light"
    />
  </>)
}

export default App
