import { useState, useEffect } from "react";

export default function RecipeShowcase() {
  const [recipes, setRecipes] = useState([]);
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    fetch("/api/Recipe")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setFeatured(data[0]);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f4f4] px-10 py-8 font-sans relative overflow-hidden">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-400 uppercase">#1 Most loved dish</p>
          <h2 className="text-5xl font-light leading-none mt-2">LOTEK</h2>
          <h1 className="text-6xl font-black text-gray-800">PERKEDEL</h1>
          <div className="flex gap-6 mt-6 text-sm text-gray-600">
            <button className="flex items-center gap-1">▶ Play video</button>
            <button className="flex items-center gap-1">🍽️ Order food</button>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="text-xl">🔍</button>
          <button className="text-xl">☰</button>
        </div>
      </div>

      <div className="absolute top-24 left-1/4">
        <img
          src={featured?.imageUrl || "https://via.placeholder.com/300"}
          alt={featured?.name}
          className="w-[350px] h-[350px] object-cover rounded-full border-8 border-white shadow-xl"
        />
      </div>


      <div className="absolute right-20 top-24 w-[280px] bg-white shadow-xl rounded-2xl p-6">
        <div className="flex justify-between items-center">
          <span className="bg-orange-400 text-white px-3 py-1 rounded text-2xl font-bold">4.9</span>
          <span className="text-gray-400 text-sm">Overview | Ingredients</span>
        </div>
        <h3 className="text-lg font-semibold mt-4">Chef Feny</h3>
        <p className="text-sm text-gray-600 mt-2">
          Kau terindah kan selalu terindah, apalagi masakanmu. Ahayy malah nge gombal si abang.
        </p>
        <div className="text-sm text-gray-500 mt-4">❤️ 96 likes</div>
        <div className="mt-6 flex justify-end">
          <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-lg">
            🎤
          </div>
        </div>
      </div>

  
      <div className="absolute bottom-10 left-10 right-10 flex items-center gap-4 overflow-x-auto">
        <button className="text-2xl">⬅️</button>
        {recipes.map((r, i) => (
          <div
            key={i}
            className={`w-24 h-24 flex-shrink-0 bg-white shadow-md rounded-xl p-1 flex flex-col items-center justify-center ${
              i === 0 ? "border-2 border-gray-400" : ""
            }`}
          >
            <img
              src={r.imageUrl || "https://via.placeholder.com/100"}
              alt={r.name}
              className="w-full h-16 object-cover rounded-lg"
            />
            <p className="text-xs text-center mt-1 truncate">{r.name}</p>
          </div>
        ))}
        <button className="text-2xl">➡️</button>
      </div>
    </div>
  );
}
