import { useParams, Link } from "react-router-dom";
import { usePlaceById } from "../../hooks/usePlaces";
import { Loader } from "../../components/helper/Loading";
import { ErrorMessage } from "../../components/helper/Error";

export const PlaceDetail = () => {
  const { id } = useParams();
  const { data: place, loading, error } = usePlaceById(id);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;
  if (!place) return null;

  return (
    <section className="p-6 min-h-screen bg-gray-50 dark:bg-slate-700">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold font-quicksand">Place Details</h1>

        <button
          onClick={() => window.history.back()}
          className="text-blue-600 cursor-pointer dark:text-white/80"
        >
          ← Back
        </button>
      </div>

      {/* INFO */}
      <div className="grid md:grid-cols-2 gap-4 ">
        <DetailItem label="Name" value={place.name} />
        <DetailItem label="Address" value={place.address} />

        <DetailItem label="City" value={place.city_detail?.name || "—"} />

        <DetailItem
          label="Category"
          value={place.category_detail?.name || "—"}
        />

        <DetailItem
          label="Owner"
          value={
            place.owner_detail
              ? `${place.owner_detail.first_name} ${place.owner_detail.last_name}`
              : "—"
          }
        />

        <DetailItem label="Phone" value={place.contact_number || "—"} />

        <DetailItem label="Website" value={place.website || "—"} />

        <DetailItem label="Opening Hours" value={place.opening_hours || "—"} />
      </div>

      {/* DESCRIPTION */}
      <div className="mt-6">
        <h2 className="font-semibold mb-2">Description</h2>
        <p>{place.description}</p>
      </div>

      {/* SERVICES */}
      {place.services_detail?.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Services</h2>

          <div className="flex flex-wrap gap-2">
            {place.services_detail.map((s) => (
              <span
                key={s.id}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm"
              >
                {s.title}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* IMAGES */}
      {place.images?.length > 0 && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          {place.images.map((img) => (
            <img
              key={img.id}
              src={img.image}
              className="rounded object-cover h-40 w-full"
              alt=""
            />
          ))}
        </div>
      )}
    </section>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="bg-gray-100 p-3 rounded dark:bg-slate-700">
    <span className="text-xs text-gray-500">{label}</span>
    <div className="font-medium">{value}</div>
  </div>
);
