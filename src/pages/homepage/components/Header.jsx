import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import ProfileDropdown from "../components/ProfileDropdown";
import Cart from "../components/Cart";
import MobileMenu from "../components/MobileMenu";
import { FaSearch, FaShoppingCart, FaBars } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState([]);

  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 350);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (accessToken) {
      try {
        const decodedToken = jwt_decode(accessToken);
        const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        const fetchUserData = async () => {
          try {
            const response = await fetch(`https://localhost:7298/api/User/GetById?Id=${userId}`, {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${accessToken}`,
              },
            });
            if (response.ok) {
              const data = await response.json();
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
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  return (
    <header className={`fixed top-0 left-0 w-full z-50 px-6 sm:px-8 md:px-12 py-4 transition-all duration-300 ${isScrolled ? "bg-black" : "bg-transparent"}`}>
      <div className="flex justify-between items-center text-white">
        <Logo />
        <Navigation />
        <div className="flex items-center space-x-6 ml-6">
          <FaSearch className="text-white text-2xl cursor-pointer hover:text-purple-500" />
          <button onClick={() => setIsCartOpen(true)}>
            <FaShoppingCart className="text-white text-2xl cursor-pointer hover:text-purple-500" />
          </button>
          {accessToken ? (
            <ProfileDropdown
              userData={userData}
              setUserData={setUserData}
              setIsProfileOpen={setIsProfileOpen}
              isProfileOpen={isProfileOpen}
            />
          ) : (
            <Link to="/login" className="hidden sm:block bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-all">Join Our Club</Link>
          )}
          <button onClick={toggleMenu} className="sm:hidden text-white text-2xl relative">
            <FaBars className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} />
          </button>
        </div>
      </div>
      {isCartOpen && <Cart cartItems={cartItems} cart={cart} setIsCartOpen={setIsCartOpen} />}
      <MobileMenu isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
    </header>
  );
};
export default Header;
