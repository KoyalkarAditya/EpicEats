import { useParams } from "react-router-dom";
import { useSearchRestaurants } from "../api/RestaurantApi";

const SearchPage = () => {
  const { city } = useParams();
  const { results, isLoading } = useSearchRestaurants(city);

  return (
    <span>
      {" "}
      city = {city}
      {results?.data.map((restaurant) => (
        <>{restaurant.restaurantName}</>
      ))}
    </span>
  );
};
//9.33.17
export default SearchPage;
