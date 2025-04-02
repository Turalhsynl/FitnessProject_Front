import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useStore } from "zustand";
import { useAuthStore } from "./common/Store";
import Home from "./pages/homepage/Home";
import Header from "../src/pages/homepage/components/Header";
import Footer from "./components/Footer";
import Contact from "./pages/contactpage/Contact";
import Shop from "./pages/shoppage/Shop";
import Cart from "./pages/homepage/components/Cart";
import Classes from "./pages/classespage/Classes";
import Login from "./pages/loginpage/Login";
import Register from "./pages/registerPage/Register";
import ProductDetails from "./pages/homepage/components/ProductDetails";
import SearchBar from "./pages/homepage/components/SearchBar";
const App = () => {
  const { accessToken } = useStore(useAuthStore);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/shop" element={accessToken ? <Shop /> : <Navigate to="/login" replace />} />
        <Route path="/cart" element={accessToken ? <Cart /> : <Navigate to="/login" replace />} />
        <Route path="/classes" element={accessToken ? <Classes /> : <Navigate to="/login" replace />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
