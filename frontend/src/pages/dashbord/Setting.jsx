import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../../context/AuthContext";
import {
  useChangePassword,
  useDeleteUser,
  useUpdateUser,
} from "../../hooks/useUsers";

// logo
import logo from "../../assets/logo.png";
export const Setting = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // =============================
  // Hooks (separate loading states)
  // =============================
  const {
    updateUser,
    loading: updateLoading,
    error: updateError,
  } = useUpdateUser();

  const {
    changePassword,
    loading: passwordLoading,
    error: passwordError,
  } = useChangePassword();

  const { deleteUser, loading: deleteLoading } = useDeleteUser();

  // =============================
  // Profile States
  // =============================
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");

  // =============================
  // Password States
  // =============================
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // =============================
  // Preferences
  // =============================
  const [theme, setTheme] = useState(false);
  const [language, setLanguage] = useState("English");

  // =============================
  // Fill user info
  // =============================
  useEffect(() => {
    if (user) {
      setFirstname(user.firstname || "");
      setLastname(user.lastname || "");
      setEmail(user.email || "");
      setDob(user.dateOfBirth || "");
    }
  }, [user]);

  // =============================
  // Load theme from localStorage
  // =============================
  useEffect(() => {
    const savedTheme = localStorage.getItem("CEXtheme");
    if (savedTheme === "dark") {
      setTheme(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("CEXtheme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("CEXtheme", "light");
    }
  }, [theme]);

  // =============================
  // Update Profile
  // =============================
  const submitUserInfo = async (e) => {
    e.preventDefault();
    if (!user) return;

    const payload = {
      firstname,
      lastname,
      email,
      dateOfBirth: dob,
    };

    const res = await updateUser(payload, user.id);

    if (res) {
      toast.success("Profile updated successfully");
    } else {
      toast.error("Failed to update profile");
    }
  };

  // =============================
  // Change Password
  // =============================
  const submitPassword = async (e) => {
    e.preventDefault();
    if (!user) return;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (user.password !== currentPassword) {
      toast.error("Current password is incorrect");
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

    const res = await changePassword({ password: newPassword }, user.id);

    if (res) {
      toast.success("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      toast.error("Failed to update password");
    }
  };

  // =============================
  // Delete Account
  // =============================
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
    <section className="min-h-screen bg-gray-50 dark:bg-slate-900 p-6 space-y-8 rounded-xl">
      <div className="max-w-6xl mx-auto space-y-10 ">
        <div className="">
          <h1 className="text-xl font-semibold text-slate-800 dark:text-white">
            Settings
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage your account settings
          </p>
        </div>

        {/* ================= Profile ================= */}
        <div className="bg-white dark:bg-slate-800 rounded shadow p-8">
          <h2 className="text-xl font-semibold mb-6 dark:text-white">
            Profile Information
          </h2>

          <div className="flex items-center gap-6 mb-8">
            {/* <FaUserCircle className="text-7xl text-gray-300" /> */}
            <img
              src={logo}
              alt={user.firstname}
              className="w-15 h-15 rounded-full outline-3 outline-green-400"
            />
            <div>
              <p className="font-medium dark:text-white">Update your avatar</p>
              <p className="text-sm text-gray-500">JPG, PNG. Max 2MB</p>
            </div>
          </div>

          <form onSubmit={submitUserInfo} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="First Name"
                className="input"
              />

              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder="Last Name"
                className="input"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
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
              disabled={updateLoading}
              className="bg-teal-500 hover:bg-teal-700 text-white px-6 py-2 rounded"
            >
              {updateLoading ? "Saving..." : "Save Changes"}
            </button>

            {updateError && (
              <p className="text-red-500 text-sm">{updateError}</p>
            )}
          </form>
        </div>

        {/* ================= Password ================= */}
        <div className="bg-white dark:bg-slate-800 rounded shadow p-8">
          <h2 className="text-xl font-semibold mb-6 text-amber-500">
            Change Password
          </h2>

          <form onSubmit={submitPassword} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="input"
              />

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input"
              />
            </div>

            <button
              disabled={passwordLoading}
              className="bg-teal-500 hover:bg-teal-700 text-white px-6 py-2 rounded"
            >
              {passwordLoading ? "Updating..." : "Change Password"}
            </button>

            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
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
            onClick={deleteAccount}
            disabled={deleteLoading}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
          >
            {deleteLoading ? "Deleting..." : "Delete Account"}
          </button>
        </div>
      </div>
    </section>
  );
};
