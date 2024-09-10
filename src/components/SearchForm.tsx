import { useState } from "react";

interface SearchFormProps {
  onSearch: (query: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
    setQuery("");
  };

  return (
    <div className="w-full flex justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="flex items-center py-2 gap-4">
          <input
            className="appearance-none border-2 border-blue-500 w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none rounded-md"
            type="text"
            placeholder="Search your Location Here..."
            aria-label="Search"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button
            className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
