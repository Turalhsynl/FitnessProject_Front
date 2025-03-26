import React from "react";

const CartModal = ({ isOpen, onClose, cartItems }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button className="absolute top-2 right-3 text-gray-500 text-2xl" onClick={onClose}>
          &times;
        </button>
        <p className="text-lg font-semibold text-center">
          You have <span className="font-bold">{cartItems}</span> items in your cart
        </p>
        <div className="flex justify-center mt-4">
          <button className="bg-black text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-800">
            Go to Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
