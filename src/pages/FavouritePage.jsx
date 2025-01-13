import { useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { getRandomColor } from "../lib/utils";

const FavouritePage = () => {
  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  return (
    <div className="bg-[#faf9fb] p-10 flex-1">
      <div className="max-w-screen-lg mx-auto">
        <p className="font-bold text-3xl md:text-5xl my-4">
          My <span className="text-green-700">Favourites</span>{" "}
        </p>
        {favourites.length === 0 && (
          <div className="h-[80vh] flex flex-col items-center gap-4">
            <img src="/404.svg" alt="Page not found 404" />
          </div>
        )}

        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {favourites.map((recipe) => (
            <RecipeCard
              key={recipe.label}
              recipe={recipe}
              {...getRandomColor()}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavouritePage;
