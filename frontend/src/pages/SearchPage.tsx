import { useParams } from "react-router-dom";
import { useSearchRestaurants } from "../api/RestaurantApi";
import { SearchResultsInfo } from "../components/SearchResultsInf0";
import SearchResultsCard from "../components/SearchResultsCard";

const SearchPage = () => {
  const { city } = useParams();
  const { results, isLoading } = useSearchRestaurants(city);

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (!results?.data || !city) {
    return <span>No Results found</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisine-list">Cuisines</div>
      <div id="main-content" className="flex flex-col ">
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
