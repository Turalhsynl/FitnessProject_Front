import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_XXXXXXX");

const CheckoutButton = ({ selectedPrograms, selectedPlanId }) => {
  const handleCheckout = async () => {
    try {
      const res = await fetch("https://localhost:7298/api/payment/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        body: JSON.stringify({ selectedPrograms, selectedPlanId }),
      });

      const session = await res.json();
      const stripe = await stripePromise;

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.error("Stripe checkout error", error);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold"
    >
      Pay with Stripe
    </button>
  );
};


export default CheckoutButton;