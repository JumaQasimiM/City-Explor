import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserById } from "../../hooks/useUsers";
import { useCities } from "../../hooks/useCities";
import { useCategories } from "../../hooks/useCategories";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { InputField } from "../../components/helper/Input";
import { SelectField } from "../../components/helper/SelectField";
import { ApiUrl } from "../../api/ApiUrl";
export const AddPlace = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { cities } = useCities();
  const { categories } = useCategories();

  const [servicesList, setServicesList] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    address: "",
    category: "",
    city: "",
    opening_hours: "",
    contact_number: "",
    website: "",
    services: [],
  });

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  // fetch services
  useEffect(() => {
    fetch(`${ApiUrl}/services/`)
      .then((res) => res.json())
      .then(setServicesList)
      .catch(() => toast.error("Failed to load services"));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "category" || name === "city" ? Number(value) : value,
    }));
  };

  const handleServiceChange = (id) => {
    setForm((prev) => {
      const exists = prev.services.includes(id);

      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== id)
          : [...prev.services, id],
      };
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreview(previewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.access) {
      toast.error("Not authenticated");
      return;
    }

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (key === "services") return;
      formData.append(key, value);
    });

    form.services.forEach((s) => {
      formData.append("services", s);
    });

    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      const res = await fetch(`${ApiUrl}/places/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.access}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        throw new Error("Failed");
      }

      toast.success("Place created ");
      navigate("/dashboard/places");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create place ");
    }
  };

  if (!user) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Add New Place</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* GENERAL */}
        <Card title="General Information">
          <div className="grid md:grid-cols-2 gap-4">
            <InputField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            <SelectField
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
              options={categories}
              optionLabel="name"
            />
          </div>
        </Card>

        {/* LOCATION */}
        <Card title="Location">
          <div className="grid md:grid-cols-2 gap-4">
            <InputField
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
            />

            <SelectField
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
              options={cities}
              optionLabel="name"
            />
          </div>
        </Card>

        {/* CONTACT */}
        <Card title="Contact">
          <div className="grid md:grid-cols-3 gap-4">
            <InputField
              label="Opening Hours"
              name="opening_hours"
              value={form.opening_hours}
              onChange={handleChange}
            />

            <InputField
              label="Phone"
              name="contact_number"
              value={form.contact_number}
              onChange={handleChange}
            />

            <InputField
              label="Website"
              name="website"
              value={form.website}
              onChange={handleChange}
            />
          </div>
        </Card>

        {/* SERVICES */}
        <Card title="Services">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {servicesList.map((s) => (
              <label
                key={s.id}
                className="flex items-center gap-2 p-2 border rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={form.services.includes(s.id)}
                  onChange={() => handleServiceChange(s.id)}
                />
                {s.title}
              </label>
            ))}
          </div>
        </Card>

        {/* DESCRIPTION */}
        <Card title="Description">
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </Card>

        {/* IMAGES */}
        <Card title="Upload Images" span={false}>
          <input type="file" multiple onChange={handleImageChange} />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {preview.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="preview"
                className="h-28 w-full object-cover rounded"
              />
            ))}
          </div>
        </Card>

        {/* BUTTONS */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded"
          >
            Create Place
          </button>
        </div>
      </form>
    </section>
  );
};

/* CARD */
const Card = ({ title, children, span = true }) => (
  <div className="bg-white shadow p-5 rounded">
    <h2 className="font-semibold mb-4">
      {title} {span && <span className="text-red-500">*</span>}
    </h2>
    {children}
  </div>
);
