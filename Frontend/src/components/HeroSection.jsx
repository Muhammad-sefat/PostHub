import React from "react";
import { NavLink } from "react-router-dom";

const HeroSection = () => {
  return (
    <div>
      <section className="bg-gradient-to-r from-blue-400 to-purple-400 text-white py-12 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Share Your Thoughts & Moments
        </h1>
        <p className="text-lg mb-6">
          Post your thoughts and images, interact with others, and see trending
          content!
        </p>
        <NavLink to={"/media"}>
          <button className="bg-white text-blue-500 font-semibold py-2 px-4 rounded hover:bg-gray-100">
            Get Started
          </button>
        </NavLink>
      </section>
    </div>
  );
};

export default HeroSection;
