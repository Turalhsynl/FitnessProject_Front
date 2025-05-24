import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./ChechkoutForm";

const stripePromise = loadStripe("pk_test_XXX");

const CheckoutModal = ({ selectedPrograms, selectedPlanId, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
            <div className="bg-white text-black rounded-lg p-8 max-w-md w-full relative shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-xl font-bold text-gray-600"
                >
                    ×
                </button>
                <h2 className="text-2xl font-bold mb-4">Enter Your Card Details</h2>
                <Elements stripe={stripePromise}>
                    <CheckoutForm selectedPrograms={selectedPrograms} selectedPlanId={selectedPlanId} />
                </Elements>

            </div>
        </div>
    );
};

export default CheckoutModal;
