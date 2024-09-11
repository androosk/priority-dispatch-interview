import { useState, useEffect, useRef, useCallback } from "react";
import { Heart } from "lucide-react";
import Modal from "./Modal";

interface ResultsContainerProps {
  dogImageList: string[] | null;
  error: string | null;
}

const ResultsContainer: React.FC<ResultsContainerProps> = ({
  dogImageList,
  error,
}) => {
  const [displayedImages, setDisplayedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("dogFavorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const loadMoreImages = useCallback(() => {
    if (dogImageList && !isLoading) {
      setIsLoading(true);
      const currentLength = displayedImages.length;
      const nextImages = dogImageList.slice(currentLength, currentLength + 8);
      setDisplayedImages(prevImages => [...prevImages, ...nextImages]);
      setIsLoading(false);
    }
  }, [dogImageList, displayedImages, isLoading]);

  useEffect(() => {
    if (dogImageList) {
      setDisplayedImages(dogImageList.slice(0, 8));
    }
  }, [dogImageList]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver(entries => {
      const first = entries[0];
      if (first.isIntersecting) {
        loadMoreImages();
      }
    }, options);

    if (loadingRef.current) {
      observer.current.observe(loadingRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loadMoreImages]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleFavorite = (imageUrl: string) => {
    let newFavorites;
    if (favorites.includes(imageUrl)) {
      newFavorites = favorites.filter(url => url !== imageUrl);
    } else {
      newFavorites = [...favorites, imageUrl];
    }
    setFavorites(newFavorites);
    localStorage.setItem("dogFavorites", JSON.stringify(newFavorites));
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  if (error) {
    return (
      <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        Error: {error}
      </div>
    );
  }

  return (
    dogImageList && (
      <div className="mt-4 p-4 bg-transparent border border-gray-300 rounded shadow">
        <h1 className="text-4xl pb-2 text-center">Search Results!</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedImages.map((imageUrl, index) => (
            <div key={index} className="aspect-w-1 aspect-h-1 relative group">
              <img
                src={imageUrl}
                alt={`Dog ${index + 1}`}
                className="object-cover w-full h-full rounded cursor-pointer"
                loading="lazy"
                onClick={() => handleImageClick(imageUrl)}
              />
              <button
                onClick={e => {
                  e.stopPropagation();
                  toggleFavorite(imageUrl);
                }}
                className="absolute top-2 right-2 p-2 bg-white bg-opacity-75 rounded-full transition-opacity duration-300 md:opacity-0 group-hover:opacity-100"
              >
                <Heart
                  size={24}
                  className={
                    favorites.includes(imageUrl)
                      ? "text-red-500 fill-current"
                      : "text-gray-500"
                  }
                />
              </button>
            </div>
          ))}
        </div>
        <div ref={loadingRef} className="h-10 mt-4"></div>
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
    )
  );
};

export default ResultsContainer;
