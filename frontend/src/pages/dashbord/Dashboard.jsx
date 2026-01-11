import { CategoryCard } from "../../components/dashboardComponent/CategoryCard";
import { PlacesChart } from "../../components/dashboardComponent/PlacesChart";
import { UsersChart } from "../../components/dashboardComponent/UsersChart";
export const Dashboard = () => {
  return (
    <section className="w-full">
      <div className=" dark:bg-slate-800 dark:text-white/90 bg-gray-200 p-4 rounded">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>
      {/* content */}
      <CategoryCard />
      {/* graph - places and users */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 dark:bg-slate-800 dark:text-white/90 bg-gray-200 p-4 rounded">
        {/* places */}
        <PlacesChart />
        {/* users */}
        <UsersChart />
      </div>
    </section>
  );
};
