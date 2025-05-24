import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";


const ProgramDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const program = location.state?.program;
  const [programImage, setProgramImage] = useState(null);
  const accessToken = Cookies.get("accessToken");
  const [recipeImages, setRecipeImages] = useState({});
  const [recipes, setRecipes] = useState({});
  
  

  if (!program) {
    navigate('/');
    return null;
  }

  const fetchProgramImage = async (imageId, programId) => {
    try {
      const res = await fetch(`https://localhost:7298/api/File/${imageId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await res.json();
      setProgramImage(data.url);
    } catch (err) {
      console.error(`Program image fetch error for program ${programId}`, err);
    }
  };

  useEffect(() => {
    if (program?.imageId) {
      fetchProgramImage(program.imageId, program.id);
    }
  }, [program]);

  const getYouTubeEmbedUrl = (url) => {
    const videoId = url?.split('v=')[1]?.split('&')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };


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
        });
    }, [accessToken]);

  return (
    <div className="bg-black min-h-screen py-10 px-4 mt-20 text-white">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto bg-[#1f1f1f] rounded-3xl shadow-2xl overflow-hidden border border-purple-700">
        <div className="grid md:grid-cols-2">
          <div className="h-[350px] md:h-auto">
            <img
              src={programImage}
              alt={program.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <h1 className="text-4xl font-extrabold text-purple-400 italic mb-4">{program.name}</h1>
            <p className="text-gray-300 text-md mb-6">{program.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#2c2c2c] p-4 rounded-xl text-center shadow-md border border-purple-600">
                <p className="text-sm text-gray-400">Duration</p>
                <p className="text-lg font-semibold text-white">{program.durationInWeeks} weeks</p>
              </div>
              <div className="bg-[#2c2c2c] p-4 rounded-xl text-center shadow-md border border-purple-600">
                <p className="text-sm text-gray-400">Level</p>
                <p className="text-lg font-semibold text-white">{program.level}</p>
              </div>
              <div className="bg-[#2c2c2c] p-4 rounded-xl text-center shadow-md border border-purple-600">
                <p className="text-sm text-gray-400">Gender</p>
                <p className="text-lg font-semibold text-white">{program.gender}</p>
              </div>
              <div className="bg-[#2c2c2c] p-4 rounded-xl text-center shadow-md border border-purple-600">
                <p className="text-sm text-gray-400">Price</p>
                <p className="text-lg font-semibold text-green-400">{program.price} AZN</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      {program.videoUrl && getYouTubeEmbedUrl(program.videoUrl) && (
        <div className="max-w-6xl mx-auto mt-12">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">Workout Video</h2>
          <div className="rounded-xl overflow-hidden shadow-lg border border-purple-700">
            <iframe
              width="100%"
              height="450"
              src={getYouTubeEmbedUrl(program.videoUrl)}
              title="Program Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-[300px] md:h-[450px]"
            ></iframe>
          </div>
        </div>
      )}

      {/* Recipes Section */}
      {/* Recipes Section */}
<div className="max-w-6xl mx-auto mt-16">
  <h2 className="text-3xl font-bold text-purple-400 mb-8 text-center">Included Recipes</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {recipes && recipes.length > 0 ? (
      recipes.map((recipe) => (
        <div key={recipe.id} className="bg-[#1f1f1f] rounded-xl shadow-md p-4 border border-purple-700">
          <img
            src={recipeImages[recipe.id]}
            alt={recipe.name}
            className="rounded-xl w-full h-40 object-cover mb-4"
          />
          <h3 className="text-xl font-semibold text-purple-300 mb-2">{recipe.name}</h3>
          <p className="text-gray-400 text-sm">{recipe.description}</p>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500 col-span-full">No recipes found.</p>
    )}
  </div>
</div>

    </div>
  );
};

export default ProgramDetails;
