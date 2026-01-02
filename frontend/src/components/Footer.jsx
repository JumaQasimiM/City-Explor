import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16">
      <div className="max-w-7xl mx-auto px-5 border-t-2 border-t-gray-500 pt-5">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-green-400 mb-4 font-caveat">
              City Explor
            </h2>
            <p className="text-sm leading-relaxed text-slate-400">
              Discover cities, hotels, and hidden gems. Your trusted guide for
              budget-friendly and unforgettable travel experiences.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-green-400 cursor-pointer">Home</li>
              <li className="hover:text-green-400 cursor-pointer">
                Popular Places
              </li>
              <li className="hover:text-green-400 cursor-pointer">Hotels</li>
              <li className="hover:text-green-400 cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-green-400 cursor-pointer">Blog</li>
              <li className="hover:text-green-400 cursor-pointer">
                Travel Tips
              </li>
              <li className="hover:text-green-400 cursor-pointer">FAQs</li>
              <li className="hover:text-green-400 cursor-pointer">Support</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Newsletter
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              Get travel inspiration & deals directly to your inbox.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 text-sm bg-slate-800 border border-white/10 rounded-l-md focus:outline-none focus:border-green-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white text-sm rounded-r-md hover:bg-green-400 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center py-6 gap-4">
          {/* Copyright */}
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} City Explor. All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a className="p-2 rounded-full bg-slate-800 hover:bg-green-500 transition cursor-pointer">
              <FaFacebookF size={14} />
            </a>
            <a className="p-2 rounded-full bg-slate-800 hover:bg-green-500 transition cursor-pointer">
              <FaInstagram size={14} />
            </a>
            <a className="p-2 rounded-full bg-slate-800 hover:bg-green-500 transition cursor-pointer">
              <FaTwitter size={14} />
            </a>
            <a className="p-2 rounded-full bg-slate-800 hover:bg-green-500 transition cursor-pointer">
              <FaYoutube size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
