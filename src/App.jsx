import React from "react";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Home from './pages/Homepage/Home';
import Header from "./pages/Homepage/components/Header"
import Footer from "./pages/Homepage/components/Footer"

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
      <Footer/>
    </Router>
 
  );
}

export default App