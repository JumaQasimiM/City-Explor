import { useNavigate } from "react-router-dom";
import { useCreateUser } from "../hooks/useUsers";
import { IoIosWarning } from "react-icons/io";
import { toast } from "react-toastify";
import backgroundImage from "../assets/jaghori2.jpg";
import { Loader } from "../components/helper/Loading";
import { ErrorMessage } from "../components/helper/Error";

export const RegisterUser = () => {
  const navigate = useNavigate();
  const { createUser, error, loading } = useCreateUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const first_name = form.get("first_name")?.trim();
    const last_name = form.get("last_name")?.trim();
    const email = form.get("email")?.trim();
    const username = form.get("username")?.trim();
    const password = form.get("password")?.trim();
    const bio = form.get("bio")?.trim();
    const avatar = form.get("avatar");

    // Validation
    if (!first_name || !last_name || !email || !username || !password) {
      toast.error("Please fill required fields");
      return;
    }

    if (!avatar || avatar.size === 0) {
      toast.error("Please select an avatar");
      return;
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(avatar.type)) {
      toast.error("Only PNG/JPG images allowed");
      return;
    }

    // IMPORTANT: FormData (for file upload)
    const formDataToSend = new FormData();

    formDataToSend.append("first_name", first_name);
    formDataToSend.append("last_name", last_name);
    formDataToSend.append("email", email);
    formDataToSend.append("username", username);
    formDataToSend.append("password", password);
    formDataToSend.append("bio", bio || "");
    formDataToSend.append("avatar", avatar);

    try {
      await createUser(formDataToSend);
      toast.success("Account created successfully ");
      e.target.reset();
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <section
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="font-quicksand min-h-screen flex items-center justify-center bg-cover bg-center px-4 relative py-20 my-15"
    >
      {/* Overlay */}
      <div className="absolute z-0 inset-0 bg-black/60"></div>
      <div className="z-10 w-full max-w-3xl bg-gray-200 dark:bg-slate-800/90 rounded p-6 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-xl md:text-4xl font-bold font-quicksand text-gray-900 dark:text-white">
            Register New User
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Create new account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-5"
        >
          {/* Names */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="first_name"
              placeholder="First name"
              className="input"
            />
            <input name="last_name" placeholder="Last name" className="input" />
          </div>

          {/* Username */}
          <input
            name="username"
            placeholder="Username"
            className="input w-full"
          />

          {/* Email + Password */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input"
            />
          </div>

          {/* Bio */}
          <textarea
            name="bio"
            placeholder="Bio (optional)"
            className="input w-full"
          />

          {/* Avatar */}
          <div>
            <label className="text-sm font-medium dark:text-gray-400">
              Profile Image
            </label>
            <input type="file" name="avatar" className="file-input w-full" />
          </div>

          {/* Warning */}
          <div className="dark:text-orange-500 text-orange-700 flex items-center gap-2">
            <IoIosWarning /> Upload a clear profile image
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>
      </div>
    </section>
  );
};
