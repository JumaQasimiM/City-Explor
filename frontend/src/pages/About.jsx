export const About = () => {
  return (
    <section className="w-full min-h-screen bg-gray-100 dark:bg-slate-900 dark:text-white pt-28">
      <div className="max-w-7xl mx-auto px-5">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-500">
            About Us
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover new places, explore cities, and create unforgettable
            experiences with City Explor.
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Explore Cities Like Never Before
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              City Explor helps you find the best destinations, hidden gems, and
              must-visit places in cities around the world.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Whether you are traveling for fun or adventure, we make exploring
              cities easy, exciting, and memorable.
            </p>
          </div>

          {/* Image / Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-3 text-green-500">
              Why Choose Us?
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li>🌍 Curated city guides</li>
              <li>📍 Hidden local spots</li>
              <li>❤️ Save your favorite places</li>
              <li>🚀 Simple & fast experience</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
