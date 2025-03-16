import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="flex justify-between items-center fixed top-0 left-0 w-full bg-black/50 text-white z-10 px-6 sm:px-8 md:px-10">
      <h1 className="text-primary text-3xl font-bold">FITGYM</h1>
      <nav className="hidden sm:flex sm:space-x-6 md:space-x-8">
        <Link to="/" className="hover:text-primary">Home</Link>
        <Link to="/about" className="hover:text-primary">About Us</Link>
        <Link to="/classes" className="hover:text-primary">Classes</Link>
        <Link to="/blog" className="hover:text-primary">Blog</Link>
        <Link to="/contact" className="hover:text-primary">Contact</Link>
        <Link to="/shop" className="hover:text-primary">Shop</Link>
        <Link to="/cart" className="hover:text-primary">Cart</Link>
      </nav>
      <button className="hidden sm:block bg-[#5E3AD4] text-dark px-6 py-2 rounded-[80px]">
        Join Our Club
      </button>
      <div className="sm:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white">
          <i className={`fas fa-bars text-2xl ${isMenuOpen ? "rotate-90" : ""} transition-transform duration-300`}></i>
        </button>
      </div>
      <div
        className={`sm:hidden fixed top-0 left-0 w-full h-full bg-black text-white text-center transition-all duration-300 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        onClick={closeMenu}
      >
        <nav className="space-y-6 py-20">
          <Link to="/" className="block py-4 text-2xl hover:bg-primary">Home</Link>
          <Link to="/about" className="block py-4 text-2xl hover:bg-primary">About Us</Link>
          <Link to="/classes" className="block py-4 text-2xl hover:bg-primary">Classes</Link>
          <Link to="/blog" className="block py-4 text-2xl hover:bg-primary">Blog</Link>
          <Link to="/contact" className="block py-4 text-2xl hover:bg-primary">Contact</Link>
        </nav>
        <button
          onClick={closeMenu}
          className="absolute top-6 right-6 text-3xl text-white"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
