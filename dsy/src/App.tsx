import { ConfigProvider } from "antd";
import React from "react";
import { Routes, Route } from "react-router-dom"

import "./App.css";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
function App() {

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#00b96b" } }}>
       <Routes>
        <Route path="/" element={ <LoginPage /> } />
        <Route path="/home" element={ <HomePage /> } />
        <Route path="/register" element={ <RegisterPage /> } />
        <Route path="/login" element={ <LoginPage /> } />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
