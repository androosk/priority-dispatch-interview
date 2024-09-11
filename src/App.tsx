import { useState } from "react";
import SearchForm from "./components/SearchForm";
import ResultsContainer from "./components/ResultsContainer";
import FavoritesContainer from "./components/FavoritesContainer";
import { getDogImagesByBreed, ApiResponse } from "./utils/dogApi";

const App: React.FC = () => {
  const [dogImages, setDogImages] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data: ApiResponse = await getDogImagesByBreed(query);
      if (Array.isArray(data.message)) {
        setDogImages(data.message);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      setDogImages(null);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(`Failed to fetch images for ${query}. Please try again.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-sunny-day bg-center bg-no-repeat bg-fixed">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Find Dog Images by Breed!
        </h1>
        <div className="flex flex-col content-center items-center">
          <SearchForm onSearch={handleSearch} />
          <button
            className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
            onClick={() => setShowFavorites(!showFavorites)}
          >
            {!showFavorites ? "Show" : "Hide"} Favorites
          </button>
        </div>
        {showFavorites && <FavoritesContainer />}
        {isLoading ? (
          <div className="text-center mt-4">Loading...</div>
        ) : (
          <ResultsContainer dogImageList={dogImages} error={error} />
        )}
      </div>
    </div>
  );
};

export default App;
