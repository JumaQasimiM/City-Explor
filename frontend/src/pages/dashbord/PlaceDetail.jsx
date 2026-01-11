import { useParams, Link } from "react-router-dom";
import {
  usePlaceById,
  usePlaceOwner,
  usePlaceCity,
  usePlaceCategory,
} from "../../hooks/usePlaces";
import { Loader } from "../../components/helper/Loading";
import { ErrorMessage } from "../../components/helper/Error";

// image
import placeImage from "../../assets/hero.jpeg";
export const PlaceDetail = () => {
  const { id } = useParams();
  const { data: place, loading, error } = usePlaceById(id);

  const { data: owner } = usePlaceOwner(place.user_id);
  const { data: city } = usePlaceCity(place.city_id);
  const { data: category } = usePlaceCategory(place.category_id);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <section className="md:p-6 dark:bg-slate-900 min-h-screen">
      <div className="w-full mx-auto bg-white dark:bg-slate-800 rounded-lg shadow p-3 md:p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Place Details
          </h1>
          <Link to="/dashboard/places" className="text-sky-600 hover:underline">
            ← Back to places
          </Link>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-700 dark:text-slate-200">
          <DetailItem label="Name" value={place.name} />
          <DetailItem label="Address" value={place.address} />
          <DetailItem label="Price" value={`$${place.price}`} />
          <DetailItem label="City " value={city.name} />
          <DetailItem label="Category " value={category.name} />
          <DetailItem
            label="Owner "
            value={owner.firstname + " " + owner.lastname}
          />
        </div>

        {/* Description */}
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Description</h2>
          <p className="text-slate-600 dark:text-slate-300">
            {place.description}
          </p>
        </div>

        {/* Services */}
        {place.services?.length > 0 && (
          <div className="mt-6">
            <h2 className="font-semibold mb-2">Services</h2>
            <ul className="flex flex-wrap gap-2">
              {place.services.map((service, index) => (
                <li
                  key={index}
                  className="px-3 py-1 bg-sky-100 text-sky-700 rounded text-sm"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-2 md:m-3 md:p-3">
          <img src={placeImage} alt="" />
          <img src={placeImage} alt="" />
          <img src={placeImage} alt="" />
        </div>
      </div>
    </section>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="flex flex-col bg-slate-100 dark:bg-slate-700 p-3 rounded">
    <span className="text-xs uppercase text-slate-400">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);
