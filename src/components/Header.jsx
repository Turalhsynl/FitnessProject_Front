import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FaSearch, FaShoppingCart, FaBars } from "react-icons/fa";

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const cartItems = 0;

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 350);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

import { FaUserCircle } from "react-icons/fa";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    if (accessToken) {
      try {
        const decodedToken = jwt_decode(accessToken);
        const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  
        const fetchUserData = async () => {
          try {
            const response = await fetch(
              `https://localhost:7298/api/User/GetById?Id=${userId}`,
              {
                method: "GET",
                headers: {
                  "Authorization": `Bearer ${accessToken}`,
                },
              }
            );
  
            if (response.ok) {
              const data = await response.json();
              console.log("Fetched User Data:", data);
              setUserData(data.data);
            } else {
              console.error("User not found or API error", response.statusText);
            }
          } catch (error) {
            console.error("User data fetch error:", error);
          }
        };
  
        fetchUserData();
      } catch (error) {
        console.error("Token decode error:", error);
      }
    }
  }, [accessToken]);
  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    // <header className={`fixed top-0 left-0 w-full z-50 px-6 sm:px-8 md:px-12 py-4 transition-all duration-300 ${isScrolled ? "bg-black" : "bg-transparent"}`}>
    //   <div className="flex justify-between items-center text-white">
    //     <h1 className="text-white text-4xl font-extrabold italic">
    //       <span className="text-purple-500">FIT</span>GYM
    //     </h1>
    //     <nav className="hidden sm:flex sm:space-x-8 md:space-x-10 text-lg font-medium ml-auto">
    //       <Link to="/" className="relative hover:text-purple-500 after:block after:h-1 after:bg-purple-500 after:w-full after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">Home</Link>
    //       <Link to="/about" className="relative hover:text-purple-500 after:block after:h-1 after:bg-purple-500 after:w-full after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">About Us</Link>
    //       <Link to="/classes" className="relative hover:text-purple-500 after:block after:h-1 after:bg-purple-500 after:w-full after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">Classes</Link>
    //       <Link to="/contact" className="relative hover:text-purple-500 after:block after:h-1 after:bg-purple-500 after:w-full after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">Contact Us</Link>
    //       <Link to="/shop" className="relative hover:text-purple-500 after:block after:h-1 after:bg-purple-500 after:w-full after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">Shop</Link>
    //     </nav>
    //     <div className="flex items-center space-x-6 ml-6">
    //       <FaSearch className="text-white text-2xl cursor-pointer hover:text-purple-500" />
    //       <button onClick={() => setIsCartOpen(true)}>
    //         <FaShoppingCart className="text-white text-2xl cursor-pointer hover:text-purple-500" />
    //       </button>
    //       <button className="hidden sm:block bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-all">
    //         Join Us
    //       </button>
    //       <button onClick={toggleMenu} className="sm:hidden text-white text-2xl relative">
    //         <FaBars className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} />
    //       </button>
    //     </div>
    //   </div>

    //   {isCartOpen && (
    //     <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/70 z-50">
    //       <div className="bg-white w-full max-w-4xl p-20 rounded-xl shadow-2xl relative">
    //         <button className="absolute top-4 right-6 text-gray-500 text-6xl" onClick={() => setIsCartOpen(false)}>
    //           &times;
    //         </button>
    //         <p className="text-2xl font-semibold text-center">
    //           You have <span className="font-bold">{cartItems}</span> items in your cart
    //         </p>
    //         <div className="flex justify-center mt-20">
    //           <Link to="/shop" className="bg-black text-white px-6 py-4 rounded-md font-semibold hover:bg-gray-800" onClick={() => setIsCartOpen(false)}>
    //             Go to Shopping
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //   )}

    //   <div className={`sm:hidden fixed top-0 left-0 w-full h-full bg-black text-white text-center transition-all duration-300 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
    //     <nav className="space-y-6 py-20">
    //       <Link to="/" className="block py-4 text-2xl hover:bg-primary" onClick={closeMenu}>Home</Link>
    //       <Link to="/about" className="block py-4 text-2xl hover:bg-primary" onClick={closeMenu}>About Us</Link>
    //       <Link to="/classes" className="block py-4 text-2xl hover:bg-primary" onClick={closeMenu}>Classes</Link>
    //       <Link to="/blog" className="block py-4 text-2xl hover:bg-primary" onClick={closeMenu}>Blog</Link>
    //       <Link to="/contact" className="block py-4 text-2xl hover:bg-primary" onClick={closeMenu}>Contact</Link>
    //       <Link to="/shop" className="block py-4 text-2xl hover:bg-primary" onClick={closeMenu}>Shop</Link>
    //       <Link to="/cart" className="block py-4 text-2xl hover:bg-primary" onClick={closeMenu}>Cart</Link>
    //     </nav>
    //     <button onClick={closeMenu} className="absolute top-6 right-10 text-3xl text-white">
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

      {accessToken ? (
        <div className="relative">
          <FaUserCircle
            className="text-3xl cursor-pointer"
            title="Profile"
            onClick={toggleProfile}
          />

          {isProfileOpen && userData && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-md rounded-md p-3">
              <p className="text-lg font-bold text-center">{userData.firstname} {userData.lastname}</p>
              <p className="text-sm text-gray-500 text-center">{userData.email}</p>
              <hr className="my-2" />
              <button
                onClick={() => {
                  Cookies.remove("accessToken");
                  setUserData(null);
                  setIsProfileOpen(false);
                }}
                className="w-full bg-red-600 text-white py-2 rounded-md text-center"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link to="/login" className="hidden sm:block bg-[#5E3AD4] text-dark px-5 py-1">
          Join Our Club
        </Link>
      )}

      <div className="sm:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white">
          <i className={`fas fa-bars text-2xl ${isMenuOpen ? "rotate-90" : ""} transition-transform duration-300`}></i>
        </button>
      </div>

      <div
        className={`sm:hidden fixed top-0 left-0 w-full h-full bg-black text-white text-center transition-all duration-300 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={closeMenu}
      >
        <nav className="space-y-6 py-20">
          <Link to="/" className="block py-4 text-2xl hover:bg-primary">Home</Link>
          <Link to="/about" className="block py-4 text-2xl hover:bg-primary">About Us</Link>
          <Link to="/classes" className="block py-4 text-2xl hover:bg-primary">Classes</Link>
          <Link to="/blog" className="block py-4 text-2xl hover:bg-primary">Blog</Link>
          <Link to="/contact" className="block py-4 text-2xl hover:bg-primary">Contact</Link>
        </nav>

        <button onClick={closeMenu} className="absolute top-6 right-6 text-3xl text-white">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
