import { useState } from "react";
import { Heart } from "lucide-react";
import useFavorites from "../utils/useFavorites";
import Modal from "./Modal";

const FavoritesContainer: React.FC = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="mt-4 p-4 bg-transparent border border-gray-300 rounded shadow">
      <h1 className="text-4xl pb-2 text-center">My Favorite Pups!</h1>
      {favorites.length === 0 ? (
        <div className="text-center text-gray-500">No favorite images yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((imageUrl, index) => (
            <div key={index} className="aspect-w-1 aspect-h-1 relative group">
              <img
                src={imageUrl}
                alt={`Favorite Dog ${index + 1}`}
                className="object-cover w-full h-full rounded cursor-pointer"
                loading="lazy"
                onClick={() => handleImageClick(imageUrl)}
              />
              <button
                onClick={e => {
                  e.stopPropagation();
                  toggleFavorite(imageUrl);
                }}
                className="absolute top-2 right-2 p-2 bg-white bg-opacity-75 rounded-full"
              >
                <Heart size={24} className="text-red-500 fill-current" />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={scrollToTop}
          className="px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition duration-300 shadow-lg"
        >
          ↑ Top
        </button>
      </div>
      <Modal
        isOpen={!!selectedImage}
        onClose={closeModal}
        imageUrl={selectedImage || ""}
      />
    </div>
  );
};

export default FavoritesContainer;
