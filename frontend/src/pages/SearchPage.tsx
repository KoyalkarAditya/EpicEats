import { useParams } from "react-router-dom";
import { useSearchRestaurants } from "../api/RestaurantApi";
import { SearchResultsInfo } from "../components/SearchResultsInf0";
import SearchResultsCard from "../components/SearchResultsCard";
import { useState } from "react";
import SearchBar, { SearchForm } from "../components/SearchBar";
import PaginationSelector from "../components/PaginationSelector";
import CuisinesFilter from "../components/CuisinesFilter";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
  });
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

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
      page: 1,
    }));
  };
  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };
  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };
  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisine-list">
        <CuisinesFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpendedClick={() => setIsExpanded((prev) => !prev)}
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
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
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};
//9.33.17
export default SearchPage;
