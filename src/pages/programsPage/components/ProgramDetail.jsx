import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ProgramDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const program = location.state?.program;

  if (!program) {
    navigate('/');
    return null;
  }

  const getYouTubeEmbedUrl = (url) => {
    const videoId = url?.split('v=')[1]?.split('&')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 mt-20">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="h-[350px] md:h-auto">
            <img
              src={program.imageUrl || 'https://via.placeholder.com/500x400'}
              alt={program.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <h1 className="text-4xl font-extrabold text-gray-900 italic mb-4">{program.name}</h1>
            <p className="text-gray-600 text-md mb-6">{program.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl text-center shadow-sm">
                <p className="text-sm text-gray-500">Duration</p>
                <p className="text-lg font-semibold text-gray-800">{program.durationInWeeks} weeks</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl text-center shadow-sm">
                <p className="text-sm text-gray-500">Level</p>
                <p className="text-lg font-semibold text-gray-800">{program.level}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl text-center shadow-sm">
                <p className="text-sm text-gray-500">Gender</p>
                <p className="text-lg font-semibold text-gray-800">{program.gender}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl text-center shadow-sm">
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-lg font-semibold text-green-600">{program.price} AZN</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      {program.videoUrl && getYouTubeEmbedUrl(program.videoUrl) && (
        <div className="max-w-6xl mx-auto mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Workout Video</h2>
          <div className="rounded-xl overflow-hidden shadow-lg">
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
      <div className="max-w-6xl mx-auto mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Included Recipes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {program.recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300"
            >
              <img
                src={recipe.imageUrl || "https://via.placeholder.com/300x200"}
                alt={recipe.name}
                className="w-full h-[200px] object-cover rounded-t-2xl"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{recipe.name}</h3>
                <p className="text-sm text-gray-600">{recipe.description}</p>
                <p className="text-sm text-gray-500 mt-2 italic">Calories: {recipe.calories}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgramDetails;
