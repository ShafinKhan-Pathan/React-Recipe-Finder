import { Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import FavouritePage from "./pages/FavouritePage";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favourites" element={<FavouritePage />} />
      </Routes>
    </div>
  );
}

export default App;
