import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlinePhotograph } from "react-icons/hi";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useDeleteUser, useUpdateUser } from "../../hooks/useUsers";

export const Setting = () => {
  const { user, logout } = useAuth();
  const { updateUser, changePassword, loading, error } = useUpdateUser();
  const { deleteUser } = useDeleteUser();
  // =========================
  // Profile States
  // =========================
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");

  const navigate = useNavigate();
  // =========================
  // Password States
  // =========================
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // =========================
  // Preferences
  // =========================
  const [theme, setTheme] = useState(false);
  const [language, setLanguage] = useState("English");

  // =========================
  // Fill form when user loads
  // =========================
  useEffect(() => {
    if (user) {
      setFirstname(user.firstname || "");
      setLastname(user.lastname || "");
      setEmail(user.email || "");
      setDob(user.dateOfBirth || "");
    }
  }, [user]);

  // =========================
  // Dark mode effect
  // =========================
  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // =========================
  // Update Profile
  // =========================
  const submitUserInfo = async (e) => {
    e.preventDefault();
    if (!user) return;

    const payload = {
      firstname,
      lastname,
      email,
      dateOfBirth: dob,
    };

    const success = await updateUser(payload, user.id);
    if (success) {
      toast.success("update your Information successfully");
    } else {
      toast.error("something went wrong!");
    }
  };

  // =========================
  // Change Password
  // =========================
  const submitPassword = async (e) => {
    e.preventDefault();
    if (!user) return;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const payload = {
      currentPassword,
      newPassword,
    };

    const res = await changePassword(payload, user.id);

    if (res) {
      toast.success("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  // ==========================
  // delete acout
  // ==========================
  const deleteAccount = async () => {
    if (!user) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete your account?",
    );

    if (!confirmed) return;

    const success = await deleteUser(user.id);

    if (success) {
      toast.success("Account deleted successfully");
      logout();
      navigate("/");
    } else {
      toast.error("Failed to delete account");
    }
  };

  if (!user) return null;

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-slate-900 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold dark:text-white">Settings</h1>

        {/* ================= Profile ================= */}
        <div className="bg-white dark:bg-slate-800 rounded shadow p-8">
          <h2 className="text-xl font-semibold mb-6 dark:text-white">
            Profile Information
          </h2>

          <div className="flex items-center gap-6 mb-8">
            <FaUserCircle className="text-7xl text-gray-300" />
            <div>
              <p className="font-medium dark:text-white">Update your avatar</p>
              <p className="text-sm text-gray-500">JPG, PNG. Max 2MB</p>
            </div>
          </div>

          <form onSubmit={submitUserInfo} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="input"
              />

              <input
                type="text"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="input"
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
              />

              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="input"
              />
            </div>

            <button
              disabled={loading}
              className="bg-teal-500 hover:bg-teal-700 text-white px-6 py-2 rounded"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </div>

        {/* ================= Password ================= */}
        <div className="bg-white dark:bg-slate-800 rounded shadow p-8 ">
          <h2 className="text-xl font-semibold mb-6 text-amber-500">
            Change Password
          </h2>

          <form onSubmit={submitPassword} className="space-y-6">
            <div className="flex flex-col md:flex-row">
              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="input mx-2"
              />

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input mx-2"
              />

              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input mx-2"
              />
            </div>
            <button
              disabled={loading}
              className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-700"
            >
              {loading ? "Updating..." : "Change Password"}
            </button>
          </form>
        </div>

        {/* ================= Preferences ================= */}
        <div className="bg-white dark:bg-slate-800 rounded shadow p-8 space-y-6">
          <h2 className="text-xl font-semibold dark:text-white">Preferences</h2>

          <div className="flex justify-between items-center">
            <p className="dark:text-white">Dark Mode</p>
            <button
              onClick={() => setTheme(!theme)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                theme ? "bg-indigo-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full transition ${
                  theme ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>

          <div>
            <label className="block mb-2 dark:text-gray-300">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="input"
            >
              <option>English</option>
              <option>German</option>
              <option>Farsi</option>
            </select>
          </div>
        </div>

        {/* ================= Danger Zone ================= */}
        <div className="bg-white dark:bg-slate-800 rounded shadow p-8 border border-red-300">
          <h2 className="text-xl font-semibold text-red-600 mb-4">
            Danger Zone
          </h2>
          <button
            onClick={() => deleteAccount()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
          >
            Delete Account
          </button>
        </div>
      </div>
    </section>
  );
};
