import { useEffect, useState } from 'react';
import Cart from '../cartpage/Cart';

const Shop = () => {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    fetch('https://localhost:7298/api/Product/GetAll', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => { console.log(data); setProducts(data)})
    
    .catch(error => console.error('Error fetching products:', error));
  }, []);
  
  return (
    <div className="min-h-screen bg-white text-black">
      <header className="relative bg-cover bg-center bg-no-repeat h-[610px] bg-[url('https://max-themes.net/demos/gym/gym/gym/upload/page-title.jpg')] text-white bg-black/20 bg-blend-overlay flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold italic">SHOP</h1>
      </header>
      <div className="container mx-auto py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {products.length === 0 ? (
          <p>Loading products...</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="lg:h-[400px] md:h-[400px] w-full"
              />
              <div className="p-4">
                <p className="text-gray-500 line-through"></p>
                <p className="text-xl font-semibold">${product.price}</p>
                <h2 className="text-lg">{product.name}</h2>
                <button
                 
                  className="mt-4 px-4 py-2 bg-black text-white w-full rounded"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
    </div>
  );
};

export default Shop;
