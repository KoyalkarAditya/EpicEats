import { useParams } from "react-router-dom";
import { useSearchRestaurants } from "../api/RestaurantApi";
import { SearchResultsInfo } from "../components/SearchResultsInf0";
import SearchResultsCard from "../components/SearchResultsCard";
import { useState } from "react";
import SearchBar, { SearchForm } from "../components/SearchBar";

export type SearchState = {
  searchQuery: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
  });
  const { results, isLoading } = useSearchRestaurants(searchState, city);

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (!results?.data || !city) {
    return <span>No Results found</span>;
  }
  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
    }));
  };
  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
    }));
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisine-list">Cuisines</div>
      <div id="main-content" className="flex flex-col ">
        <SearchBar
          searchQuery={searchState.searchQuery}
          placeHolder="Search by Cuisine or Restaurant"
          onReset={resetSearch}
          onSubmit={setSearchQuery}
        />
        <SearchResultsInfo total={results.pagination.total} city={city} />
        <div className="mt-10 flex flex-col gap-10">
          {results.data.map((restaurant, index) => (
            <SearchResultsCard key={index} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
};
//9.33.17
export default SearchPage;
