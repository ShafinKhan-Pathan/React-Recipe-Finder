import { Search} from "lucide-react";
import RecipeCard from "../components/RecipeCard";

const HomePage = () => {
  return (
    <div className="bg-[#faf9fb] p-10 flex-1">
      <div className="max-w-screen-lg mx-auto">
        <form>
          <label className="input shadow-lg flex items-center gap-2">
            <Search size={"24"} />
            <input
              type="text"
              className="text-sm md:text-md grow"
              placeholder="What you wish to cook today?"
            />
          </label>
        </form>
        <p className="font-bold text-3xl md:text-5xl mt-4">Recommended <span className="text-green-700">Recipes</span> </p>
        <p className="font-semibold text-slate-500 ml-1 my-2 tracking-tight text-sm">Popular choices</p>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <RecipeCard />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
