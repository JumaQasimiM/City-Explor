import { motion } from "framer-motion";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const subscribe = () => {
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailReg.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setEmail("");

      toast.success("You’re now part of the journey.");
    }, 1200);
  };

  return (
    <section className="w-full bg-white dark:bg-black py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {/* badge */}
            <span
              className="
                inline-flex
                items-center
                px-4
                py-1.5
                rounded-full
                text-xs
                font-semibold
                tracking-[0.2em]
                uppercase
                border
                border-gray-300
                dark:border-gray-700
                text-gray-700
                dark:text-gray-300
                font-caveat
              "
            >
              Newsletter
            </span>

            {/* heading */}
            <h2
              className="
                mt-6
                text-4xl
                md:text-5xl
                font-bold
                tracking-tight
                text-gray-900
                dark:text-white
                leading-tight
                font-quicksand
              "
            >
              Discover{" "}
              <span className="font-caveat font-bold text-emerald-500 ">
                New Places
              </span>
              <span className="block mt-2">Delivered Weekly.</span>
            </h2>

            {/* text */}
            <p
              className="
                mt-6
                text-gray-600
                dark:text-gray-400
                text-lg
                leading-relaxed
                max-w-lg
              "
            >
              Get updates about beautiful destinations, hidden gems, local
              experiences, and new places worth exploring around Jaghori.
            </p>

            {/* form */}
            <div className="flex flex-col sm:flex-row gap-3 mt-10 max-w-xl">
              <div className="relative flex-1 ">
                <FaEnvelope
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && subscribe()}
                  placeholder="Enter your email"
                  className="
                    w-full
                    pl-11
                    pr-4
                    py-4
                    rounded
                    border
                    border-gray-300
                    dark:border-gray-700
                    bg-white
                    dark:bg-neutral-900
                    text-black
                    dark:text-white
                    focus:outline-none
                    focus:ring-2
                    focus:ring-emerald-500/30
                  "
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={loading}
                onClick={subscribe}
                className="
                  px-7
                  py-4
                  rounded
                  bg-emerald-500
                  hover:bg-emerald-600
                  text-white
                  font-medium
                  transition
                  shadow-emerald-500/20
                "
              >
                {loading ? "Please wait..." : "Subscribe"}
              </motion.button>
            </div>

            {/* footer text */}
            <p
              className="
                mt-4
                text-sm
                text-gray-400
                dark:text-gray-500
              "
            >
              No spam. Only meaningful updates and local discoveries.
            </p>
          </motion.div>

          {/* RIGHT CARD */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* background glow */}
            <div
              className="
                absolute
                -top-10
                -left-10
                w-52
                h-52
                bg-gray-50
                
                rounded-full
              "
            />
            <div
              className="
                absolute
                -bottom-10
                -right-10
                w-59
                h-52
                bg-gray-50
                
                rounded-full
              "
            />

            <div
              className="
                relative
                z-10
                rounded-md
                border
                border-gray-200
                dark:border-gray-800
                bg-gray-50
                dark:bg-neutral-900
                p-10
                shadow-xl
              "
            >
              <h3
                className="
                  text-2xl
                  font-semibold
                  text-gray-900
                  dark:text-white
                  font-quicksand
                  mb-8
                "
              >
                Why Join?
              </h3>

              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 mt-1">✓</span>

                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Discover hidden places
                    </p>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Explore locations beyond the usual tourist spots.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 mt-1">✓</span>

                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Local travel inspiration
                    </p>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Get ideas for authentic experiences and adventures.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 mt-1">✓</span>

                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Updates from Jaghori
                    </p>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Stay informed about new destinations and discoveries.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
