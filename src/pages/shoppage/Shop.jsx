import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { Loader2 } from "lucide-react";
import FilterSort from "./components/FilterSort";
import Pagination from "./components/Pagination";
import SearchBar from "../homepage/components/SearchBar";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState({});
  const [cartId, setCartId] = useState(null);
  const [loading, setLoading] = useState(null);
  const [added, setAdded] = useState(null);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedColor, setSelectedColor] = useState([]);
  const [sortBy, setSortBy] = useState(0);
  const [favoriteStatus, setFavoriteStatus] = useState({});
  const [ascendingOrder, setAscendingOrder] = useState(true)
  const [pagination, setPagination] = useState({
    totalCount: 0,
    pageSize: 12,
    totalPages: 0,
    currentPage: 1,
  });

  const navigate = useNavigate();
  const accessToken = Cookies.get("accessToken");
  const decodedToken = jwt_decode(accessToken);
  const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

  ///
  useEffect(() => {
    const fetchAllImages = async () => {
      const updatedImages = {};

      await Promise.all(
        products.map(async (product) => {
          if (!product.imageId) return;

          try {
            const res = await fetch(`https://localhost:7298/api/File/${product.imageId}`);
            if (!res.ok) throw new Error("Şəkil tapılmadı");

            const data = await res.json();

            updatedImages[product.id] = data.url;
          } catch (err) {
            console.error("Şəkil yüklənə bilmədi:", err);
            updatedImages[product.id] = null;
          }
        })
      );

      setProductImages(updatedImages);
    };

    if (products.length > 0) {
      fetchAllImages();
    }
  }, [products]);
  ///

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
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((cart) => {
        if (cart && cart.id) setCartId(cart.id);
      });

    fetch(`https://localhost:7298/api/Favorite/list/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((favorites) => {
        const newStatus = {};
        favorites.forEach((item) => {
          newStatus[item.product.id] = true;
        });
        setFavoriteStatus(newStatus);
      });
  }, [accessToken, userId, pagination.currentPage, selectedCategory, selectedColor]);



  const fetchProducts = (page = 1) => {
    const finalCategoryId = selectedCategory || 0;
    const finalSortOrder = sortBy !== null ? sortBy : 0;
    const finalColorId = selectedColor || 0;
    const baseUrl = "https://localhost:7298/api/Product/filtered-paged";
    const queryParams = new URLSearchParams();

    if (finalCategoryId) {
      queryParams.append("categoryId", finalCategoryId);
    }

    queryParams.append("ascending", ascendingOrder);
    queryParams.append("page", page);
    queryParams.append("pageSize", pagination.pageSize);

    if (selectedColor) {
      selectedColor.forEach(color => {
        queryParams.append("colors", color);
      });
    }

    fetch(`${baseUrl}?${queryParams.toString()}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setPagination({
          totalCount: data.totalCount,
          currentPage: page,
          pageSize: pagination.pageSize,
          totalPages: Math.ceil(data.totalCount / pagination.pageSize),
        });
      })
      .catch((err) => console.error("Error fetching filtered products:", err));
  };

  useEffect(() => {
    if (accessToken) {
      fetchProducts(pagination.currentPage);
    }
  }, [accessToken, pagination.currentPage, selectedCategory, sortBy, selectedColor]);

  const handlePageChange = (page) => {
    setPagination((prevState) => ({ ...prevState, currentPage: page }));
  };

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

  return (
    <div className="min-h-screen bg-white text-black">
      {/* <header className="relative bg-cover bg-center h-[610px] bg-[url('https://max-themes.net/demos/gym/gym/gym/upload/page-title.jpg')] text-white flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold italic">SHOP</h1>
        
      </header> */}

      <div
        style={{
          background:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://max-themes.net/demos/gym/gym/gym/upload/page-title.jpg) no-repeat center",
          backgroundSize: "",
        }}
        className="py-40 bg-cover bg-center h-[610px] px-1 md:px-8 text-center relative text-white font-bold text-2xl md:text-3xl overflow-auto"
      >
        <h1 className="text-6xl font-bold italic">SHOP</h1>
        <SearchBar accessToken={accessToken}/>
      </div>


      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-64 p-4">
          <FilterSort
            setSelectedCategory={setSelectedCategory}
            setSortBy={setSortBy}
            categories={categories}
            colors={colors}
            onColorSelect={setSelectedColor}
            ascOrder={setAscendingOrder}
            setPage={setPagination}
          />
        </div>

        <div className="flex-1 py-12 px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {products.length === 0 ? (
              <p>No products found...</p>
            ) : (
              products.map((product) => (
                <div key={product.id} className="relative overflow-hidden group">
                  <div className="relative w-full h-64 md:h-[480px] bg-gray-100 flex items-center justify-center">
  {productImages[product.id] ? (
    <img
      src={productImages[product.id]}
      alt={product.name}
      className="w-full h-full object-cover cursor-pointer"
      onClick={() => handleProductClick(product)}
    />
  ) : (
    <Loader2 className="animate-spin text-gray-500" size={36} />
  )}


                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="absolute h-[50px] w-full bottom-0 bg-black text-white font-bold opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 hidden lg:flex"
                    >
                      {loading === product.id ? (
                        <Loader2 className="animate-spin" size={24} />
                      ) : added === product.id ? (
                        <i className="fa-solid fa-check fa-2xl" style={{ color: "#fafafa" }}></i>
                      ) : (
                        <p className="cursor-pointer hover:text-purple-500">ADD TO CART</p>
                      )}
                    </button>

                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="absolute top-2 right-2 bg-white text-black rounded-full pl-3 pr-3 p-2 z-10 lg:hidden cursor-pointer"
                    >
                      {loading === product.id ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : added === product.id ? (
                        <i className="fa-solid fa-check"></i>
                      ) : (
                        <i className="bi bi-bag-plus"></i>
                      )}
                    </button>

                    <button
                      onClick={() => handleFavoriteClick(product.id)}
                      className="absolute top-2 left-3 text-gray-600 text-xl z-10"
                    >
                      {favoriteStatus[product.id] ? (
                        <i className="fa-solid fa-heart"></i>
                      ) : (
                        <i className="fa-regular fa-heart"></i>
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
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Shop;
