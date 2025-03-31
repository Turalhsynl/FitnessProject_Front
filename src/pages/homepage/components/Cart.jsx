import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

const Cart = ({ cartItems, cart, setIsCartOpen, handleRemoveFromCart }) => (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/70 z-50">
    <div className="fixed top-0 right-0 w-full md:w-[400px] h-full bg-white shadow-lg z-50 transition-transform transform translate-x-0">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-bold">YOUR BAG</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-3xl cursor-pointer">&times;</button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 p-6 text-center">
            <img src="https://www.gymshark.com/images/empty-bag.svg" alt="Empty Cart" className="w-24 h-24 mb-4" />
            <h3 className="text-lg font-bold">YOUR BAG IS EMPTY</h3>
            <p className="text-gray-500 text-sm">There are no products in your bag</p>
            <button className="mt-4 w-full bg-black text-white py-2 rounded-md font-semibold">
              SHOP MENS
            </button>
            <button className="mt-2 w-full bg-black text-white py-2 rounded-md font-semibold">
              SHOP WOMENS
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-4">
                <img src={item.product.imageUrl} alt={item.productName} className="w-32 h-36 rounded cursor-pointer" />
                <div className="flex-1 ml-4">
                  <p className="font-medium text-gray-600 cursor-pointer">{item.productName}</p>
                  <p className="text-gray-500 text-sm">{item.product.description}</p>
                  <p className="font-bold">${item.product.price}</p>
                  <div className="flex mt-2 justify-between">
                  <button className="mt-4 cursor-pointer">
                    <i className="fa-regular fa-heart fa-xl"></i>
                  </button>
                  <button className="mt-4 mr-24 p-2 cursor-pointer" onClick={() => handleRemoveFromCart(item.product.id)}>
                    <Trash2 className="text-red-500" size={20} />
                  </button>
                  <p className="text-black font-bold mt-6 cursor-pointer">Qty: {item.quantity}</p>
                </div>
                
                </div>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="p-6 border-t">
            <p className="text-lg font-bold">Total: ${cart.totalPrice}</p>
            <div className="mt-4 flex flex-col space-y-2">
              <Link to="/shop" className="bg-black text-white py-3 rounded-md text-center font-semibold">
                Continue Shopping
              </Link>
              <Link to="/checkout" className="bg-purple-600 text-white py-3 rounded-md text-center font-semibold">
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default Cart;
