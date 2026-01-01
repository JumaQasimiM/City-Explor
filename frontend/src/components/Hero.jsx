import heroImg from "../assets/hero.jpeg";

export const Hero = () => {
  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Hi");
  };
  const input =
    "flex-1 p-3 rounded-md border border-gray-700 text-gray-400 focus:border-gray-600";
  return (
    <section
      className="w-full h-[90vh] flex flex-col items-center justify-center bg-cover bg-center relative mt-19"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/*  content */}
      <div className="relative z-10 max-w-3xl text-center px-5 flex flex-col items-center animate-fadeIn">
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
          <span className="font-milonga"> Welcome to</span>{" "}
          <span className="text-green-400 font-caveat">City Explor</span>
        </h1>

        {/* descption */}
        <p className="text-white text-lg md:text-xl mb-8 leading-relaxed max-w-xl drop-shadow-md font-roboto">
          Discover the best places in the city with our curated guides, maps,
          and tips. Explore, experience, and enjoy every moment.
        </p>

        {/* CTA button */}
        <button className="bg-green-400 text-white px-8 py-3 rounded font-semibold hover:bg-green-500 hover:scale-105 hover:-translate-y-1 transition transform shadow-lg">
          Get Started
        </button>
      </div>

      {/* search section */}
      <div className="relative z-10 w-full max-w-6xl mt-10 px-5">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-3 bg-slate-900 p-5 rounded-lg shadow-lg"
        >
          <input
            type="text"
            name="city"
            placeholder="City (Jaghori)"
            className={input}
          />
          <input
            type="text"
            name="type"
            placeholder="Type (Hotel, Supermarket...)"
            className={input}
          />
          <input
            type="text"
            name="distance"
            placeholder="Distance (20km)"
            className={input}
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-600 transition"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};
