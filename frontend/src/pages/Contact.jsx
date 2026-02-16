import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";
import { toast } from "react-toastify";
export const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("  Thank you for reaching out! We’ll get back to you soon.");
  };

  return (
    <section className="relative w-full min-h-screen bg-gray-100 dark:bg-slate-900 dark:text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-5">
        {/* ================= Header ================= */}
        <div className="text-center mb-20">
          <h1 className="font-caveat text-4xl md:text-7xl font-bold">
            Get in <span className="text-green-500">Touch</span>
          </h1>

          <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Have questions, feedback, or ideas? We’d love to hear from you and
            help you explore cities better.
          </p>
        </div>

        {/* ================= Content ================= */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* -------- Contact Info -------- */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-3">Contact Information</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-md">
                Reach out to us through any of the following channels. Our team
                is always happy to help.
              </p>
            </div>

            <div className="space-y-5">
              {/* Email */}
              <div className="flex items-center gap-4 bg-white dark:bg-slate-800 rounded-xl p-5 shadow hover:shadow-lg transition">
                <div className="p-3 bg-indigo-500/10 rounded-lg">
                  <FaEnvelope className="text-indigo-500 text-xl" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Email</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    support@cityexplor.com
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4 bg-white dark:bg-slate-800 rounded-xl p-5 shadow hover:shadow-lg transition">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <FaPhoneAlt className="text-green-500 text-xl" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Phone</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    +93 790 236 089
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4 bg-white dark:bg-slate-800 rounded-xl p-5 shadow hover:shadow-lg transition">
                <div className="p-3 bg-pink-500/10 rounded-lg">
                  <FaMapMarkerAlt className="text-pink-500 text-xl" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Location</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Jaghori, Afghanistan
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* -------- Contact Form -------- */}
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-10 overflow-hidden">
            {/* Decorative Blur */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-teal-400/20 rounded-full blur-3xl"></div>

            <h2 className="text-2xl font-bold mb-2">Send us a message</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Fill out the form and we’ll respond as soon as possible.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full rounded-lg border border-gray-300 dark:border-slate-600
                             bg-transparent px-4 py-3
                             focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="w-full rounded-lg border border-gray-300 dark:border-slate-600
                             bg-transparent px-4 py-3
                             focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  rows="5"
                  required
                  placeholder="Write your message here..."
                  className="w-full rounded-lg border border-gray-300 dark:border-slate-600
                             bg-transparent px-4 py-3
                             focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2
                           bg-green-600 hover:bg-green-700 duration-150
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
