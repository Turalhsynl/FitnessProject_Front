import React from 'react';

const Cart = ({ cart =[] }) => {
  return (
    <div className="container mx-auto mt-8 p-8 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="flex items-center justify-between mb-4">
              <p>{item.name}</p>
              <p>${item.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
