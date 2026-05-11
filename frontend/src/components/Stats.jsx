import CountUp from "react-countup";
import { usePlaces } from "../hooks/usePlaces";
import { useUsers } from "../hooks/useUsers";
import { useCities } from "../hooks/useCities";

export const Stats = () => {
  const { places = [] } = usePlaces();
  const { users = [] } = useUsers();
  const { cities = [] } = useCities();

  const items = [
    { value: places.length + 100, label: "Places" },
    { value: users.length + 50, label: "Users" },
    { value: cities.length + 10, label: "Cities" },
  ];

  return (
    <section className="py-10 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* ===== STATS ===== */}
        <div className="border-t border-gray-200 dark:border-slate-700 flex sm:flex-row sm:items-center sm:justify-between">
          {items.map((item, i) => (
            <div
              key={i}
              className={`
                flex flex-col justify-center
                py-6 px-4 sm:px-6
                ${i !== 0 ? "border-t sm:border-t-0 sm:border-l border-gray-200 dark:border-slate-700" : ""}
                w-full
              `}
            >
              <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide font-semibold  ">
                {item.label}
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mt-1">
                <CountUp end={item.value} duration={2} enableScrollSpy={true} />
                +k
              </h2>
            </div>
          ))}
        </div>

        {/* ===== TAG ROW ===== */}
        <div className="border-y border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 mt-8 py-7 font-semibold px-3 overflow-x-auto text-center ">
          <div className="flex gap-6 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
            <span>Hospitals - 5</span>
            <span>Supermarkets - 23</span>
            <span>Schools - 2</span>
            <span>Tourist Places - 23</span>
            <span>Restaurants - 23</span>
            <span>Hotels - 23</span>
            <span>Cafes - 2</span>
            <span>Parks - 12</span>
          </div>
        </div>
      </div>
    </section>
  );
};
