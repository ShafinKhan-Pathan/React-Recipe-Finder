import { Heart, HeartPulse, Soup } from "lucide-react";
import { useState, useEffect } from "react";

const fetchOnlyTwoLabelValue = (arr) => {
  if (!arr || arr.length === 0) return [];
  return arr.slice(0, 2);
};

const RecipeCard = ({ recipe, bg, badge }) => {
  const { idMeal, strMeal, strMealThumb, strYoutube, strCategory, strArea } =
    recipe;

  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    setIsFavourite(favourites.some((fav) => fav.idMeal === idMeal));
  }, [idMeal]);

  const displayLabels = [];
  if (strCategory) displayLabels.push(strCategory);
  if (strArea) displayLabels.push(strArea);
  const healthLabelsToShow = fetchOnlyTwoLabelValue(displayLabels);

  const addRecipeToFavourites = () => {
    let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    const isRecipeAlreadyInFavourites = favourites.some(
      (fav) => fav.idMeal === idMeal
    );

    if (isRecipeAlreadyInFavourites) {
      favourites = favourites.filter((fav) => fav.idMeal !== idMeal);
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
        href={
          strYoutube ||
          `https://www.youtube.com/results?search_query=${encodeURIComponent(
            strMeal || ""
          )} recipe`
        }
        target="_blank"
        rel="noopener noreferrer"
        className="relative h-48 block"
      >
        <div className="skeleton absolute inset-0" />
        <img
          src={strMealThumb || "/no-image.png"}
          null
          alt={strMeal || "Recipe Image"}
          className="rounded-md w-full h-full object-cover cursor-pointer opacity-0 transition-opacity duration-500"
          onLoad={(e) => {
            e.currentTarget.style.opacity = 1;
            e.currentTarget.previousElementSibling.style.display = "none";
          }}
          onError={(e) => {
            e.currentTarget.src = "/no-image.png";
            e.currentTarget.style.opacity = 1;
            e.currentTarget.previousElementSibling.style.display = "none";
          }}
        />

        {strYoutube && (
          <div className="absolute bottom-2 left-2 bg-red-600 text-white p-1 rounded-full text-xs flex items-center gap-1">
            <Soup size={"16"} /> Watch Video
          </div>
        )}

        <div
          className="absolute top-2 right-2 bg-white rounded-full p-1 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            addRecipeToFavourites();
          }}
        >
          {!isFavourite ? (
            <Heart
              size={"20"}
              className="hover:fill-red-500 hover:text-red-500"
            />
          ) : (
            <Heart size={"20"} className="fill-red-500 text-red-500" />
          )}
        </div>
      </a>

      <div className="flex mt-1">
        <p className="font-bold tracking-wide">{strMeal}</p>{" "}
      </div>

      <p className="my-2 text-sm text-gray-700">
        {strCategory &&
          strCategory.charAt(0).toUpperCase() + strCategory.slice(1)}
        {strArea && ` (${strArea} Kitchen)`}
        {!strCategory && !strArea && "General Kitchen"}{" "}
      </p>

      <div className="flex gap-2 mt-auto flex-wrap">
        {healthLabelsToShow.map((label, index) => (
          <div
            key={index}
            className={`flex gap-1 ${badge} items-center p-1 rounded-md text-xs`}
          >
            <HeartPulse size={14} />
            <span className="tracking-tighter font-semibold">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeCard;
