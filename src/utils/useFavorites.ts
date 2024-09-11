import { useState, useEffect, useCallback } from "react";

const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const loadFavorites = useCallback(() => {
    const storedFavorites = localStorage.getItem("dogFavorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    loadFavorites();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "dogFavorites") {
        loadFavorites();
      }
    };

    const handleCustomEvent = () => loadFavorites();

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("favoritesUpdated", handleCustomEvent);

    const intervalId = setInterval(loadFavorites, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("favoritesUpdated", handleCustomEvent);
      clearInterval(intervalId);
    };
  }, [loadFavorites]);

  const toggleFavorite = (imageUrl: string) => {
    setFavorites(prevFavorites => {
      const newFavorites = prevFavorites.includes(imageUrl)
        ? prevFavorites.filter(url => url !== imageUrl)
        : [...prevFavorites, imageUrl];

      localStorage.setItem("dogFavorites", JSON.stringify(newFavorites));
      window.dispatchEvent(new Event("favoritesUpdated"));
      return newFavorites;
    });
  };

  return { favorites, toggleFavorite };
};

export default useFavorites;
