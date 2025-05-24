import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Cookies from "js-cookie";

const CheckoutForm = ({ selectedPrograms, selectedPlanId }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");

  const getPlanPrice = (planId) => {
    switch (planId) {
      case 2:
        return 9.90;
      case 3:
        return 19.90;
      case 4:
        return 49.90;
      default:
        return 49.90;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const amount = getPlanPrice(selectedPlanId);

    const res1 = await fetch("https://localhost:7298/api/Stripe/create-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      body: JSON.stringify({
        amount,
        email,
      }),
    });

    const data1 = await res1.json();
    const paymentIntentId = data1.paymentIntentId;

    const paymentMethodId = "pm_card_visa";

    const res2 = await fetch("https://localhost:7298/api/Stripe/confirm-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      body: JSON.stringify({
        paymentIntentId,
        paymentMethodId,
      }),
    });

    const data2 = await res2.json();

    if (data2.status === "Payment successful") {
      alert("Payment completed succesfully");
    } else {
      alert("Payment Error! try again");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <div className="border border-gray-300 rounded-md p-4 bg-white text-black">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#000",
                "::placeholder": {
                  color: "#888",
                },
              },
              invalid: {
                color: "#e5424d",
              },
            },
          }}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
      >
        Pay Now
      </button>
    </form>
  );
};

export default CheckoutForm;
