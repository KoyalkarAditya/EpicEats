import landingPage from "../assets/landing.png";
const HomePage = () => {
  return (
    <div className=" flex  flex-col gap-12">
      <div className=" bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className=" text-5xl font-bold tracking-tight text-orange-600">
          Food that fits your lifestyle, delivered fast.
        </h1>
        <span className="text-xl">Food is Just a Click away!</span>
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
