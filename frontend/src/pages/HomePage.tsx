import { useNavigate } from "react-router-dom";
import landingPage from "../assets/landing.png";
import SearchBar, { SearchForm } from "../components/SearchBar";
const HomePage = () => {
  const navigate = useNavigate();
  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };
  return (
    <div className=" flex  flex-col gap-12">
      <div className=" bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className=" text-5xl font-bold tracking-tight text-orange-600">
          Food that fits your lifestyle, delivered fast.
        </h1>
        <span className="text-xl">Food is Just a Click away!</span>
        <SearchBar
          placeHolder="Search by City or  Town"
          onSubmit={handleSearchSubmit}
        />
      </div>
      <div className=" grid md:grid-cols-2 gap-5">
        <img src={landingPage} />
        <div className=" flex flex-col items-center text-center justify-center gap-4">
          <span className=" font-bold text-3xl tracking-tighter hover:text-orange-600">
            Order takeaway even faster!
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
