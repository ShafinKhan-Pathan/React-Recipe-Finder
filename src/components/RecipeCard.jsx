import { Heart, HeartPulse, Soup } from "lucide-react";
import { useState } from "react";

const fetchOnlyTwoLabelValue = (arr) => {
  return [arr[0], arr[1]];
};
const RecipeCard = ({ recipe, bg, badge }) => {
  const [isFavourite, setIsFavourite] = useState(
    localStorage.getItem("favourites")?.includes(recipe.label)
  );
  const healthLabels = fetchOnlyTwoLabelValue(recipe.healthLabels);
  const addRecipeToFavourites = () => {
    let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    const isRecipeAlreadyInFavourites = favourites.some(
      (fav) => fav.label === recipe.label
    );
    if (isRecipeAlreadyInFavourites) {
      favourites = favourites.filter((fav) => fav.label !== recipe.label);
      setIsFavourite(false);
    } else {
      favourites.push(recipe);
      setIsFavourite(true);
    }
    localStorage.setItem("favourites", JSON.stringify(favourites));
  };
  return (
    <div
      className={`flex flex-col rounded-md ${bg} overflow-hidden p-3 relative`}
    >
      <a
        href={`https://www.youtube.com/results?search_query=${recipe.label} recipe`}
        target="_blank"
        className="relative h-48"
      >
        <div className="skeleton absolute inset-0" />
        <img
          src={recipe.image}
          alt="Recipe Image"
          className="rounded-md w-full h-full object-cover cursor-pointer opacity-0 transition-opacity duration-500"
          onLoad={(e) => {
            e.currentTarget.style.opacity = 1;
            e.currentTarget.previousElementSibling.style.display = "none";
          }}
        />
        <div className="absolute bottom-2 left-2 bg-white rounded-full cursor-pointer flex items-center p-1 gap-1 text-sm">
          <Soup size={"16"} />
          {recipe.yield} Servings
        </div>
        <div
          className="absolute top-2 right-2 bg-white rounded-full p-1 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            addRecipeToFavourites();
          }}
        >
          {!isFavourite && (
            <Heart
              size={"20"}
              className="hover:fill-red-500 hover:text-red-500"
            />
          )}
          {isFavourite && (
            <Heart size={"20"} className="fill-red-500 text-red-500" />
          )}
        </div>
      </a>
      <div className="flex mt-1">
        <p className="font-bold tracking-wide">{recipe.label}</p>
      </div>
      <p className="my-2">
        {recipe.cuisineType[0].charAt(0).toUpperCase() +
          recipe.cuisineType[0].slice(1)}{" "}
        Kitchen
      </p>
      <div className="flex gap-2 mt-auto">
        {healthLabels.map((label, idlabel) => (
          <div
            key={idlabel}
            className={`flex gap-1 ${badge} items-center p-1 rounded-md`}
          >
            <HeartPulse size={16} />
            <span className="text-sm tracking-tighter font-semibold">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeCard;
