import React from "react";
import HeroSection from "../components/HeroSection";
import CreatePostSection from "../components/CreatePostSection";
import TopPosts from "../components/TopPosts";
import Stories from "../components/Stories";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Stories />
      <CreatePostSection />
      <TopPosts />
    </div>
  );
};

export default Home;
