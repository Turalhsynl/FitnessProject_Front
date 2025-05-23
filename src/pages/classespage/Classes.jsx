// import React, { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import jwt_decode from "jwt-decode";

// export default function RecipeApp() {
//   const [recipes, setRecipes] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [mealType, setMealType] = useState("");
//   const [ingredient, setIngredient] = useState("");
//   const [calorieMin, setCalorieMin] = useState(0);
//   const [calorieMax, setCalorieMax] = useState(1000);

//   const accessToken = Cookies.get("accessToken");

//   useEffect(() => {
//     if (!accessToken) return;

//     fetch("https://localhost:7298/api/Recipe", {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setRecipes(data);
//         setFiltered(data);
//       });
//   }, [accessToken]);

//   const handleSearch = () => {
//     if (!accessToken) return;

//     if (searchText) {
//       fetch(`https://localhost:7298/api/Recipe/search?name=${searchText}`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       })
//         .then((res) => res.json())
//         .then(setFiltered);
//     } else if (ingredient) {
//       fetch(`https://localhost:7298/api/Recipe/by-ingredient?ingredient=${ingredient}`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       })
//         .then((res) => res.json())
//         .then(setFiltered);
//     } else if (mealType) {
//       fetch(`https://localhost:7298/api/Recipe/by-mealtype?mealType=${mealType}`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       })
//         .then((res) => res.json())
//         .then(setFiltered);
//     } else {
//       fetch(`https://localhost:7298/api/Recipe/by-calories?minCalories=${calorieMin}&maxCalories=${calorieMax}`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       })
//         .then((res) => res.json())
//         .then(setFiltered);
//     }
//   };

//   return (
//     <div className="bg-[#f5f7ed] min-h-screen p-6">
//       <nav className="flex justify-between items-center mb-10">
//         <div className="flex items-center gap-10 ml-4">
//           <div className="text-red-600 font-bold border-b-2 border-red-600">Search</div>
//           <div className="text-gray-700">Shop</div>
//           <div className="text-gray-700">Share</div>
//         </div>
//         <div className="flex gap-6 items-center">
//           <div className="w-8 h-8 bg-gray-300 rounded-full" />
//         </div>
//       </nav>

//       {filtered.length > 0 && (
//         <div className="grid md:grid-cols-2 gap-10 mb-20">
          
//           <div className="flex justify-center items-center relative">
//   {/* Siyah dikdörtgen arka plan */}
  
//   <div className="absolute w-[400px] h-[500px] bg-black -translate-y-1/2"></div>
//   {/* Ana resim */}
//   <img
//     src={filtered[0].imageUrl}
//     alt={filtered[0].name}
//     className="relative  rounded-full w-[400px] h-[400px] object-cover border-8 border-white shadow-lg"
//   />
  
// </div>

//           <div className="flex flex-col justify-center">
//             <h1 className="text-7xl font-semibold">{filtered[0].name.split(" ")[0]}</h1>
//             <h2 className="text-5xl italic text-gray-600 mb-4">{filtered[0].name.split(" ")[1]}</h2>
//             <p className="text-gray-500 mb-4">{filtered[0].description}</p>
//             <div className="text-3xl text-red-600 font-bold mb-4">${filtered[0].price}</div>
//             <div className="flex gap-2 items-center">
//               <button className="px-3 py-1 bg-white text-black rounded">-</button>
//               <span className="px-3">1</span>
//               <button className="px-3 py-1 bg-white text-black rounded">+</button>
//               <button className="ml-4 px-4 py-2 bg-white text-black rounded shadow flex items-center gap-2">
//                 <span className="material-icons">shopping_cart</span>
//                 Add Food
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

// <div className="flex justify-center items-center">
//   <div className="mt-24  grid grid-cols-2 md:grid-cols-4 gap-12">
//     {filtered.slice(1, 5).map((recipe) => (
//       <div
//         key={recipe.id}
//         className="bg-black text-white lg-mr-30 lg:ml-30 rounded-2xl h-[200px] w-[190px] p-4 shadow-lg relative"
//       >
//         <img
//           src={recipe.imageUrl}
//           alt={recipe.name}
//           className="w-24 h-24 object-cover rounded-full absolute -top-10 -left-4 border-4 border-white"
//         />
//         <div className="mt-12">
//           <div className="text-sm text-white">{recipe.calories}</div>
//           <div className="font-semibold text-lg mt-1 italic">
//             {recipe.name}
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
  
// </div>


//     </div>
    
//   );
// }



// import React, { useEffect, useState } from "react";
// import Cookies from "js-cookie";

// export default function RecipeApp() {
//   const [recipes, setRecipes] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [selectedRecipe, setSelectedRecipe] = useState(null);
//   const [searchText, setSearchText] = useState("");
//   const [mealType, setMealType] = useState("");
//   const [ingredient, setIngredient] = useState("");
//   const [calorieMin, setCalorieMin] = useState(0);
//   const [calorieMax, setCalorieMax] = useState(1000);

//   const accessToken = Cookies.get("accessToken");

//   useEffect(() => {
//     if (!accessToken) return;

//     fetch("https://localhost:7298/api/Recipe", {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setRecipes(data);
//         setFiltered(data);
//         setSelectedRecipe(data[0]); // İlk tarifi varsayılan olarak göster
//       });
//   }, [accessToken]);

//   const handleSearch = () => {
//     if (!accessToken) return;

//     if (searchText) {
//       fetch(`https://localhost:7298/api/Recipe/search?name=${searchText}`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           setFiltered(data);
//           setSelectedRecipe(data[0]);
//         });
//     } else if (ingredient) {
//       fetch(`https://localhost:7298/api/Recipe/by-ingredient?ingredient=${ingredient}`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           setFiltered(data);
//           setSelectedRecipe(data[0]);
//         });
//     } else if (mealType) {
//       fetch(`https://localhost:7298/api/Recipe/by-mealtype?mealType=${mealType}`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           setFiltered(data);
//           setSelectedRecipe(data[0]);
//         });
//     } else {
//       fetch(`https://localhost:7298/api/Recipe/by-calories?minCalories=${calorieMin}&maxCalories=${calorieMax}`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           setFiltered(data);
//           setSelectedRecipe(data[0]);
//         });
//     }
//   };

//   return (
//     <div className="bg-[#f5f7ed] min-h-screen p-6">
//       <nav className="flex justify-between items-center mb-10">
//         <div className="flex items-center gap-10 ml-4">
//           <div className="text-red-600 font-bold border-b-2 border-red-600">Search</div>
//           <div className="text-gray-700">Shop</div>
//           <div className="text-gray-700">Share</div>
//         </div>
//         <div className="flex gap-6 items-center">
//           <div className="w-8 h-8 bg-gray-300 rounded-full" />
//         </div>
//       </nav>

//       {filtered.length > 0 && selectedRecipe && (
//         <div className="grid md:grid-cols-2 gap-10 mb-20">
//           <div className="flex justify-center items-center relative">
//             <div className="absolute w-[400px] h-[500px] bg-black -translate-y-1/2"></div>
//             <img
//               src={selectedRecipe.imageUrl}
//               alt={selectedRecipe.name}
//               className="relative  rounded-full w-[400px] h-[400px] object-cover border-8 border-black shadow-lg"
//             />
//           </div>

//           <div className="flex flex-col justify-center">
//             <h1 className="text-7xl font-semibold">{selectedRecipe.name.split(" ")[0]}</h1>
//             <h2 className="text-5xl italic text-gray-600 mb-4">{selectedRecipe.name.split(" ")[1]}</h2>
//             <p className="text-gray-500 mb-4">{selectedRecipe.description}</p>
//             <div className="text-3xl text-red-600 font-bold mb-4">${selectedRecipe.price}</div>
//             <div className="flex gap-2 items-center">
//               <button className="px-3 py-1 bg-white text-black rounded">-</button>
//               <span className="px-3">1</span>
//               <button className="px-3 py-1 bg-white text-black rounded">+</button>
//               <button className="ml-4 px-4 py-2 bg-white text-black rounded shadow flex items-center gap-2">
//                 <span className="material-icons">shopping_cart</span>
//                 Add Food
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="flex justify-center items-center">
//         <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12">
//           {filtered.slice(0, 4).map((recipe) => (
//             <div
//               key={recipe.id}
//               onClick={() => setSelectedRecipe(recipe)}
//               className={`cursor-pointer bg-black lg:ml-30 lg-mr-30 text-white rounded-2xl h-[200px] w-[190px] p-4 shadow-lg relative transition-transform hover:scale-105 ${
//                 selectedRecipe?.id === recipe.id ? "ring-4 ring-green-600" : ""
//               }`}
//             >
//               <img
//                 src={recipe.imageUrl}
//                 alt={recipe.name}
//                 className="w-24 h-24 object-cover rounded-full absolute -top-10 -left-4 border-4 border-white"
//               />
//               <div className="mt-12">
//                 <div className="text-sm text-white">{recipe.calories}</div>
//                 <div className="font-semibold text-lg mt-1 italic">
//                   {recipe.name}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }






// import React, { useEffect, useState,useRef } from "react";
// import Cookies from "js-cookie";

// export default function RecipeApp() {
//   const [recipes, setRecipes] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [selectedRecipe, setSelectedRecipe] = useState(null);
//   const [searchText, setSearchText] = useState("");
//   const [mealType, setMealType] = useState("");
//   const [ingredient, setIngredient] = useState("");
//   const [calorieMin, setCalorieMin] = useState(0);
//   const [calorieMax, setCalorieMax] = useState(1000);
//   const [rotate, setRotate] = useState(false);
//   const [selectedSort, setSelectedSort] = useState(null);
//   const scrollRef = useRef(null);


//   const [typedText, setTypedText] = useState("");
//   const [index, setIndex] = useState(0);

//   const accessToken = Cookies.get("accessToken");

//   useEffect(() => {
//     if (!accessToken) return;

//     fetch("https://localhost:7298/api/Recipe", {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setRecipes(data);
//         setFiltered(data);
//         setSelectedRecipe(data[0]);
//       });
//   }, [accessToken]);

//   useEffect(() => {
//     if (selectedRecipe?.description) {
//       setTypedText("");
//       setIndex(0);
//     }
//   }, [selectedRecipe]);

//   useEffect(() => {
//     if (selectedRecipe?.description && index < selectedRecipe.description.length) {
//       const timeout = setTimeout(() => {
//         setTypedText((prev) => prev + selectedRecipe.description[index]);
//         setIndex((prev) => prev + 1);
//       }, 20);
//       return () => clearTimeout(timeout);
//     }
//   }, [index, selectedRecipe]);

//   const handleSearch = () => {
//     if (!accessToken) return;

//     let url = "";
//     if (searchText) {
//       url = `https://localhost:7298/api/Recipe/search?name=${searchText}`;
//     } else if (ingredient) {
//       url = `https://localhost:7298/api/Recipe/by-ingredient?ingredient=${ingredient}`;
//     } else if (mealType) {
//       url = `https://localhost:7298/api/Recipe/by-mealtype?mealType=${mealType}`;
//     } else {
//       url = `https://localhost:7298/api/Recipe/by-calories?minCalories=${calorieMin}&maxCalories=${calorieMax}`;
//     }

//     fetch(url, {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setFiltered(data);
//         setSelectedRecipe(data[0]);
//       });
//   };

//   const handleRecipeClick = (recipe) => {
//     setRotate(true);
//     setTimeout(() => {
//       setSelectedRecipe(recipe);
//       setRotate(false);
//     }, 500);
//   };


//     const handleSort = (sortType) => {
//     if (!accessToken) return;

//     let url = "";

//     switch (sortType) {
//       case "calories":
//         url = `https://localhost:7298/api/Recipe/by-calories?minCalories=${calorieMin}&maxCalories=${calorieMax}`;
//         break;
//       case "ingredient":
//         url = `https://localhost:7298/api/Recipe/by-ingredient?ingredient=${ingredient}`;
//         break;
//       case "mealtype":
//         url = `https://localhost:7298/api/Recipe/by-mealtype?mealType=${mealType}`;
//         break;
//       default:
//         return;
//     }

//     fetch(url, {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setFiltered(data);
//         setSelectedRecipe(data[0]);
//       });
//   };
//   const scrollLeft = () => {
//     scrollRef.current.scrollBy({ left: -220, behavior: "smooth" });
//   };
  
//   const scrollRight = () => {
//     scrollRef.current.scrollBy({ left: 220, behavior: "smooth" });
//   };
  

//   return (
//     <div className="bg-[#f5f7ed] min-h-screen p-6 mt-20">
//       <nav className="flex justify-between items-center mb-10">
//         <div className="flex items-center gap-10 ml-4">
//           {/* <div className="text-red-600 font-bold border-b-2 border-red-600">Search</div> */}
//           {/* <div className="text-gray-700">Shop</div> */}
//           {/* <div className="text-gray-700">Share</div> */}
//         </div>
//         <div className="flex gap-6 items-center">
//           <div className="w-8 h-8 bg-gray-300 rounded-full" />
//         </div>
//       </nav>

//       {filtered.length > 0 && selectedRecipe && (
//         <div className="grid md:grid-cols-2 gap-10 mr-70 mb-20">
//           <div className="flex justify-center items-center relative">
//             <div className="absolute w-[400px]   h-[500px] bg-black -translate-y-1/2"></div>
//             <img
//               src={selectedRecipe.imageUrl}
//               alt={selectedRecipe.name}
//               className={`relative rounded-full w-[400px] h-[400px] object-cover border-8 border-black shadow-lg transition-transform duration-500 ${rotate ? "animate-spin-slow" : ""}`}
//             />
//           </div>

//           <div className="flex flex-col justify-center">
//             <h1 className="text-7xl font-semibold">{selectedRecipe.name.split(" ")[0]}</h1>
//             <h2 className="text-5xl italic text-gray-600 mb-4">{selectedRecipe.name.split(" ")[1]}</h2>
//             <p className="text-gray-500 mb-4 min-h-[100px] w-[580px] whitespace-pre-line">{typedText}</p>

           
//           </div>
//         </div>
//       )}

//       <div className="flex justify-center items-center">
//         <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12">
//           {filtered.slice(0, 4).map((recipe) => (
//             <div
//               key={recipe.id}
//               onClick={() => handleRecipeClick(recipe)}
//               className={`cursor-pointer bg-black lg:ml-30 lg-mr-30 text-white rounded-2xl h-[200px] w-[190px] p-4 shadow-lg relative transition-transform hover:scale-105 ${
//                 selectedRecipe?.id === recipe.id ? "ring-4 ring-green-600" : ""
//               }`}
//             >
//               <img
//                 src={recipe.imageUrl}
//                 alt={recipe.name}
//                 className="w-24 h-24 object-cover rounded-full absolute -top-10 -left-4 border-4 border-white"
//               />
//               <div className="mt-12">
//                 <div className="text-sm text-white">{recipe.calories}</div>
//                 <div className="font-semibold text-lg mt-1 italic">
//                   {recipe.name}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
      

//     <div className="absolute right-20 top-24 w-[280px] bg-white shadow-xl rounded-2xl p-6">
//     <div className="flex justify-between items-center">
//            <span className="bg-orange-400 text-white px-3 py-1 rounded text-2xl font-bold">4.9</span>
//           <span className="text-gray-400 text-sm">Overview | Ingredients</span>
//          </div>
//          <h3 className="text-lg font-semibold mt-4">Chef Feny</h3>
//          <p className="text-sm text-gray-600 mt-2">
//            Kau terindah kan selalu terindah, apalagi masakanmu. Ahayy malah nge gombal si abang.
//         </p>
//          <div className="text-sm text-gray-500 mt-4">❤️ 96 likes</div>
//        <div className="flex justify-between items-center mb-4">
//          <span className="text-gray-500 text-sm">Sort by</span>
//        </div>

//         <button
//           onClick={() => setSelectedSort("calories")}
//           className={`px-4 py-2 rounded w-full ${
//             selectedSort === "calories" ? "bg-black text-white" : "bg-gray-100"
//           }`}
//         >
//           Sort by Calories
//         </button>

//         {selectedSort === "calories" && (
//           <div className="mt-2 space-y-2">
//             <input
//               type="number"
//               placeholder="Min Calories"
//               value={calorieMin}
//               onChange={(e) => setCalorieMin(e.target.value)}
//               className="w-full px-2 py-1 border border-gray-300 rounded"
//             />
//             <input
//               type="number"
//               placeholder="Max Calories"
//               value={calorieMax}
//               onChange={(e) => setCalorieMax(e.target.value)}
//               className="w-full px-2 py-1 border border-gray-300 rounded"
//             />
//             <button
//               onClick={() => handleSort("calories")}
//               className="w-full px-4 py-1 bg-orange-500 text-white rounded"
//             >
//               Apply
//             </button>
//           </div>
//         )}

//         <button
//           onClick={() => setSelectedSort("ingredient")}
//           className={`px-4 py-2 rounded w-full mt-2 ${
//             selectedSort === "ingredient" ? "bg-black text-white" : "bg-gray-100"
//           }`}
//         >
//           Sort by Ingredient
//         </button>

//         {selectedSort === "ingredient" && (
//           <div className="mt-2 space-y-2">
//             <input
//               type="text"
//               placeholder="Ingredient"
//               value={ingredient}
//               onChange={(e) => setIngredient(e.target.value)}
//               className="w-full px-2 py-1 border border-gray-300 rounded"
//             />
//             <button
//               onClick={() => handleSort("ingredient")}
//               className="w-full px-4 py-1 bg-orange-500 text-white rounded"
//             >
//               Apply
//             </button>
//           </div>
//         )}

//         <button
//           onClick={() => setSelectedSort("mealtype")}
//           className={`px-4 py-2 rounded w-full mt-2 ${
//             selectedSort === "mealtype" ? "bg-black text-white" : "bg-gray-100"
//           }`}
//         >
//           Sort by Meal Type
//         </button>

//         {selectedSort === "mealtype" && (
//           <div className="mt-2 space-y-2">
//             <input
//               type="text"
//               placeholder="Meal Type"
//               value={mealType}
//               onChange={(e) => setMealType(e.target.value)}
//               className="w-full px-2 py-1 border border-gray-300 rounded"
//             />
//             <button
//               onClick={() => handleSort("mealtype")}
//               className="w-full px-4 py-1 bg-orange-500 text-white rounded"
//             >
//               Apply
//             </button>
//           </div>
//         )}
//       </div>

      

//       <style>{`
//         .animate-spin-slow {
//           animation: spin 0.5s linear;
//         }

//         @keyframes spin {
//           0% {
//             transform: rotate(0deg);
//           }
//           100% {
//             transform: rotate(360deg);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

///heleki esas budu yuxaridaki


import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";

export default function RecipeApp() {
  const [recipes, setRecipes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);
  const [calorieMin, setCalorieMin] = useState(0);
  const [calorieMax, setCalorieMax] = useState(1000);
  const [ingredient, setIngredient] = useState("");
  const [mealType, setMealType] = useState("");
  const [selectedSort, setSelectedSort] = useState(null);
  const [rotate, setRotate] = useState(false);
  const accessToken = Cookies.get("accessToken");
  const [recipeImageUrl, setRecipeImageUrl] = useState(null)
  const [recipeImages, setRecipeImages] = useState({});


useEffect(() => {
  const fetchAllImages = async () => {
    if (!accessToken || recipes.length === 0) return;

    const imageMap = {};
    for (const recipe of recipes) {
      try {
        const res = await fetch(`https://localhost:7298/api/File/${recipe.imageId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await res.json();
        imageMap[recipe.id] = data.url;
      } catch (err) {
        console.error("Error loading image for recipe:", recipe.id, err);
      }
    }

    setRecipeImages(imageMap);
  };

  fetchAllImages();
}, [recipes, accessToken]);

  useEffect(() => {
    if (!accessToken) return;

    fetch("https://localhost:7298/api/Recipe", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setFiltered(data);
        setSelectedRecipe(data[0]);
      })
      
      
  }, [accessToken]);

  useEffect(() => {
    if (selectedRecipe?.description) {
      setTypedText("");
      setIndex(0);
    }
  }, [selectedRecipe]);

  useEffect(() => {
    if (selectedRecipe?.description && index < selectedRecipe.description.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + selectedRecipe.description[index]);
        setIndex((prev) => prev + 1);
      }, 20);
      return () => clearTimeout(timeout);
    }
  }, [index, selectedRecipe]);

const fetchRecipeImage = async (imageId) => {
  try {
    const res = await fetch(`https://localhost:7298/api/File/${imageId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await res.json();
    setRecipeImageUrl(data.url);
  } catch (err) {
    console.error("Coach image fetch error", err);
  }
};

  const handleSort = (sortType) => {
    if (!accessToken) return;

    let url = "";

    switch (sortType) {
      case "calories":
        url = `https://localhost:7298/api/Recipe/by-calories?minCalories=${calorieMin}&maxCalories=${calorieMax}`;
        break;
      case "ingredient":
        url = `https://localhost:7298/api/Recipe/by-ingredient?ingredient=${ingredient}`;
        break;
      default:
        return;
    }

    fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setFiltered(data);
        setSelectedRecipe(data[0]);
      });
  };

  const handleRecipeClick = (recipe) => {
    setRotate(true);
    setTimeout(() => {
      setSelectedRecipe(recipe);
      fetchRecipeImage(recipe.imageId);
      setRotate(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#d9cae1] font-sans">
      <nav className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold text-white">🥤 Fresh Smoothies</span>
        </div>
        <div className="flex space-x-8 text-black font-medium">
          <span>Products</span>
          <span>About</span>
          <span>Contact</span>
          <span>Account</span>
        </div>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 items-center p-10">
        <div className="text-left">
          <h1 className="text-6xl font-bold text-white">SMOOTHIES</h1>
          <h2 className="text-4xl text-white mt-2">RAISIN</h2>
          <p className="text-white mt-4 w-4/5 leading-relaxed">{typedText}</p>

          <div className="flex space-x-4 mt-6">
            {filtered.slice(0, 4).map((recipe) => (
              <img
                key={recipe.id}
                onClick={() => handleRecipeClick(recipe)}
                src={recipeImages[recipe.id]}
                alt={recipe.name}
                className={`w-16 h-16 rounded-full border-4 cursor-pointer transition-transform transform hover:scale-110 ${
                  selectedRecipe?.id === recipe.id ? "border-yellow-500" : "border-white"
                }`}
              />
            ))}
          </div>
        </div>

        {selectedRecipe && (
  <div className="flex flex-col items-center  justify-center space-y-4">
    <img
      src={recipeImages[selectedRecipe.id]}
      alt={selectedRecipe.name}
      className={`rounded-full w-[400px] h-[400px] border-2 object-cover transition-transform duration-500 ${
        rotate ? "animate-spin-slow" : ""
      }`}
    />
    <div className="text-center">
      <h3 className="text-2xl font-bold text-white">{selectedRecipe.name}</h3>
      <p className="text-white mt-1 text-sm">{selectedRecipe.calories} calories</p>
    </div>
  </div>
)}

      </div>

      <div className="mt-10 p-6 bg-white max-w-md mx-auto rounded-2xl shadow-xl">
        <div className="flex justify-between items-center">
          <span className="bg-orange-400 text-white px-3 py-1 rounded text-xl font-bold">4.9</span>
          <span className="text-gray-400 text-sm">Overview | Ingredients</span>
        </div>
        <h3 className="text-lg font-semibold mt-4">Chef Feny</h3>
        <p className="text-sm text-gray-600 mt-2">
          Kau terindah kan selalu terindah, apalagi masakanmu. Ahayy malah nge gombal si abang.
        </p>
        <div className="text-sm text-gray-500 mt-4">❤️ 96 likes</div>

        <div className="mt-4">
          <button
            onClick={() => setSelectedSort("calories")}
            className={`w-full px-4 py-2 rounded mb-2 ${selectedSort === "calories" ? "bg-black text-white" : "bg-gray-100"}`}
          >
            Sort by Calories
          </button>

          {selectedSort === "calories" && (
            <div className="space-y-2">
              <input
                type="number"
                placeholder="Min Calories"
                value={calorieMin}
                onChange={(e) => setCalorieMin(e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded"
              />
              <input
                type="number"
                placeholder="Max Calories"
                value={calorieMax}
                onChange={(e) => setCalorieMax(e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded"
              />
              <button
                onClick={() => handleSort("calories")}
                className="w-full px-4 py-1 bg-orange-500 text-white rounded"
              >
                Apply
              </button>
            </div>
          )}

          <button
            onClick={() => setSelectedSort("ingredient")}
            className={`w-full px-4 py-2 rounded mt-2 ${selectedSort === "ingredient" ? "bg-black text-white" : "bg-gray-100"}`}
          >
            Sort by Ingredient
          </button>

          {selectedSort === "ingredient" && (
            <div className="mt-2 space-y-2">
              <input
                type="text"
                placeholder="Ingredient"
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded"
              />
              <button
                onClick={() => handleSort("ingredient")}
                className="w-full px-4 py-1 bg-orange-500 text-white rounded"
              >
                Apply
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .animate-spin-slow {
          animation: spin 0.5s linear;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}





// import React, { useEffect, useState } from "react";
// import Cookies from "js-cookie";

// export default function RecipeApp() {
//   const [recipes, setRecipes] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [selectedRecipe, setSelectedRecipe] = useState(null);
//   const [searchText, setSearchText] = useState("");
//   const [mealType, setMealType] = useState("");
//   const [ingredient, setIngredient] = useState("");
//   const [calorieMin, setCalorieMin] = useState(0);
//   const [calorieMax, setCalorieMax] = useState(1000);
//   const [selectedSort, setSelectedSort] = useState(null);
//   const [rotate, setRotate] = useState(false);

//   const accessToken = Cookies.get("accessToken");

//   useEffect(() => {
//     if (!accessToken) return;

//     fetch("https://localhost:7298/api/Recipe", {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setRecipes(data);
//         setFiltered(data);
//         setSelectedRecipe(data[0]);
//       });
//   }, [accessToken]);

//   const handleSearch = () => {
//     if (!accessToken) return;

//     let url = "";
//     if (searchText) {
//       url = `https://localhost:7298/api/Recipe/search?name=${searchText}`;
//     } else if (ingredient) {
//       url = `https://localhost:7298/api/Recipe/by-ingredient?ingredient=${ingredient}`;
//     } else if (mealType) {
//       url = `https://localhost:7298/api/Recipe/by-mealtype?mealType=${mealType}`;
//     } else {
//       url = `https://localhost:7298/api/Recipe/by-calories?minCalories=${calorieMin}&maxCalories=${calorieMax}`;
//     }

//     fetch(url, {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setFiltered(data);
//         setSelectedRecipe(data[0]);
//       });
//   };

//   const handleRecipeClick = (recipe) => {
//     setRotate(true);
//     setTimeout(() => {
//       setSelectedRecipe(recipe);
//       setRotate(false);
//     }, 500);
//   };

//   const handleSort = (sortType) => {
//     if (!accessToken) return;

//     let url = "";

//     switch (sortType) {
//       case "calories":
//         url = `https://localhost:7298/api/Recipe/by-calories?minCalories=${calorieMin}&maxCalories=${calorieMax}`;
//         break;
//       case "ingredient":
//         url = `https://localhost:7298/api/Recipe/by-ingredient?ingredient=${ingredient}`;
//         break;
//       case "mealtype":
//         url = `https://localhost:7298/api/Recipe/by-mealtype?mealType=${mealType}`;
//         break;
//       default:
//         return;
//     }

//     fetch(url, {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setFiltered(data);
//         setSelectedRecipe(data[0]);
//       });
//   };

//   return (
//     <div className="bg-[#f5f7ed] min-h-screen p-6">
//       <nav className="flex justify-between items-center mb-10">
//         <div className="flex items-center gap-10 ml-4">
//           <div className="text-red-600 font-bold border-b-2 border-red-600">Search</div>
//           <div className="text-gray-700">Shop</div>
//           <div className="text-gray-700">Share</div>
//         </div>
//         <div className="flex gap-6 items-center">
//           <div className="w-8 h-8 bg-gray-300 rounded-full" />
//         </div>
//       </nav>

//       {filtered.length > 0 && selectedRecipe && (
//         <div className="grid md:grid-cols-2 gap-10 mb-20">
//           <div className="flex justify-center items-center relative">
//             <div className="absolute w-[400px] h-[500px] bg-black -translate-y-1/2"></div>
//             <img
//               src={selectedRecipe.imageUrl}
//               alt={selectedRecipe.name}
//               className={`relative rounded-full w-[400px] h-[400px] object-cover border-8 border-black shadow-lg transition-transform duration-500 ${rotate ? "animate-spin-slow" : ""}`}
//             />
//           </div>

//           <div className="flex flex-col justify-center">
//             <h1 className="text-7xl font-semibold">{selectedRecipe.name.split(" ")[0]}</h1>
//             <h2 className="text-5xl italic text-gray-600 mb-4">{selectedRecipe.name.split(" ")[1]}</h2>
//             <p className="text-gray-500 mb-4">{selectedRecipe.description}</p>
//             <div className="text-3xl text-red-600 font-bold mb-4">${selectedRecipe.price}</div>
//             <div className="flex gap-2 items-center">
//               <button className="px-3 py-1 bg-white text-black rounded">-</button>
//               <span className="px-3">1</span>
//               <button className="px-3 py-1 bg-white text-black rounded">+</button>
//               <button className="ml-4 px-4 py-2 bg-white text-black rounded shadow flex items-center gap-2">
//                 <span className="material-icons">shopping_cart</span>
//                 Add Food
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="flex justify-center items-center">
//         <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12">
//           {filtered.slice(0, 4).map((recipe) => (
//             <div
//               key={recipe.id}
//               onClick={() => handleRecipeClick(recipe)}
//               className={`cursor-pointer bg-black lg:ml-30 lg-mr-30 text-white rounded-2xl h-[200px] w-[190px] p-4 shadow-lg relative transition-transform hover:scale-105 ${
//                 selectedRecipe?.id === recipe.id ? "ring-4 ring-green-600" : ""
//               }`}
//             >
//               <img
//                 src={recipe.imageUrl}
//                 alt={recipe.name}
//                 className="w-24 h-24 object-cover rounded-full absolute -top-10 -left-4 border-4 border-white"
//               />
//               <div className="mt-12">
//                 <div className="text-sm text-white">{recipe.calories}</div>
//                 <div className="font-semibold text-lg mt-1 italic">
//                   {recipe.name}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="absolute right-20 top-24 w-[280px] bg-white shadow-xl rounded-2xl p-6">
//         <div className="flex justify-between items-center mb-4">
//           <span className="text-gray-500 text-sm">Sort by</span>
//         </div>

//         <button
//           onClick={() => setSelectedSort("calories")}
//           className={`px-4 py-2 rounded w-full ${
//             selectedSort === "calories" ? "bg-black text-white" : "bg-gray-100"
//           }`}
//         >
//           Sort by Calories
//         </button>

//         {selectedSort === "calories" && (
//           <div className="mt-2 space-y-2">
//             <input
//               type="number"
//               placeholder="Min Calories"
//               value={calorieMin}
//               onChange={(e) => setCalorieMin(e.target.value)}
//               className="w-full px-2 py-1 border border-gray-300 rounded"
//             />
//             <input
//               type="number"
//               placeholder="Max Calories"
//               value={calorieMax}
//               onChange={(e) => setCalorieMax(e.target.value)}
//               className="w-full px-2 py-1 border border-gray-300 rounded"
//             />
//             <button
//               onClick={() => handleSort("calories")}
//               className="w-full px-4 py-1 bg-orange-500 text-white rounded"
//             >
//               Apply
//             </button>
//           </div>
//         )}

//         <button
//           onClick={() => setSelectedSort("ingredient")}
//           className={`px-4 py-2 rounded w-full mt-2 ${
//             selectedSort === "ingredient" ? "bg-black text-white" : "bg-gray-100"
//           }`}
//         >
//           Sort by Ingredient
//         </button>

//         {selectedSort === "ingredient" && (
//           <div className="mt-2 space-y-2">
//             <input
//               type="text"
//               placeholder="Ingredient"
//               value={ingredient}
//               onChange={(e) => setIngredient(e.target.value)}
//               className="w-full px-2 py-1 border border-gray-300 rounded"
//             />
//             <button
//               onClick={() => handleSort("ingredient")}
//               className="w-full px-4 py-1 bg-orange-500 text-white rounded"
//             >
//               Apply
//             </button>
//           </div>
//         )}

//         <button
//           onClick={() => setSelectedSort("mealtype")}
//           className={`px-4 py-2 rounded w-full mt-2 ${
//             selectedSort === "mealtype" ? "bg-black text-white" : "bg-gray-100"
//           }`}
//         >
//           Sort by Meal Type
//         </button>

//         {selectedSort === "mealtype" && (
//           <div className="mt-2 space-y-2">
//             <input
//               type="text"
//               placeholder="Meal Type"
//               value={mealType}
//               onChange={(e) => setMealType(e.target.value)}
//               className="w-full px-2 py-1 border border-gray-300 rounded"
//             />
//             <button
//               onClick={() => handleSort("mealtype")}
//               className="w-full px-4 py-1 bg-orange-500 text-white rounded"
//             >
//               Apply
//             </button>
//           </div>
//         )}
//       </div>

//       <style>{`
//         .animate-spin-slow {
//           animation: spin 0.5s linear;
//         }

//         @keyframes spin {
//           0% {
//             transform: rotate(0deg);
//           }
//           100% {
//             transform: rotate(360deg);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";
// import Cookies from "js-cookie";

// export default function RecipeApp() {
//   const [recipes, setRecipes] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [selectedRecipe, setSelectedRecipe] = useState(null);
//   const [searchText, setSearchText] = useState("");
//   const [mealType, setMealType] = useState("");
//   const [ingredient, setIngredient] = useState("");
//   const [calorieMin, setCalorieMin] = useState(0);
//   const [calorieMax, setCalorieMax] = useState(1000);
//   const [rotate, setRotate] = useState(false);
//   const [selectedSort, setSelectedSort] = useState("");

//   const accessToken = Cookies.get("accessToken");

//   useEffect(() => {
//     if (!accessToken) return;

//     fetch("https://localhost:7298/api/Recipe", {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setRecipes(data);
//         setFiltered(data);
//         setSelectedRecipe(data[0]);
//       });
//   }, [accessToken]);

//   const handleSort = (type) => {
//     setSelectedSort(type);
//     let url = "";

//     if (type === "calories") {
//       url = `https://localhost:7298/api/Recipe/by-calories?minCalories=${calorieMin}&maxCalories=${calorieMax}`;
//     } else if (type === "ingredient") {
//       url = `https://localhost:7298/api/Recipe/by-ingredient?ingredient=${ingredient}`;
//     } else if (type === "mealType") {
//       url = `https://localhost:7298/api/Recipe/by-mealtype?mealType=${mealType}`;
//     }

//     fetch(url, {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setFiltered(data);
//         setSelectedRecipe(data[0]);
//       });
//   };

//   const handleRecipeClick = (recipe) => {
//     setRotate(true);
//     setTimeout(() => {
//       setSelectedRecipe(recipe);
//       setRotate(false);
//     }, 500);
//   };

//   return (
//     <div className="bg-[#f5f7ed] min-h-screen p-6 relative">
//       <nav className="flex justify-between items-center mb-10">
//         <div className="flex items-center gap-10 ml-4">
//           <div className="text-red-600 font-bold border-b-2 border-red-600">Search</div>
//           <div className="text-gray-700">Shop</div>
//           <div className="text-gray-700">Share</div>
//         </div>
//         <div className="flex gap-6 items-center">
//           <div className="w-8 h-8 bg-gray-300 rounded-full" />
//         </div>
//       </nav>

//       {/* SORT BOX */}
//       <div className="absolute right-20 top-24 w-[280px] bg-white shadow-xl rounded-2xl p-6 z-50">
//         <div className="flex justify-between items-center">
//           <span className="bg-orange-400 text-white px-3 py-1 rounded text-2xl font-bold">4.9</span>
//           <span className="text-gray-400 text-sm">Overview | Ingredients</span>
//         </div>
//         <h3 className="text-lg font-semibold mt-4">Chef Feny</h3>
//         <p className="text-sm text-gray-600 mt-2">
//           Kau terindah kan selalu terindah, apalagi masakanmu. Ahayy malah nge gombal si abang.
//         </p>
//         <div className="text-sm text-gray-500 mt-4">❤️ 96 likes</div>
//         <div className="mt-6">
//           <div className="flex flex-col gap-2">
//             <button
//               onClick={() => handleSort("calories")}
//               className={`px-4 py-2 rounded ${
//                 selectedSort === "calories" ? "bg-black text-white" : "bg-gray-100"
//               }`}
//             >
//               Sort by Calories
//             </button>
//             <button
//               onClick={() => handleSort("ingredient")}
//               className={`px-4 py-2 rounded ${
//                 selectedSort === "ingredient" ? "bg-black text-white" : "bg-gray-100"
//               }`}
//             >
//               Sort by Ingredient
//             </button>
//             <button
//               onClick={() => handleSort("mealType")}
//               className={`px-4 py-2 rounded ${
//                 selectedSort === "mealType" ? "bg-black text-white" : "bg-gray-100"
//               }`}
//             >
//               Sort by Meal Type
//             </button>
//           </div>
//         </div>
//         <div className="mt-6 flex justify-end">
//           <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-lg">
//             🎤
//           </div>
//         </div>
//       </div>

//       {/* SELECTED RECIPE */}
//       {filtered.length > 0 && selectedRecipe && (
//         <div className="grid md:grid-cols-2 gap-10 mb-20">
//           <div className="flex justify-center items-center relative">
//             <div className="absolute w-[400px] h-[500px] bg-black -translate-y-1/2"></div>
//             <img
//               src={selectedRecipe.imageUrl}
//               alt={selectedRecipe.name}
//               className={`relative rounded-full w-[400px] h-[400px] object-cover border-8 border-black shadow-lg transition-transform duration-500 ${rotate ? "animate-spin-slow" : ""}`}
//             />
//           </div>

//           <div className="flex flex-col justify-center">
//             <h1 className="text-7xl font-semibold">{selectedRecipe.name.split(" ")[0]}</h1>
//             <h2 className="text-5xl italic text-gray-600 mb-4">{selectedRecipe.name.split(" ")[1]}</h2>
//             <p className="text-gray-500 mb-4">{selectedRecipe.description}</p>
//             <div className="text-3xl text-red-600 font-bold mb-4">${selectedRecipe.price}</div>
//             <div className="flex gap-2 items-center">
//               <button className="px-3 py-1 bg-white text-black rounded">-</button>
//               <span className="px-3">1</span>
//               <button className="px-3 py-1 bg-white text-black rounded">+</button>
//               <button className="ml-4 px-4 py-2 bg-white text-black rounded shadow flex items-center gap-2">
//                 <span className="material-icons">shopping_cart</span>
//                 Add Food
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* CARDLAR */}
//       <div className="flex justify-center items-center">
//         <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12">
//           {filtered.slice(0, 4).map((recipe) => (
//             <div
//               key={recipe.id}
//               onClick={() => handleRecipeClick(recipe)}
//               className={`cursor-pointer bg-black lg:ml-30 lg-mr-30 text-white rounded-2xl h-[200px] w-[190px] p-4 shadow-lg relative transition-transform hover:scale-105 ${
//                 selectedRecipe?.id === recipe.id ? "ring-4 ring-green-600" : ""
//               }`}
//             >
//               <img
//                 src={recipe.imageUrl}
//                 alt={recipe.name}
//                 className="w-24 h-24 object-cover rounded-full absolute -top-10 -left-4 border-4 border-white"
//               />
//               <div className="mt-12">
//                 <div className="text-sm text-white">{recipe.calories}</div>
//                 <div className="font-semibold text-lg mt-1 italic">
//                   {recipe.name}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <style>{`
//         .animate-spin-slow {
//           animation: spin 0.5s linear;
//         }
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// }
