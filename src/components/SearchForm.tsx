import { useState, useEffect, useRef } from "react";
import { getDogList, ApiResponse, DogBreeds } from "../utils/dogApi";

interface SearchFormProps {
  onSearch: (query: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [dogList, setDogList] = useState<string[]>([]);
  const [filteredBreeds, setFilteredBreeds] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    async function fetchDogList() {
      try {
        const data: ApiResponse = await getDogList();
        if ("message" in data && typeof data.message === "object") {
          const breeds = Object.keys(data.message as DogBreeds);
          setDogList(breeds);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchDogList();
  }, []);

  useEffect(() => {
    const filtered = dogList.filter(breed =>
      breed.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBreeds(filtered);
    setShowDropdown(query.length > 0 && filtered.length > 0);
    setSelectedIndex(-1);
  }, [query, dogList]);

  useEffect(() => {
    if (dropdownRef.current && selectedIndex !== -1) {
      const selectedElement = dropdownRef.current.children[
        selectedIndex
      ] as HTMLElement;
      selectedElement.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [selectedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (showDropdown) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex(prev =>
            prev < filteredBreeds.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex !== -1) {
            setQuery(filteredBreeds[selectedIndex]);
            setShowDropdown(false);
          } else {
            handleSubmit();
          }
          break;
        case "Tab":
          if (selectedIndex !== -1) {
            e.preventDefault();
            setShowDropdown(false);
            handleSelect(filteredBreeds[selectedIndex]);
          }
          break;
        case "Escape":
          setShowDropdown(false);
          break;
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSelect = (breed: string) => {
    setQuery(breed);
    setShowDropdown(false);
  };

  const handleSubmit = () => {
    setShowDropdown(false);
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full flex justify-center">
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}
        className="w-full max-w-md relative"
      >
        <div className="flex items-center py-2 gap-4">
          <input
            className="appearance-none border-2 border-blue-500 w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none rounded-md"
            type="text"
            placeholder="Search for a dog breed..."
            aria-label="Search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Search
          </button>
        </div>
        {showDropdown && (
          <ul
            ref={dropdownRef}
            className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto"
          >
            {filteredBreeds.map((breed, index) => (
              <li
                key={breed}
                className={`px-4 py-2 cursor-pointer ${
                  index === selectedIndex ? "bg-blue-100" : "hover:bg-gray-100"
                }`}
                onClick={() => handleSelect(breed)}
              >
                {breed}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default SearchForm;
