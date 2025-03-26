import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaBars } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 350);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 px-6 sm:px-8 md:px-12 py-4 transition-all duration-300 ${isScrolled ? "bg-black" : "bg-transparent"}`}>
      <div className="flex justify-between items-center text-white">
        <h1 className="text-white text-4xl font-extrabold italic">
          <span className="text-purple-500">FIT</span>GYM
        </h1>
        <nav className="hidden sm:flex sm:space-x-8 md:space-x-10 text-lg font-medium ml-auto">
        <Link to="/" className="relative hover:text-purple-500 after:block after:h-1 after:bg-purple-500 after:w-full after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">Home</Link>
          <Link to="/about" className="relative hover:text-purple-500 after:block after:h-1 after:bg-purple-500 after:w-full after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">About Us</Link>
          <Link to="/classes" className="relative hover:text-purple-500 after:block after:h-1 after:bg-purple-500 after:w-full after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">Classes</Link>
          <Link to="/blog" className="relative hover:text-purple-500 after:block after:h-1 after:bg-purple-500 after:w-full after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">Blog</Link>
          <Link to="/shop" className="relative hover:text-purple-500 after:block after:h-1 after:bg-purple-500 after:w-full after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">Shop</Link>
        </nav>
        <div className="flex items-center space-x-6 ml-6">
          <FaSearch className="text-white text-2xl cursor-pointer hover:text-purple-500" />
          <button onClick={() => setIsCartOpen(true)}>
            <FaShoppingCart className="text-white text-2xl cursor-pointer hover:text-purple-500" />
          </button>
          <button className="hidden sm:block bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-all">
            Join Us
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="sm:hidden text-white text-2xl">
            <FaBars />
          </button>
        </div>
      </div>

      {isCartOpen && (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/70 z-50">
    <div className="bg-white w-full max-w-4xl p-20 rounded-xl shadow-2xl relative">
      <button className="absolute top-4 right-6 text-gray-500 text-6xl" onClick={() => setIsCartOpen(false)}>
        &times;
      </button>
      <p className="text-2xl font-semibold text-center">
        You have <span className="font-bold">{cartItems}</span> items in your cart
      </p>
      <div className="flex justify-center mt-20">
      <Link to="/shop" className="bg-black  text-white  px-6 py-4 rounded-md font-semibold hover:bg-gray-800" onClick={() => setIsCartOpen(false)}>
  Go to Shopping
</Link>

      </div>
    </div>
  </div>
      )}
    </header>
  );
};

export default Header;
