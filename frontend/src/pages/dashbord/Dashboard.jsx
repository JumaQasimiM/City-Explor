import { CategoryCard } from "../../components/dashboardComponent/CategoryCard";
import { PlacesChart } from "../../components/dashboardComponent/PlacesChart";
import { PlacesListDashboard } from "../../components/dashboardComponent/PlacesListDashboard";
import { UserListInfoDashboard } from "../../components/dashboardComponent/UserListInfoDashboard";
import { UsersChart } from "../../components/dashboardComponent/UsersChart";

export const Dashboard = () => {
  return (
    <section className="w-full space-y-6">
      {/* ================= HEADER ================= */}
      <div
        className="flex items-center justify-between
                   bg-gray-200 dark:bg-slate-800
                   dark:text-white/90
                   p-4 rounded-lg shadow-sm"
      >
        <h1 className="text-xl md:text-2xl font-semibold">
          Dashboard Overview
        </h1>
      </div>

      {/* ================= STATS CARDS ================= */}
      <div className="bg-transparent">
        <CategoryCard />
      </div>

      {/* ================= CHARTS ================= */}
      <div
        className="grid grid-cols-1 xl:grid-cols-2 gap-6
                   bg-gray-200 dark:bg-slate-800
                   dark:text-white/90
                   p-4 rounded-lg shadow-sm"
      >
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <PlacesChart />
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <UsersChart />
        </div>
      </div>

      {/* ================= USERS LIST ================= */}
      <UserListInfoDashboard />

      {/* =============== Places List ========== */}
      <PlacesListDashboard />
    </section>
  );
};
