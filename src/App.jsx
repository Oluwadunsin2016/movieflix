import React from "react";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RootLayout from "./layouts/RootLayout";
import ToastContainer from './components/Toast/Toast';

function App() {
  return (
    <>
        <Routes>
          <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/account"
            element={
                <Account />
            }
          />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <ToastContainer />
    </>
  );
}

export default App;
