import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { Loader2 } from "lucide-react";
import FilterSort from "./components/FilterSort";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [loading, setLoading] = useState(null);
  const [added, setAdded] = useState(null);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [sortBy, setSortBy] = useState(0);

  const navigate = useNavigate();
  const accessToken = Cookies.get("accessToken");
  const decodedToken = jwt_decode(accessToken);
  const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

  useEffect(() => {
    if (!accessToken) return;

    fetch("https://localhost:7298/api/Category/GetAllCategory", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then(setCategories)
      .catch((err) => console.error("Error fetching categories:", err));

    setColors([
      { id: 1, code: " #000000", name: "Black" },
      { id: 2, code: " #808080", name: "Grey" },
      { id: 3, code: " #FFC0CB", name: "Pink" },
      { id: 4, code: " #008000", name: "Green" },
      { id: 5, code: " #964B00", name: "Brown" },
      { id: 6, code: " #0000FF", name: "Blue" },
    ]);

    fetch(`https://localhost:7298/api/Cart/get/${userId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then((cart) => {
        if (cart?.id) setCartId(cart.id);
      })
      .catch((err) => console.error("Error fetching cart:", err));
  }, [accessToken, userId]);

  const fetchProducts = (categoryId, sortOrder) => {
    const finalCategoryId = categoryId || 0;
    const finalSortOrder = sortOrder !== null ? sortOrder : 0;

    fetch(`https://localhost:7298/api/Product/category/${finalCategoryId}?sortOrder=${finalSortOrder}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error("Error fetching filtered products:", err));
  };

  const fetchProductsbyColor = (colorId, ascending) => {
    fetch(`https://localhost:7298/api/Product/products/by-color?color=${colorId}&ascending=${ascending}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error("Error fetching color filtered products", err));
  };

  useEffect(() => {
    if (accessToken) {
      if (selectedColor) {
        fetchProductsbyColor(selectedColor, true);
      } else {
        fetchProducts(selectedCategory, sortBy);
      }
    }
  }, [selectedCategory, sortBy, selectedColor, accessToken]);

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
            cartId,
            productId,
            quantity: 1,
          }),
        })
          .then((res) => res.json())
          .then(() => {
            setLoading(null);
            setAdded(productId);
            setTimeout(() => setAdded(null), 2000);
          })
          .catch((err) => {
            console.error("Error adding product:", err);
            setLoading(null);
          });
      };
    
      const handleProductClick = (product) => {
        navigate(`/product/${product.id}`, { state: { product, cartId } });
      };

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="relative bg-cover bg-center h-[610px] bg-[url('https://max-themes.net/demos/gym/gym/gym/upload/page-title.jpg')] text-white flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold italic">SHOP</h1>
      </header>

      <div className="flex">
        <div className="w-64 p-4">
          <FilterSort
            setSelectedCategory={setSelectedCategory}
            setSortBy={setSortBy}
            categories={categories}
            colors={colors}
            onColorSelect={setSelectedColor}
          />
        </div>

        <div className="flex-1 py-12 px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.length === 0 ? (
              <p>No products found...</p>
            ) : (
              products.map((product) => (
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
    </div>
  );
};

export default Shop;
