import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlinePhotograph } from "react-icons/hi";

export const Setting = () => {
  const [theme, setTheme] = useState(false);
  const [language, setLanguage] = useState("English");

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-slate-900 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Settings
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Manage your account preferences and personal information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 space-y-4">
              <button className="w-full text-left font-medium text-indigo-600">
                Profile
              </button>
              <button className="w-full text-left text-gray-500 hover:text-indigo-600 transition">
                Security
              </button>
              <button className="w-full text-left text-gray-500 hover:text-indigo-600 transition">
                Preferences
              </button>
              <button className="w-full text-left text-red-500 hover:text-red-600 transition">
                Danger Zone
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Profile Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-8">
              <h2 className="text-xl font-semibold mb-6 dark:text-white">
                Profile Information
              </h2>

              {/* Avatar */}
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <FaUserCircle className="text-7xl text-gray-300" />
                  <button className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full text-white shadow-lg hover:scale-105 transition">
                    <HiOutlinePhotograph size={16} />
                  </button>
                </div>
                <div>
                  <p className="font-medium dark:text-white">
                    Update your avatar
                  </p>
                  <p className="text-sm text-gray-500">JPG, PNG. Max 2MB</p>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 transition"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl transition shadow-md">
                  Save Changes
                </button>
              </div>
            </div>

            {/* Preferences Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-8">
              <h2 className="text-xl font-semibold mb-6 dark:text-white">
                Preferences
              </h2>

              <div className="space-y-6">
                {/* Theme Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium dark:text-white">Dark Mode</p>
                    <p className="text-sm text-gray-500">
                      Switch between light and dark theme
                    </p>
                  </div>

                  <button
                    onClick={() => setTheme(!theme)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                      theme ? "bg-indigo-600" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                        theme ? "translate-x-6" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 transition"
                  >
                    <option>English</option>
                    <option>German</option>
                    <option>Farsi</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-8 border border-red-200 dark:border-red-900">
              <h2 className="text-xl font-semibold text-red-600 mb-4">
                Danger Zone
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Permanently delete your account and all associated data.
              </p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl transition shadow-md">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
