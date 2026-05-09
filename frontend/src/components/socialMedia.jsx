import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";
export const SocialMedia = () => {
  // create animation
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        <motion.h2
          {...fadeInUp}
          className="font-quicksand font-bold text-2xl md:text-4xl text-gray-900 mb-4"
        >
          Stay Connected With Us
        </motion.h2>

        <motion.p
          {...fadeInUp}
          className="text-gray-600 max-w-2xl mx-auto mb-10"
        >
          Stay connected for local stories, beautiful places, and new
          experiences around Jaghori.
        </motion.p>

        <motion.div {...fadeInUp} className="flex justify-center gap-6">
          {/* Facebook */}
          <a
            href="#"
            aria-label="Facebook"
            className="w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-md text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            <FaFacebook size={24} />
          </a>

          {/* Instagram */}
          <a
            href="#"
            aria-label="Instagram"
            className="w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-md text-pink-500 hover:bg-gradient-to-tr hover:from-pink-500 hover:to-yellow-500 hover:text-white transition-all duration-300"
          >
            <FaInstagram size={24} />
          </a>

          {/* Twitter / X */}
          <a
            href="#"
            aria-label="Twitter"
            className="w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-md text-black hover:bg-black hover:text-white transition-all duration-300"
          >
            <FaXTwitter size={22} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
