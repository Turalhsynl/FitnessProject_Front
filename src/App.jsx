import React from "react";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Home from './pages/homepage/Home';
import Header from "./components/Header"
import Footer from "./components/Footer"
import Contact from "./pages/contactpage/Contact";
import Shop from "./pages/shoppage/Shop"
import Cart from "./pages/cartpage/Cart";
import Classes from "./pages/classespage/Classes";
import Login from "./pages/loginpage/Login";
import Register from "./pages/registerPage/Register";

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/shop" element={<Shop/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/classes" element={<Classes/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      <Footer/>
    </Router>
 
  );
}

export default App