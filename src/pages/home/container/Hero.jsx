import React from "react";
import images from "../../../constants/images";
import Search from "../../../components/Search";

const Hero = ({ setSearchKeyword }) => {
  return (
    <section className="container mx-auto flex flex-col lg:flex-row py-4 px-4 max-w-6xl">
      <div className="mt-10 lg:w-1/2 lg:mt-14">
        <h1 className="text-3xl text-center font-bold text-dark-soft md:text-5xl lg:text-4xl xl:text-5xl lg:text-left lg:max-w-[540px]">
          Read the most interesting articles
        </h1>
        <p className="text-dark-light mt-4 text-center md:text-xl lg:text-base xl:text-xl lg:text-left">
          Dive into a world of captivating stories and insightful content. From
          thought-provoking topics to the latest trends, our blog offers a wide
          range of articles that keep you informed and inspired.
        </p>
        <Search
          className="mt-10 lg:mt-6 xl:mt-10"
          onSearch={setSearchKeyword}
        />
      </div>
      <div className="hidden lg:block lg:1/2">
        <img className="w-full" src={images.heroImage} alt="hero" />
      </div>
    </section>
  );
};

export default Hero;
