import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";


const CheckoutForm = ({ selectedPrograms, selectedPlanId }) => {
  const stripe = useStripe();
  const elements = useElements();
    const accessToken = Cookies.get("accessToken");
    const decodedToken = jwt_decode(accessToken);
    const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    

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
      alert("Payment completed successfully");
      selectedPrograms.forEach(programId => {
        fetch("https://localhost:7298/api/UserProgram/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({ userId, programId })
        })
        .then(res => {
          if (!res.ok) throw new Error(`Failed for program ID ${programId}`);
          return res.json();
        })
        .catch(err => {
          console.error(`Error assigning program ${programId}:`, err);
        });
      });
    } else {
      alert("Payment Error! Try again.");
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
