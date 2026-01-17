import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

export const Contact = () => {
  return (
    <section className="w-full min-h-screen bg-gray-100 dark:bg-slate-900 dark:text-white pt-28">
      <div className="max-w-7xl mx-auto px-5">
        {/* ---------------- Header ---------------- */}
        <div className="text-center mb-16">
          <span
            className="inline-block mb-4 px-4 py-1 text-sm font-semibold
                       bg-indigo-100 text-indigo-600
                       dark:bg-indigo-900 dark:text-indigo-300
                       rounded-full"
          >
            Contact Us
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold">
            Get in <span className="text-indigo-500">Touch</span>
          </h1>

          <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have questions, suggestions, or feedback? We’d love to hear from
            you.
          </p>
        </div>

        {/* ---------------- Content ---------------- */}
        <div className="grid md:grid-cols-2 gap-14">
          {/* -------- Contact Info -------- */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>

            <div className="flex items-center gap-4 bg-white dark:bg-slate-800 rounded-xl p-5 shadow">
              <FaEnvelope className="text-indigo-500 text-xl" />
              <div>
                <p className="text-sm font-semibold">Email</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  support@cityexplor.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white dark:bg-slate-800 rounded-xl p-5 shadow">
              <FaPhoneAlt className="text-green-500 text-xl" />
              <div>
                <p className="text-sm font-semibold">Phone</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  +1 (234) 567-890
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white dark:bg-slate-800 rounded-xl p-5 shadow">
              <FaMapMarkerAlt className="text-pink-500 text-xl" />
              <div>
                <p className="text-sm font-semibold">Location</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  New York, United States
                </p>
              </div>
            </div>
          </div>

          {/* -------- Contact Form -------- */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>

            <form className="space-y-5">
              <div>
                <label className="text-sm font-medium">Your Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="mt-1 w-full rounded-lg border border-gray-300
                             dark:border-slate-600 bg-transparent px-4 py-2
                             focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="mt-1 w-full rounded-lg border border-gray-300
                             dark:border-slate-600 bg-transparent px-4 py-2
                             focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Message</label>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  className="mt-1 w-full rounded-lg border border-gray-300
                             dark:border-slate-600 bg-transparent px-4 py-2
                             focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2
                           bg-indigo-600 hover:bg-indigo-700
                           text-white font-semibold
                           rounded-lg px-6 py-3 transition"
              >
                <FaPaperPlane />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
