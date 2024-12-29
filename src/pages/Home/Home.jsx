import React from "react";
import "./Home.css";
import HeroSection from "../../component/HeroSection/HeroSection";
import PublishedStories from "../PublishedStories/PublishedStories";
import MobileStoryCategory from "../../component/MobileStoryCategory/MobileStoryCategory";
import ShortNovels from "../../component/LatestStories/ShortNovel";
import PoetryStory from "../../component/LatestStories/PoetryStory";
import Drama from "../../component/LatestStories/Drama";
import Footer from "../../component/Footer/Footer";

const Home = () => {
  return (
    <div className="HomepageBody">
      <HeroSection />
      <MobileStoryCategory />
      <ShortNovels />
      <PoetryStory />
      <Drama />
      <PublishedStories />
      <Footer />
    </div>
  );
};

export default Home;
