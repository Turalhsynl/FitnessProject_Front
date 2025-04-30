import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Checkout() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const accessToken = Cookies.get("accessToken");

  let userId = null;
  let userEmail = null;
  try {
    const decodedToken = jwt_decode(accessToken);
    userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    userEmail = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
  } catch (error) {
    setErrorMessage("Invalid access token");
  }

  useEffect(() => {
    if (!userId) return;
    fetch(`https://fitgym.com.az/api/Cart/get/${userId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch cart");
        }
        return response.json();
      })
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

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
  
    if (!cart || cart.cartLines.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
  
    setIsPlacingOrder(true);
  
    try {
      const createPaymentResponse = await fetch(`https://fitgym.com.az/api/Stripe/create-payment`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: getTotalPrice(),
          email: userEmail,
        }),
      });
  
      if (!createPaymentResponse.ok) {
        throw new Error("Failed to create payment");
      }
  
      const createPaymentData = await createPaymentResponse.json();
      const paymentIntentId = createPaymentData.paymentIntentId;
  
      const confirmPaymentResponse = await fetch(`https://fitgym.com.az/api/Stripe/confirm-payment`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentIntentId: paymentIntentId,
          paymentMethodId: "pm_card_visa",
        }),
      });
  
      if (!confirmPaymentResponse.ok) {
        throw new Error("Failed to confirm payment");
      }
  
      const confirmPaymentData = await confirmPaymentResponse.json();
  
      if (confirmPaymentData.status === "Payment successful") {
        toast.success("Payment successful!");
  
        const createOrderResponse = await fetch(`https://fitgym.com.az/api/Order`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: parseInt(userId),
            totalAmount: getTotalPrice(),
            orderLines: cart.cartLines.map((item) => ({
              productId: item.product.id,
              quantity: item.quantity,
              price: item.product.price,
            })),
          }),
        });
  
        if (!createOrderResponse.ok) {
          throw new Error("Failed to create order");
        }
  
        toast.success("Order created successfully!");
  
        setCart({
          ...cart,
          cartLines: [],
        });
      } else {
        toast.error("Payment failed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("There was an error processing your payment.");
    } finally {
      setIsPlacingOrder(false);
    }
  
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <div className="min-h-screen bg-white mt-20">
      <div
        className="h-72 flex items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/your-image-path/4e2d7efa-f52f-4138-9ad9-177ac597effc.png')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="relative text-5xl font-bold text-white">CHECKOUT</h1>
      </div>

      <div className="py-10 px-4 mt-10">
        <form className="max-w-5xl mx-auto space-y-8" onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border p-6 rounded-md space-y-5">
              <h3 className="text-lg font-semibold mb-4">Billing details</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-gray-700">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input type="text" className="w-full border p-2 rounded-md" required />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700">
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <input type="text" className="w-full border p-2 rounded-md" required />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-gray-700">Company name (optional)</label>
                <input type="text" className="w-full border p-2 rounded-md" />
              </div>

              <div>
                <label className="block mb-1 text-gray-700">
                  Country / Region <span className="text-red-500">*</span>
                </label>
                <select className="w-full border p-2 rounded-md" required>
                  <option>United States (US)</option>
                  <option>United Kingdom (UK)</option>
                  <option>Turkey</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-gray-700">
                  Street address <span className="text-red-500">*</span>
                </label>
                <input type="text" className="w-full border p-2 rounded-md" required />
                <input type="text" className="w-full border p-2 rounded-md mt-2" />
              </div>

              <div>
                <label className="block mb-1 text-gray-700">
                  Town / City <span className="text-red-500">*</span>
                </label>
                <input type="text" className="w-full border p-2 rounded-md" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-gray-700">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full border p-2 rounded-md" required>
                    <option>California</option>
                    <option>New York</option>
                    <option>Texas</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-gray-700">
                    ZIP Code <span className="text-red-500">*</span>
                  </label>
                  <input type="text" className="w-full border p-2 rounded-md" required />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-gray-700">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input type="tel" className="w-full border p-2 rounded-md" required />
              </div>

              <div>
                <label className="block mb-1 text-gray-700">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input type="email" className="w-full border p-2 rounded-md" required />
              </div>
            </div>

            <div className="space-y-6">
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

                    <div className="border-t pt-4 flex justify-between font-bold">
                      <span>Total</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between font-bold">
                      <span>Total Items</span>
                      <span>{getTotalQuantity()}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="border p-6 rounded-md space-y-5">
                <h3 className="text-lg font-semibold mb-4">Card Payment</h3>

                {/* Static Card Payment Form */}
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

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold text-lg"
                disabled={isPlacingOrder}
              >
                {isPlacingOrder ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
