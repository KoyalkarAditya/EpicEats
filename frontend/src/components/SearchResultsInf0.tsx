import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};
export const SearchResultsInfo = ({ total, city }: Props) => {
  return (
    <div className="text-xl font-bold flex flex-col gap-3 justify-center lg:items-center lg:flex-row">
      <span>
        {total} Restaurants found in {city}
        <Link
          className="text-sm ml-2 cursor-pointer text-blue-500 font-semibold"
          to={"/"}
        >
          Change Location
        </Link>
      </span>
    </div>
  );
};
