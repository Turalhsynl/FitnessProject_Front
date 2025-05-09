import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, Heart } from "lucide-react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const Cart = ({
  cartItems,
  cart,
  setIsCartOpen,
  handleRemoveFromCart,
  handleRemoveFromFavorites
}) => {
  const [activeTab, setActiveTab] = useState("cart");
  const [loading, setLoading] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [added, setAdded] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [productImages, setProductImages] = useState({}); // productId => url xəritəsi
  const [favoriteStatus, setFavoriteStatus] = useState({});
  const accessToken = Cookies.get("accessToken");
  let userId = null;

  if (accessToken) {
    try {
      const decodedToken = jwt_decode(accessToken);
      userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    } catch (err) {
      console.error("Token çözümlenemedi:", err);
    }
  }

  const handleFavoriteClick = (productId) => {
    const isFav = favoriteStatus[productId] || false;
    const url = isFav
      ? "https://localhost:7298/api/Favorite/remove"
      : "https://localhost:7298/api/Favorite/add";

    const body = {
      userId,
      productId,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.ok) {
          setFavoriteStatus((prev) => ({
            ...prev,
            [productId]: !isFav,
          }));
        }
      })
      .catch((err) => console.error("Favori değiştirilemedi:", err));
  };


  useEffect(() => {
    if (activeTab === "favorites" && userId && accessToken) {
      setLoadingFavorites(true);
  
      fetch(`https://localhost:7298/api/Favorite/list/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            console.error("HTTP Status:", res.status);
            throw new Error("API hatası");
          }
          return res.json();
        })
        .then((data) => setFavorites(data))
        .catch((error) => {
          console.error("Favori ürünler alınamadı:", error);
        })
        .finally(() => {
          setLoadingFavorites(false);
        });
    }
  }, [activeTab, userId, accessToken]);

  useEffect(() => {
    const fetchImages = async () => {
      const newImages = {};

      // cartItems üçün şəkil yüklənməsi
      await Promise.all(
        cartItems.map(async (item) => {
          const imageId = item.product?.imageId;
          if (!imageId) return;

          try {
            const res = await fetch(`https://localhost:7298/api/File/${imageId}`);
            if (res.ok) {
              const data = await res.json();
              newImages[item.product.id] = data.url;
            }
          } catch (err) {
            console.error(`Şəkil yüklənərkən xəta baş verdi:`, err);
          }
        })
      );

      // favorites üçün şəkil yüklənməsi
      if (activeTab === "favorites") {
        await Promise.all(
          favorites.map(async (item) => {
            const imageId = item.product?.imageId;
            if (!imageId) return;

            try {
              const res = await fetch(`https://localhost:7298/api/File/${imageId}`);
              if (res.ok) {
                const data = await res.json();
                newImages[item.product.id] = data.url;
              }
            } catch (err) {
              console.error(`Şəkil yüklənərkən xəta baş verdi:`, err);
            }
          })
        );
      }

      setProductImages(newImages);
    };

    if (cartItems.length > 0 || favorites.length > 0) {
      fetchImages();
    }
  }, [cartItems, favorites, activeTab]);

  useEffect(() => {
    if (favorites.length > 0) {
      const statusMap = {};
      favorites.forEach((item) => {
        statusMap[item.product.id] = true;
      });
      setFavoriteStatus(statusMap);
    }
  }, [favorites]);

 const handleAddToCart = (productId) => {
  setLoading(productId);
  setAdded(null);

  console.log("CartId:", cartId);
  console.log("AccessToken:", accessToken);

  fetch("https://localhost:7298/api/Cart/add-product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      CartId: cartId,
      ProductId: productId,
      Quantity: 1,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          console.error("API hatası:", err);
          throw new Error("API hatası");
        });
      }
      return res.json();
    })
    .then(() => {
      setLoading(null);
      setAdded(productId);
      setTimeout(() => setAdded(null), 2000);
    })
    .catch((err) => {
      console.error("Hata oluştu:", err);
      setLoading(null);
    });
};

  
  

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/70 z-50">
      <div className="fixed top-0 right-0 w-full md:w-[400px] h-full bg-white shadow-lg z-50 transition-transform transform translate-x-0">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6">
            <h2 className="text-lg font-bold">YOUR BAG</h2>
            <button onClick={() => setIsCartOpen(false)} className="text-3xl cursor-pointer">
              &times;
            </button>
          </div>

          <div className="flex bg-gray-100 rounded-full w-fit mx-auto mb-4">
            <button
              onClick={() => setActiveTab("cart")}
              className={`p-2 px-4 rounded-full transition ${
                activeTab === "cart" ? "bg-black text-white" : "text-black"
              }`}
            >
              <ShoppingBag size={18} />
            </button>
            <button
              onClick={() => setActiveTab("favorites")}
              className={`p-2 px-4 rounded-full transition ${
                activeTab === "favorites" ? "bg-black text-white" : "text-black"
              }`}
            >
              <Heart size={18} />
            </button>
          </div>

          {activeTab === "cart" ? (
            cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center flex-1 p-6 text-center">
                <img
                  src="https://www.gymshark.com/images/empty-bag.svg"
                  alt="Empty Cart"
                  className="w-24 h-24 mb-4"
                />
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
                    <img
                      src={productImages[item.product.id]}  // burada şəkil çəkiləcək
                      alt={item.productName}
                      className="w-32 h-38 rounded cursor-pointer"
                    />
                    <div className="flex-1 ml-4">
                      <p className="font-medium text-gray-600 mb-2 cursor-pointer">{item.productName}</p>
                      {/* <p className="text-gray-500 text-sm">{item.product.color}</p> */}
                      <p className="font-bold">${item.product.price}</p>
                      <div className="flex mt-2 justify-between">
                      <button
                          className="mt-4 p-2 cursor-pointer"
                          onClick={() => handleRemoveFromCart(item.product.id)}
                        >
                          <Trash2 className="text-gray-500" size={20} />
                        </button>
                        <button
                      onClick={() => handleFavoriteClick(item.product.id)}
                      className=" text-gray-600 text-xl mr-24 mt-4"
                    >
                      {favoriteStatus[item.product.id] ? (
                        <i className="fa-solid fa-heart"></i>
                      ) : (
                        <i className="fa-regular fa-heart"></i>
                      )}
                    </button>
                        <p className="text-black font-bold mt-6 cursor-pointer">
                          Qty: {item.quantity}
                        </p>
                        
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {loadingFavorites ? (
                <div className="text-center text-gray-500">Loading favorites...</div>
              ) : favorites.length === 0 ? (
                <div className="text-center text-gray-500">No favorite products yet.</div>
              ) : (
                favorites.map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-4">
                    <img
                      src={productImages[item.product.id]}  // burada şəkil çəkiləcək
                      alt={item.product.name}
                      className="w-32 h-38 cursor-pointer rounded"
                    />
                    <div className="flex-1 ml-4">
                      <p className="font-medium mb-2 text-gray-700">{item.product.name}</p>
                      {/* <p className="text-gray-500 text-sm">{item.product.description}</p> */}
                      <p className="font-bold mb-8">${item.product.price}</p>
                      <button
                      onClick={() => handleFavoriteClick(item.product.id)}
                      className=" text-gray-600 text-xl  mt-4"
                    >
                      {favoriteStatus[item.product.id] ? (
                        <i className="fa-solid fa-heart"></i>
                      ) : (
                        <i className="fa-regular fa-heart"></i>
                      )}
                    </button>
                      
                      {/* <button
  className="mt-4 text-red-500 cursor-pointer"
  onClick={() => handleRemoveFromFavorites(item.product.id)}
>
  <Trash2 className="text-gray-500" size={20} />
</button> */}



                      <button
  onClick={() => handleAddToCart(item.product.id)}
  className="ml-4 bg-white text-black rounded-full cursor-pointer"
>
  <ShoppingBag size={18} />
</button>




                     
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "cart" && cartItems.length > 0 && (
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
};

export default Cart;
