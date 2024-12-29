
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const Search = ({ className, onSearch }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchKeyword);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-y-2.5 relative ${className}`}
    >
      <div className="relative">
        <FiSearch className="absolute left-3 top-0 translate-y-3 md:translate-y-4 w-6 h-6 text-[#959EAD]" />
        <input
          className="placeholder:font-bold font-semibold text-dark-soft placeholder:text-[#959EAD] rounded-lg pl-12 pr-3 w-full py-3 focus:outline-none  md:py-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]" 
          type="text"
          placeholder="Search article"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      <button
        type="submit"
        className="w-full bg-primary text-white font-semibold rounded-lg px-5 py-3 mt-2 md:mt-0 md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 md:w-fit md:py-2"
      >
        Search
      </button>
      </div>
    </form>
  );
};

export default Search;