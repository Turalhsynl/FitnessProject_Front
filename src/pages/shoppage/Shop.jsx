// import { useEffect, useState } from 'react';
// import Cookies from 'js-cookie';
// import jwt_decode from "jwt-decode";
// import { CheckCircle, Loader2 } from "lucide-react";

// const Shop = () => {
//   const [products, setProducts] = useState([]);
//   const [cartId, setCartId] = useState(null);
//   const [loading, setLoading] = useState(null);
//   const [added, setAdded] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [sortBy, setSortBy] = useState('price-asc');

//   const accessToken = Cookies.get("accessToken");
//   const decodedToken = jwt_decode(accessToken);
//   const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

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
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         setProducts(data);
//       })
//       .catch(error => console.error('Error fetching products:', error));

//     fetch('https://localhost:7298/api/Category/GetAllCategory', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${accessToken}`,
//       }
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         setCategories(data);
//       })
//       .catch(error => console.error('Error fetching categories:', error));

//     fetch(`https://localhost:7298/api/Cart/get/${userId}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${accessToken}`,
//       }
//     })
//       .then(response => response.json())
//       .then(cart => {
//         if (cart && cart.id) {
//           setCartId(cart.id);
//         } else {
//           console.log("Səbət tapılmadı, yeni səbət yaradılacaq");
//         }
//       })
//       .catch(error => console.error('Error fetching cart:', error));
//   }, [accessToken, userId]);

//   const handleAddToCart = (productId) => {
//     setLoading(productId);
//     setAdded(null);

//     fetch('https://localhost:7298/api/Cart/add-product', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${accessToken}`,
//       },
//       body: JSON.stringify({
//         cartId: cartId,
//         productId: productId,
//         quantity: 1
//       })
//     })
//       .then(response => response.json())
//       .then(() => {
//         setLoading(null);
//         setAdded(productId);
//         setTimeout(() => setAdded(null), 2000);
//       })
//       .catch(error => {
//         console.error("Məhsul əlavə edərkən xəta:", error);
//         setLoading(null);
//       });
//   };

//   const filteredAndSortedProducts = products
//     .filter(product => {
//       return selectedCategory ? product.categoryId === parseInt(selectedCategory) : true;
//     })
//     .sort((a, b) => {
//       if (sortBy === 'price-asc') {
//         return a.price - b.price;
//       } else if (sortBy === 'price-desc') {
//         return b.price - a.price;
//       } else if (sortBy === 'name-asc') {
//         return a.name.localeCompare(b.name);
//       } else if (sortBy === 'name-desc') {
//         return b.name.localeCompare(a.name);
//       }
//       return 0;
//     });

//   return (
//     <div className="min-h-screen bg-white text-black">
//       <header className="relative bg-cover bg-center bg-no-repeat h-[610px] bg-[url('https://max-themes.net/demos/gym/gym/gym/upload/page-title.jpg')] text-white bg-black/20 bg-blend-overlay flex flex-col justify-center items-center">
//         <h1 className="text-6xl font-bold italic">SHOP</h1>
//       </header>

//       <div className="flex justify-center items-center py-6 space-x-4">
//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="">All Categories</option>
//           {categories.map((category) => (
//             <option key={category.id} value={category.id}>
//               {category.name}
//             </option>
//           ))}
//         </select>
//         <select
//           value={sortBy}
//           onChange={(e) => setSortBy(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="price-asc">Price: Low to High</option>
//           <option value="price-desc">Price: High to Low</option>
//           <option value="name-asc">Name: A to Z</option>
//           <option value="name-desc">Name: Z to A</option>
//         </select>
//       </div>

//       <div className="flex justify-center items-center py-12 px-4">
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
//           {filteredAndSortedProducts.length === 0 ? (
//             <p>No products found...</p>
//           ) : (
//             filteredAndSortedProducts.map((product) => (
//               <div key={product.id} className="relative overflow-hidden group">
//                 <div className="relative">
//                   <img
//                     src={product.imageUrl}
//                     alt={product.name}
//                     className="w-full cursor-pointer"
//                   />
//                   <button
//                     onClick={() => handleAddToCart(product.id)}
//                     className="absolute h-[50px] w-full bottom-0 bg-black text-white font-bold opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300"
//                   >
//                     {loading === product.id ? (
//                       <Loader2 className="animate-spin" size={24} />
//                     ) : added === product.id ? (
//                       <i className="fa-solid fa-check fa-2xl" style={{ color: "#fafafa" }}></i>
//                     ) : (
//                       <p className="cursor-pointer hover:text-purple-500">ADD TO CART</p>
//                     )}
//                   </button>
//                 </div>
//                 <div className="p-[5px] cursor-pointer">
//                   <h2 className="text-gray-500 text-lg font-semibold">{product.name}</h2>
//                   <p className="text-xl font-bold">${product.price}</p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Shop;








import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { Loader2 } from "lucide-react";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [loading, setLoading] = useState(null);
  const [added, setAdded] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("price-asc");

  const navigate = useNavigate();

  const accessToken = Cookies.get("accessToken");
  const decodedToken = jwt_decode(accessToken);
  const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

  useEffect(() => {
    if (!accessToken) {
      console.error("Unauthorized: No token found.");
      return;
    }

    fetch("https://localhost:7298/api/Product/GetAll", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));

    fetch("https://localhost:7298/api/Category/GetAllCategory", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));

    fetch(`https://localhost:7298/api/Cart/get/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((cart) => {
        if (cart && cart.id) setCartId(cart.id);
      })
      .catch((error) => console.error("Error fetching cart:", error));
  }, [accessToken, userId]);

  const handleAddToCart = (productId) => {
    setLoading(productId);
    setAdded(null);
    fetch("https://localhost:7298/api/Cart/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        cartId: cartId,
        productId: productId,
        quantity: 1,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        setLoading(null);
        setAdded(productId);
        setTimeout(() => setAdded(null), 2000);
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        setLoading(null);
      });
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product, cartId } });
  };

  const filteredAndSortedProducts = products
    .filter((product) => (selectedCategory ? product.categoryId === parseInt(selectedCategory) : true))
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="relative bg-cover bg-center h-[610px] bg-[url('https://max-themes.net/demos/gym/gym/gym/upload/page-title.jpg')] text-white flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold italic">SHOP</h1>
      </header>

      <div className="flex justify-center items-center py-6 space-x-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>
      <div className="flex justify-center items-center py-12 px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {filteredAndSortedProducts.length === 0 ? (
            <p>No products found...</p>
          ) : (
            filteredAndSortedProducts.map((product) => (
              <div key={product.id} className="relative overflow-hidden group">
                <div className="relative">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  />
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="absolute h-[50px] w-full bottom-0 bg-black text-white font-bold opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300"
                  >
                    {loading === product.id ? (
                      <Loader2 className="animate-spin" size={24} />
                    ) : added === product.id ? (
                      <i className="fa-solid fa-check fa-2xl" style={{ color: "#fafafa" }}></i>
                    ) : (
                      <p className="cursor-pointer hover:text-purple-500">ADD TO CART</p>
                    )}
                  </button>
                </div>
                <div className="p-[5px] cursor-pointer">
                  <h2 className="text-gray-500 text-lg font-semibold">{product.name}</h2>
                  <p className="text-xl font-bold">${product.price}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
