// import { useEffect, useState } from 'react';
// import Cookies from 'js-cookie';
// const Shop = () => {
//   const [products, setProducts] = useState([]);
//   const accessToken = Cookies.get("accessToken");

//   useEffect(() => {
//     if (!accessToken) {
//       console.error("Unauthorized: No token found.");
//       return;
//     }

//     fetch('https://localhost:7298/api/Product/GetAll', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${accessToken}`,
//       }
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       setProducts(data);
//     })
//     .catch(error => console.error('Error fetching products:', error));
//   }, [accessToken]);

//   return (
//     <div className="min-h-screen bg-white text-black">
//       <header className="relative bg-cover bg-center bg-no-repeat h-[610px] bg-[url('https://max-themes.net/demos/gym/gym/gym/upload/page-title.jpg')] text-white bg-black/20 bg-blend-overlay flex flex-col justify-center items-center">
//         <h1 className="text-6xl font-bold italic">SHOP</h1>
//       </header>
//       <div className="container mx-auto py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
//         {products.length === 0 ? (
//           <p>Loading products...</p>
//         ) : (
//           products.map((product) => (
//             <div key={product.id} className="border rounded-lg overflow-hidden">
//               <img
//                 src={product.imageUrl}
//                 alt={product.name}
//                 className="lg:h-[400px] md:h-[400px] w-full"
//               />
//               <div className="p-4">
//                 <p className="text-gray-500 line-through"></p>
//                 <p className="text-xl font-semibold">${product.price}</p>
//                 <h2 className="text-lg">{product.name}</h2>
//                 <button
                 
//                   className="mt-4 px-4 py-2 bg-black text-white w-full rounded"
//                 >
//                   ADD TO CART
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
      
//     </div>
//   );
// };

// export default Shop;


//potensial kod//////
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cartId, setCartId] = useState(null); 
  const accessToken = Cookies.get("accessToken");
  const decodedToken = jwt_decode(accessToken);
  const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

  useEffect(() => {
    if (!accessToken) {
      console.error("Unauthorized: No token found.");
      return;
    }

    fetch('https://localhost:7298/api/Product/GetAll', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      setProducts(data);
    })
    .catch(error => console.error('Error fetching products:', error));

    fetch(`https://localhost:7298/api/Cart/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    })
    .then(response => response.json())
    .then(cart => {
      if (cart) {
        setCartId(cart.id);
      } else {
        console.log("Səbət tapılmadı");
      }
    })
    .catch(error => console.error('Error fetching cart:', error));

  }, [accessToken]);

  const handleAddToCart = (productId) => {
    if (!cartId) {
      console.log("Səbətiniz mövcud deyil. Yeni səbət yaradılacaq.");
    }

    fetch('https://localhost:7298/api/Cart/add-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        cartId: cartId,
        productId: productId,
        quantity: 1 
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Məhsul səbətə əlavə edildi:", data);
    })
    .catch(error => console.error("Məhsul əlavə edərkən xəta:", error));
  };

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
                  onClick={() => handleAddToCart(product.id)} 
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
