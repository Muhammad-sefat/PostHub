import React from "react";
import HeroSection from "../components/HeroSection";
import CreatePostSection from "../components/CreatePostSection";
import TopPosts from "../components/TopPosts";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <CreatePostSection />
      <TopPosts />
    </div>
  );
};

export default Home;
