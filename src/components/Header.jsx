import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FaSearch, FaShoppingCart, FaBars } from "react-icons/fa";


import { FaUserCircle } from "react-icons/fa";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState([])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 350);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  },[]);

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
  

  useEffect(() => {
    if (accessToken) {
      const decodedToken = jwt_decode(accessToken);
      const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

      if (userId && isCartOpen) {
        const fetchCartData = async () => {
          try {
            const response = await fetch(`https://localhost:7298/api/Cart/${userId}`);

            if (!response.ok) {
              throw new Error(`Failed to fetch cart, status: ${response.status}`);
            }

            const text = await response.text();
            const data = text.startsWith("{") ? JSON.parse(text) : null;

            if (data) {
              setCartItems(data.cartLines || []);
              setCart(data || []);
            } else {
              console.error('Unexpected response format:', text);
            }
          } catch (error) {
            console.error('Error fetching cart:', error);
          }
        };

        fetchCartData();
      }
    }
  }, [accessToken, isCartOpen]);
  


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCartOpen]);
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
      <Link to="/contact" className="relative hover:text-purple-500 after:block after:h-1 after:bg-purple-500 after:w-full after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">Contact Us</Link>
      <Link to="/shop" className="relative hover:text-purple-500 after:block after:h-1 after:bg-purple-500 after:w-full after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">Shop</Link>
    </nav>

     <div className="flex items-center space-x-6 ml-6">
      <FaSearch className="text-white text-2xl cursor-pointer hover:text-purple-500" />
       <button onClick={() => setIsCartOpen(true)}>
       <FaShoppingCart className="text-white text-2xl cursor-pointer hover:text-purple-500" />
       </button>
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
        <Link to="/login" className="hidden sm:block bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-all">
        Join Our Club
      </Link>
      )}

     <button onClick={toggleMenu} className="sm:hidden text-white text-2xl relative">
       <FaBars className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} />
     </button>
    </div>
    </div>

    {isCartOpen && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/70 z-50">
    <div className="fixed top-0 right-0 w-full md:w-[400px] h-full bg-white shadow-lg z-50 transition-transform transform translate-x-0">
    <div className="flex flex-col h-full">
      {/* Sepet Başlık */}
      <div className="flex items-center justify-between p-6 border-b">
        <h2 className="text-lg font-bold">YOUR BAG</h2>
        <button onClick={() => setIsCartOpen(false)} className="text-3xl cursor-pointer">&times;</button>
      </div>

      {/* Boş Sepet Durumu */}
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 p-6 text-center">
          <img src="https://www.gymshark.com/images/empty-bag.svg" alt="Empty Cart" className="w-24 h-24 mb-4" />
          <h3 className="text-lg font-bold">YOUR BAG IS EMPTY</h3>
          <p className="text-gray-500 text-sm">There are no products in your bag</p>
          <button className="mt-4 w-full bg-black text-white py-2 rounded-md font-semibold">
            SHOP MENS
          </button>
          <button className="mt-2 w-full bg-black text-white py-2 rounded-md font-semibold">
            SHOP WOMENS
          </button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between border-b pb-4">
              <img src={item.product.imageUrl} alt={item.productName} className="w-16 h-16 rounded" />
              <div className="flex-1 ml-4">
                <p className="font-medium">{item.productName}</p>
                <p className="text-gray-500 text-sm">{item.product.description}</p>
                <p className="text-gray-700 text-sm">Qty: {item.quantity}</p>
              </div>
              <p className="font-bold">${item.product.price}</p>
            </div>
          ))}
        </div>
      )}

      {/* Footer - Toplam ve Ödeme */}
      {cartItems.length > 0 && (
        <div className="p-6 border-t">
          <p className="text-lg font-bold">Total: ${cart.totalPrice}</p>
          <div className="mt-4 flex flex-col space-y-2">
            <Link to="/shop" className="bg-black text-white py-3 rounded-md text-center font-semibold">
              Continue Shopping
            </Link>
            <Link to="/checkout" className="bg-purple-600 text-white py-3 rounded-md text-center font-semibold">
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  </div>
  </div>
)}



   <div className={`sm:hidden fixed top-0 left-0 w-full h-full bg-black text-white text-center transition-all duration-300 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
       <nav className="space-y-6 py-20">
          <Link to="/" className="block py-4 text-2xl hover:bg-primary" onClick={closeMenu}>Home</Link>
          <Link to="/about" className="block py-4 text-2xl hover:bg-primary" onClick={closeMenu}>About Us</Link>
          <Link to="/classes" className="block py-4 text-2xl hover:bg-primary" onClick={closeMenu}>Classes</Link>
          <Link to="/blog" className="block py-4 text-2xl hover:bg-primary" onClick={closeMenu}>Blog</Link>
         <Link to="/contact" className="block py-4 text-2xl hover:bg-primary" onClick={closeMenu}>Contact</Link>
         <Link to="/shop" className="block py-4 text-2xl hover:bg-primary" onClick={closeMenu}>Shop</Link>
         <Link to="/cart" className="block py-4 text-2xl hover:bg-primary" onClick={closeMenu}>Cart</Link>
       </nav>
       <button onClick={closeMenu} className="absolute top-6 right-10 text-3xl text-white"> <i className="fas fa-times"></i></button>
    </div>


    </header>
  );
};

export default Header;