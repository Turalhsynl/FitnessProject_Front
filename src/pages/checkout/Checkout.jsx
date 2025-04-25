import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"; // Cookies module
import jwt_decode from "jwt-decode"; // jwt-decode module

export default function Checkout() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Access token from cookies
  const accessToken = Cookies.get("accessToken");

  // Decode the JWT token to extract the userId
  const decodedToken = jwt_decode(accessToken);
  const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

  useEffect(() => {
    // API request with Authorization header
    fetch(`https://localhost:7298/api/Cart/get/${userId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`, // Authorization header
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCart(data);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage("Error fetching cart data");
        setLoading(false);
      });
  }, [accessToken, userId]);

  const getTotalPrice = () => {
    if (!cart) return 0;
    return cart.cartLines.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const getTotalQuantity = () => {
    if (!cart) return 0;
    return cart.cartLines.reduce((total, item) => total + item.quantity, 0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <div className="min-h-screen bg-white mt-20">
      {/* Header with Background Image */}
      <div
        className="h-72 flex items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/your-image-path/4e2d7efa-f52f-4138-9ad9-177ac597effc.png')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="relative text-5xl font-bold text-white">CHECKOUT</h1>
      </div>

      {/* Main Checkout Form */}
      <div className="py-10 px-4 mt-10">
        <form className="max-w-5xl mx-auto space-y-8">
          {/* Billing Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Side - Billing */}
            <div className="border p-6 rounded-md space-y-5">
              <h3 className="text-lg font-semibold mb-4">Billing details</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-gray-700">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700">
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded-md"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-gray-700">
                  Company name (optional)
                </label>
                <input
                  type="text"
                  className="w-full border p-2 rounded-md"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700">
                  Country / Region <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full border p-2 rounded-md"
                  required
                >
                  <option>United States (US)</option>
                  <option>United Kingdom (UK)</option>
                  <option>Turkey</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-gray-700">
                  Street address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border p-2 rounded-md"
                  required
                />
                <input
                  type="text"
                  className="w-full border p-2 rounded-md mt-2"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700">
                  Town / City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border p-2 rounded-md"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-gray-700">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full border p-2 rounded-md"
                    required
                  >
                    <option>California</option>
                    <option>New York</option>
                    <option>Texas</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-gray-700">
                    ZIP Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded-md"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-gray-700">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  className="w-full border p-2 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className="w-full border p-2 rounded-md"
                  required
                />
              </div>
            </div>

            {/* Right Side - Your Order and Payment */}
            <div className="space-y-6">
              {/* Your Order */}
              <div className="border p-6 rounded-md space-y-4">
                <h3 className="text-lg font-semibold mb-4">Your order</h3>

                {cart.cartLines.length === 0 ? (
                  <div>Your cart is empty.</div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {cart.cartLines.map((item) => (
                        <div key={item.product.id} className="flex justify-between">
                          <span>
                            {item.product.name} × {item.quantity}
                          </span>
                          <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Total Price */}
                    <div className="border-t pt-4 flex justify-between font-bold">
                      <span>Total</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>

                    {/* Total Quantity */}
                    <div className="flex justify-between font-bold">
                      <span>Total Items</span>
                      <span>{getTotalQuantity()}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Card Payment Section */}
              <div className="border p-6 rounded-md space-y-5">
                <h3 className="text-lg font-semibold mb-4">Card Payment</h3>

                <div>
                  <label className="block mb-1 text-gray-700">
                    Card Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full border p-2 rounded-md"
                    maxLength="19"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-gray-700">
                      Expiration Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full border p-2 rounded-md"
                      maxLength="5"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-gray-700">
                      CVV <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      placeholder="123"
                      className="w-full border p-2 rounded-md"
                      maxLength="4"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold text-lg"
                disabled={loading}
              >
                {loading ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
