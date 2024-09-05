import { Link } from "react-router-dom";
import { Restaurant } from "../types";
import { AspectRatio } from "./ui/aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";

type Props = {
  restaurant: Restaurant;
};

const SearchResultsCard = ({ restaurant }: Props) => {
  console.log(restaurant);
  return (
    <Link
      to={`/detail/restaurant/${restaurant._id}`}
      className="grid lg:grid-cols-[2fr_3fr] group gap-10"
    >
      <AspectRatio ratio={16 / 6}>
        <img
          alt="restaurant-image"
          src={restaurant.imageURL}
          className="rounded-md w-full h-full object-cover"
        />
      </AspectRatio>
      <div>
        <h3 className="text-2xl font-bold tracking-tight mb2 group-hover:underline">
          {restaurant.restaurantName}
        </h3>
        <div id="card-content" className="grid md:grid-cols-2 gap-2">
          <div className="grid grid-cols-4">
            {restaurant.cuisines.map((item, index) => (
              <li key={index} className="list-none flex items-center">
                <Dot className="w-6 h-6" /> {item}
              </li>
            ))}
          </div>

          <div className="flex gap-2 flex-col">
            <div className="flex items-center gap-1 text-green-600">
              <Clock className="text-green-600" />
              {restaurant.estimatedDeliveryTime} mins
            </div>
            <div className="flex items-center gap-1">
              <Banknote />
              Delivery from $
              {(Number(restaurant.deliveryPrice) / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultsCard;
