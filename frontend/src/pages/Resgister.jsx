import { useNavigate } from "react-router-dom";
import { useCreateUser } from "../hooks/useUsers";
import { IoIosWarning } from "react-icons/io";
import { toast } from "react-toastify";
import backgroundImage from "../assets/jaghori2.jpg";

export const RegisterUser = () => {
  const navigate = useNavigate();
  const { createUser, error, loading } = useCreateUser();

  // Check if email already exists
  const checkEmail = async (email) => {
    const res = await fetch(`http://localhost:3000/users?email=${email}`);
    const data = await res.json();
    return data.length > 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const firstname = formData.get("firstname").trim();
    const lastname = formData.get("lastname").trim();
    const email = formData.get("email").trim();
    const password = formData.get("password").trim();
    const role = formData.get("role");
    const dateOfBirth = formData.get("db");
    const answer1 = formData.get("answer1").trim();
    const answer2 = formData.get("answer2").trim();
    const avatarFile = formData.get("avator");

    // Validation
    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !role ||
      !dateOfBirth ||
      !answer1 ||
      !answer2
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const isEmailExists = await checkEmail(email);
    if (isEmailExists) {
      toast.error("This email already exists");
      return;
    }

    if (!avatarFile || avatarFile.size === 0) {
      toast.error("Please select a profile image");
      return;
    }

    const validType = ["image/png", "image/jpeg"];
    if (!validType.includes(avatarFile.type)) {
      toast.error("Invalid image type. Only PNG or JPG allowed.");
      return;
    }

    const formValues = {
      firstname,
      lastname,
      email,
      password,
      role,
      dateOfBirth,
      status: "pending",
      created_at: new Date().toISOString().split("T")[0],
      avator: avatarFile.name,
      securityQuestions: [
        { question: "What is your birth city?", answer: answer1 },
        { question: "What is your birth day?", answer: answer2 },
      ],
    };

    const newUser = await createUser(formValues);
    if (newUser) {
      toast.success("Account created successfully! Wait for admin approval.");
      e.target.reset();
      navigate("/login");
    } else {
      toast.error(error || "Something went wrong");
    }
  };

  return (
    <section
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="min-h-screen mt-14 flex items-center justify-center bg-gray-100 dark:bg-slate-900 px-4 bg-cover bg-center bg-no-repeat"
    >
      <div className="w-full max-w-3xl my-23 bg-gray-200 dark:bg-slate-800 dark:text-white/90 rounded shadow-lg p-6 md:p-8">
        <h1 className="text-3xl font-semibold text-center mb-6 dark:text-white">
          Register User
        </h1>
        <p>
          All fields are required <span className="text-red-600">*</span>
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">First Name</label>
              <input
                type="text"
                name="firstname"
                className="input"
                placeholder="First name"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Last Name</label>
              <input
                type="text"
                name="lastname"
                className="input"
                placeholder="Last name"
              />
            </div>
          </div>

          {/* DOB / Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Date of Birth</label>
              <input type="date" name="db" className="input" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Role</label>
              <select className="input" name="role">
                <option value="">Select role</option>
                <option value="guest">Guest / Trip</option>
                <option value="writer">Writer</option>
                <option value="business">Business</option>
              </select>
            </div>
          </div>

          {/* Email / Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="you@gmail.com"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                className="input"
                placeholder="********"
              />
            </div>
          </div>

          {/* Security Questions */}
          <h1 className="text-orange-600 flex items-center gap-2">
            <IoIosWarning size={30} /> Security Questions – Remember these for
            password reset!
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                What is your birth city?
              </label>
              <input
                type="text"
                name="answer1"
                className="input"
                placeholder="Jaghori"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                What is your birth day?
              </label>
              <input
                type="text"
                name="answer2"
                className="input"
                placeholder="23"
              />
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Profile Image</label>
            <input type="file" name="avator" className="file-input" />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded transition"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </section>
  );
};
