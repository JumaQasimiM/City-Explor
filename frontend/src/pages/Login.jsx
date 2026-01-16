import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// images
import backgroundImage from "../assets/jaghori2.jpg";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // from auth context -- useAuth hook
  const { user = [], login, loading, error } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email is requered");
      return;
    }
    if (!password) {
      toast.error("password is requered");
      return;
    }
    if (password.length < 4) {
      toast.error("Enter a valid password");
      return;
    }
    // email validation
    const emailExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailExp.test(email)) {
      toast.error("Enter a valid Email");
      return;
    }

    // login create in authContext
    await login(email, password);
  };
  useEffect(() => {
    if (user) {
      toast.success(`Welcome ${user.firstname}`);
      navigate("/dashboard", { replace: true });
    }

    if (error) {
      toast.error(error);
    }
  }, [user, error, navigate]);
  return (
    <section
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="min-h-screen bg-cover bg-center bg-no-repeat relative flex items-center justify-center px-4"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Card */}
      <div className="relative w-full max-w-md bg-gray-200 dark:bg-slate-800/90 backdrop-blur-xl rounded  p-8 md:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Login to your account
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="flex flex-col gap-2">
            <label className="form-label">Username or Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="input"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded text-lg font-semibold text-white 
            bg-gradient-to-r from-blue-600 to-indigo-600
            hover:from-blue-700 hover:to-indigo-700
            shadow-lg hover:shadow-xl transition-all"
          >
            Login
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center text-sm space-y-3">
          <a
            href="#"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Forgot your password?
          </a>

          <p className="text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};
