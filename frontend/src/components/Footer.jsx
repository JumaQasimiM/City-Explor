import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Optional: subscription logic
  };

  return (
    <footer className="bg-gray-50 dark:bg-slate-800 dark:text-slate-200 pt-16">
      <div className="max-w-7xl mx-auto px-5 border-t-2 border-t-gray-200 dark:border-t-slate-600 pt-5">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b dark:border-white/10 border-slate-300">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-green-500 mb-4 font-caveat">
              City Explor
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Discover cities, hotels, and hidden gems. Your trusted guide for
              budget-friendly and unforgettable travel experiences.
            </p>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="text-lg font-semibold dark:text-slate-200 mb-4">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              {["Home", "Popular Places", "Hotels", "Contact"].map((item) => (
                <li
                  key={item}
                  className="hover:text-green-400 cursor-pointer transition-colors duration-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold dark:text-slate-200 mb-4">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              {["Blog", "Travel Tips", "FAQs", "Support"].map((item) => (
                <li
                  key={item}
                  className="hover:text-green-400 cursor-pointer transition-colors duration-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold dark:text-slate-200 mb-4">
              Newsletter
            </h3>
            <p className="text-sm dark:text-slate-300 text-slate-600 mb-4">
              Get travel inspiration & deals directly to your inbox.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-1 shadow-md rounded-md overflow-hidden"
              onSubmit={handleSubscribe}
            >
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 text-sm dark:bg-slate-700 bg-gray-200 border-none focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-400 text-white text-sm font-semibold hover:from-green-400 hover:to-green-500 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Designed by */}
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 text-center">
          Designed by Mohammad Juma Qasimi
        </p>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center py-6 gap-4">
          {/* Copyright */}
          <p className="text-xs text-slate-700 dark:text-slate-300">
            © {new Date().getFullYear()} City Explor. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map(
              (Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  aria-label="Social Link"
                  className="p-3 rounded-full bg-gray-200 dark:bg-slate-700 hover:bg-green-500 dark:hover:bg-green-500 text-gray-700 dark:text-slate-200 transition transform hover:scale-110"
                >
                  <Icon size={16} />
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
