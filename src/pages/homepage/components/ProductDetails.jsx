import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const ProductDetails = () => {
  const location = useLocation();
  const product = location.state?.product;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  if (!product) return <p>Product not found!</p>;

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="relative bg-cover bg-center h-[610px] bg-[url('https://max-themes.net/demos/gym/gym/gym/upload/page-title.jpg')] text-white flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold italic">SHOP</h1>
      </header>

      <div className="min-h-screen bg-white text-black flex flex-col md:flex-row gap-8 justify-center items-center">
        <div className="md:w-1/2 flex flex-col">
          <img src={product.imageUrl} alt={product.name} className="w-[1000px]" />
        </div>
        <div className="md:w-1/2 space-y-6 flex flex-col mb-[150px] items-center text-center">
          <span className="bg-gray-200 text-gray-700 px-3 py-1 text-xs font-semibold rounded-full">NEW</span>
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold">${product.price}</p>
          <div className="flex items-center space-x-1 text-gray-700">
            <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
            <p className="text-gray-500 text-sm">{product.reviews}</p>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">{product.color}</p>
            <div className="flex space-x-2 justify-center">
              <div
                className="w-8 h-8 rounded-full border-2 border-gray-500"
                style={{ backgroundColor: product.color }} 
              ></div>
            </div>
          </div>

          <button className="bg-black text-white px-6 py-3 w-64 rounded-lg font-bold hover:bg-gray-800 transition">
            ADD TO BAG
          </button>
          <div className="w-full max-w-lg">
            <div className="flex items-center justify-between border-b py-4 cursor-pointer" onClick={() => setIsModalOpen(true)}>
              <p className="text-lg font-semibold">DESCRIPTION</p>
              <span>&gt;</span>
            </div>
            <div className="flex items-center justify-between border-b py-4 cursor-pointer" onClick={() => setIsDeliveryOpen(!isDeliveryOpen)}>
              <p className="text-lg font-semibold">DELIVERY & RETURNS</p>
              <span>&gt;</span>
            </div>
            {isDeliveryOpen && (
              <div className="p-4 border-b">
                <p>Standard delivery within 5-7 business days. Free returns within 30 days.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/40 z-50">
          <div className="fixed top-0 right-0 w-full md:w-[700px] h-full bg-white shadow-lg z-50 transition-transform transform translate-x-0">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-lg font-bold">Description</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-3xl cursor-pointer">&times;</button>
              </div>
              <div className="p-6 flex-1 overflow-y-auto">
                <h2 className="font-bold">WAKE AND SHAKE</h2>
                <p>
                  Shake, shred and succeed. The ideal shaker bottle for pre-workouts, post-workouts and hydrating in between.
                  Take advantage of the content measurements to keep track of your hydration throughout your fitness transformation.
                  Complete with a metal mixer ball for the perfect blend.
                </p>
                <p className="font-bold">Note:</p>
                <p>For hygiene reasons, all our bottles and shakers are non-refundable.</p>
                <ul className="list-disc pl-5">
                  <li>14oz protein shaker</li>
                  <li>Not dishwasher safe</li>
                  <li>Do not microwave</li>
                  <li>Material: polypropylene & polyethylene</li>
                  <li>Shaker size: 3.3in x 7.2in</li>
                  <li>SKU: I13A3A-BBBB</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
