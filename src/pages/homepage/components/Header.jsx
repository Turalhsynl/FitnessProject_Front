import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import ProfileDropdown from "../components/ProfileDropdown";
import Cart from "../components/Cart";
import MobileMenu from "../components/MobileMenu";
import { FaSearch, FaShoppingCart, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Chat from "../components/Chat";
import Checkout from "../../checkout/Checkout";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState([]);
  const isShopPage = location.pathname === "/shop";


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
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCartOpen]);

  useEffect(() => {
    if (accessToken) {
      const decodedToken = jwt_decode(accessToken);
      const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  
      const fetchCartId = async () => {
        try {
          const response = await fetch(`https://localhost:7298/api/Cart/get/${userId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          });
  
          if (!response.ok) {
            throw new Error(`Reason ID was not received, status: ${response.status}`);
          }
  
          const data = await response.json();
          const cartId = data.id;
  
          if (cartId) {
            const fetchCartData = async () => {
              try {
                const cartResponse = await fetch(`https://localhost:7298/api/Cart/${cartId}`, {
                  method: 'GET',
                  headers: {
                    'Authorization': `Bearer ${accessToken}`,
                  },
                });
  
                if (!cartResponse.ok) {
                  throw new Error(`Cart information not retrieved, status: ${cartResponse.status}`);
                }
  
                const cartData = await cartResponse.json();
                setCartItems(cartData.cartLines || []);
                setCart(cartData);
              } catch (error) {
                console.error('Error retrieving cart information:', error);
              }
            };
  
            fetchCartData();
          } else {
            console.error("Cart ID does not exist.");
          }
        } catch (error) {
          console.error('Error getting Cart ID:', error);
        }
      };
  
      if (userId && isCartOpen) {
        fetchCartId();
      }
    }
  }, [accessToken, isCartOpen]);
  


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const handleRemoveFromCart = (productId) => {
    if (!cart || !cart.id) return;
  
    const productToRemove = cartItems.find(item => item.product.id === productId);
  
    if (!productToRemove) return;
  
    const productPrice = productToRemove.product.price;
    const productQuantity = productToRemove.quantity;
  
    fetch(`https://localhost:7298/api/Cart/remove-product/${cart.id}/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("The product could not be deleted.");
    })
    .then(() => {
      setCartItems(prev => prev.filter(item => item.product.id !== productId));
  
      setCart(prev => ({
        ...prev,
        totalPrice: prev.totalPrice - (productPrice * productQuantity),
      }));
    })
    .catch(error => console.error("Error during deletion:", error));
  };

  
  
  return (
    <header className={`fixed top-0 left-0 w-full z-50 px-6 sm:px-8 md:px-12 py-4 transition-all duration-300 ${isScrolled ? "bg-black" : "bg-transparent"}`}>
      <div className="flex justify-between items-center text-white">
        <Logo />
        <Navigation />
        <div className="text-black"> 
    {
      accessToken ? <Chat/> : <></>
    }
  </div>
        <div className="flex items-center space-x-6 ml-6">
        {isShopPage}
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
      {isCartOpen && <Cart cartItems={cartItems} cart={cart} setIsCartOpen={setIsCartOpen} handleRemoveFromCart={handleRemoveFromCart} />}
      <MobileMenu isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
    </header>
    
  );
};
export default Header;
