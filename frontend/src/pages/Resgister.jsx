import { useNavigate } from "react-router-dom";
import { useCreateUser } from "../hooks/useUsers";

import avator from "../assets/hero.jpeg";
import { toast } from "react-toastify";
export const RegisterUser = () => {
  const navigate = useNavigate();
  const { createUser, error, loading } = useCreateUser();
  // handle submit form
  const checkEmail = async (email) => {
    const res = await fetch(`http://localhost:3000/users?email=${email}`);
    const data = await res.json();
    return data.length > 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    // check repeat email
    const email = formData.get("email").trim();

    // skip check if empty
    if (!email) {
      toast.error("Please enter an email");
      return;
    }

    const isEmailExists = await checkEmail(email);

    if (isEmailExists) {
      toast.error("This email already exists");
      return;
    }

    // check file --- image
    const avatarFile = formData.get("avator");
    if (!avatarFile || avatarFile.size === 0) {
      toast.error("Please select an image");
      return;
    }

    const validType = ["image/png", "image/jpeg"];
    if (!validType.includes(avatarFile.type)) {
      toast.error("Invalid image type. Only PNG or JPG allowed.");
      return;
    }

    const formValues = {
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
      email: email,
      password: formData.get("password"),
      status: "pending",
      role: formData.get("role"),
      dateOfBirth: formData.get("db"),
      created_at: new Date().toISOString().split("T")[0],
      avator: avatarFile.name,
      securityQuestions: [
        {
          question: "What is your birth city?",
          answer: formData.get("answer1"),
        },
        {
          question: "What is your birth day?",
          answer: formData.get("answer2"),
        },
      ],
    };

    // console.log(formValues);
    // save to database
    const newUser = createUser(formValues);
    if (newUser) {
      toast.success(
        "Your account has been created successfully. Please wait for admin approval to activate your account."
      );
      form.reset();
      navigate("/login");
    } else {
      toast.error(error || "Something went wrong");
    }
  };

  return (
    <section
      style={{ backgroundImage: `url(${avator})` }}
      className="min-h-screen mt-14 flex items-center justify-center bg-gray-100 dark:bg-slate-900 px-4"
    >
      <div className="w-full max-w-3xl bg-white dark:bg-slate-800 dark:text-white/90 rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-3xl font-semibold text-center mb-6 dark:text-white">
          Register User
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* First / Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">First Name</label>
              <input
                type="text"
                name="firstname"
                placeholder="First name"
                className="input"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Last Name</label>
              <input
                type="text"
                name="lastname"
                placeholder="Last name"
                className="input"
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
                <option value="">Select purpose</option>
                <option value="guest">Guest / Trip</option>
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
                placeholder="you@gmail.com"
                className="input"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                placeholder="********"
                className="input"
              />
            </div>
          </div>
          {/* Security Questions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                What is your birth city?
              </label>
              <input
                type="text"
                name="answer1"
                placeholder="jaghori"
                className="input"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                What is your birth day?
              </label>
              <input
                type="text"
                name="answer2"
                placeholder="23"
                className="input"
              />
            </div>
          </div>

          {/* Image */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Profile Image</label>
            <input type="file" name="avator" className="file-input" />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition"
          >
            Register
          </button>
        </form>
      </div>
    </section>
  );
};
