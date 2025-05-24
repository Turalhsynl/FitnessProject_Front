import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import smoothie1 from "../../assets/Background.png";
import smoothie2 from "../../assets/Smoothie.png";
import { data } from "react-router-dom";

export default function RecipeApp() {
  const [recipes, setRecipes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(1);
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);
  const [calorieMin, setCalorieMin] = useState(0);
  const [calorieMax, setCalorieMax] = useState(1000);
  const [ingredient, setIngredient] = useState("");
  const [selectedSort, setSelectedSort] = useState(null);
  const [rotate, setRotate] = useState(false);
  const accessToken = Cookies.get("accessToken");
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
      });
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
      
      setRotate(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-pink-100 font-sans">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        
        <img src={smoothie1} alt="Smoothie" className="" />
        <img
  src={smoothie2}
  className="absolute bottom-0 right-0  z-0"
  alt="Smoothie Decorative"
/>


      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center p-10 gap-8">
        <div className="ml-[40px]">
          <h1 className="text-[90px] font-bold text-white drop-shadow">{selectedRecipe.name}</h1>
         <p className="text-white text-[20px]">{selectedRecipe.calories} calories</p>
          <p className="text-white mt-4 w-4/6 leading-relaxed text-lg font-light">{typedText}</p>

          {/* <h1 className="text-[120px] font-bold text-white drop-shadow">{selectedRecipe.name}</h1>
         <p className="text-white text-[20px]">{selectedRecipe.calories} calories</p>
          <p className="text-white mt-4 w-4/5 leading-relaxed text-lg font-light">{typedText}</p> */}

          <div className="flex space-x-4 mt-6">
            {filtered.slice(0, 4).map((recipe) => (
              <img
                key={recipe.id}
                onClick={() => handleRecipeClick(recipe)}
                src={recipeImages[recipe.id]}
                alt={recipe.name}
                className={`w-24 h-24 rounded-full border-4 cursor-pointer transition-transform transform hover:scale-110 shadow-md ${
                  selectedRecipe?.id === recipe.id ? "border-purple-500" : "border-white"
                }`}
              />
            ))}
          </div>
        </div>

        {selectedRecipe && (
          
          <div className="flex flex-col items-center justify-center">
            <div className="">
              
            </div>
              
            <img
  src={recipeImages[selectedRecipe.id]}
  alt={selectedRecipe.name}
  className={`rounded-full w-[350px] mt-[130px] h-[350px] lg:w-[600px] lg:h-[600px] border-[16px] border-purple-400 object-cover transition-transform duration-700 shadow-2xl hover:scale-105 ${
    rotate ? "animate-spin-slow" : ""
  }`}
/>

           
          </div>
        )}
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

