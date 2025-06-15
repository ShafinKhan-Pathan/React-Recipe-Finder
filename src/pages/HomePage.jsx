import { Search } from "lucide-react";
import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";
import { getRandomColor } from "../lib/utils";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("chicken");

  const fetchRecipes = async (query) => {
    setLoading(true);
    setRecipes([]);
    try {
      const finalQuery = query && query.trim() !== "" ? query : "chicken";
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${finalQuery}`;
      const response = await fetch(url);
      const data = await response.json(); // Fetching data from TheMealDB API

      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
      }
    } catch (error) {
      console.error("Error fetching recipes from TheMealDB:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(searchQuery);
  }, []);

  const handleSearchRecipe = (e) => {
    e.preventDefault();
    const query = e.target[0].value;
    setSearchQuery(query);
    fetchRecipes(query);
  };

  return (
    <div className="bg-[#faf9fb] p-10 flex-1">
      <div className="max-w-screen-lg mx-auto">
        <form onSubmit={handleSearchRecipe}>
          <label className="input shadow-lg flex items-center gap-2">
            <Search size={"24"} />
            <input
              type="text"
              className="text-sm md:text-md grow"
              placeholder="What you wish to cook today?"
            />
          </label>
        </form>
        <p className="font-bold text-3xl md:text-5xl mt-4">
          Recommended <span className="text-green-700">Recipes</span>{" "}
        </p>
        <p className="font-semibold text-slate-500 ml-1 my-2 tracking-tight text-sm">
          Popular choices
        </p>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {loading &&
            [...Array(9)].map((_, index) => (
              <div key={index} className="flex w-80 flex-col gap-4">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            ))}

          {!loading && recipes.length === 0 && (
            <p className="text-center text-lg text-gray-600 col-span-full">
              No recipes found for "{searchQuery}". Try something else!
            </p>
          )}

          {!loading &&
            recipes.map((meal) => (
              <RecipeCard
                key={meal.idMeal}
                recipe={meal}
                {...getRandomColor()}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
