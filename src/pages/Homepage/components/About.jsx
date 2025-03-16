import React from "react";
import Run from "../../../assets/Photos/Run-Man.jpg"

const About = () => {
  return (
    <div className=" text-white py-16 ">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-xl md:text-2xl font-bold italic text-white mb-4">
            OUR PHILOSOPHY <span className="text-purple-500">_</span>
          </h2>
          <p className="text-gray-300 mb-6">
            as summarised in our philosophy and mission statement we believe that the potential
            to achieve any desired health and fitness goal lies within each and every one. 💪
          </p>
          <a
            href="#"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            More About Us →
          </a>
        </div>
        <div>
          <img
            src={Run}
            alt="Gym Philosophy"
            className=""
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center mt-16">
        <div>
          <img
            src={Run}
            alt="Personal Training"
            className="shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold italic text-purple-500 mb-4">
            Personal Training <span className="text-purple-500">_</span>
          </h2>
          <p className="text-gray-300 mb-6">
            The scope of practice for a personal trainer has a primary focus on prevention and
            involves enhancing components of health and fitness for the general, healthy population
            or those cleared for exercise.
          </p>
          <a
            href="#"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Get The PT →
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;