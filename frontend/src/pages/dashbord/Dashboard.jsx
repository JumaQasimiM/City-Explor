import { CategoryCard } from "../../components/dashboardComponent/CategoryCard";
import { CityCategoPlaceChart } from "../../components/dashboardComponent/CityPlaceChart";
import { PlacesChart } from "../../components/dashboardComponent/PlacesChart";
import { PlacesListDashboard } from "../../components/dashboardComponent/PlacesListDashboard";
import { UserListInfoDashboard } from "../../components/dashboardComponent/UserListInfoDashboard";
import { UsersChart } from "../../components/dashboardComponent/UsersChart";

export const Dashboard = () => {
  return (
    <section className="w-full space-y-6 mb-20">
      {/* ================= STATS CARDS ================= */}

      <CategoryCard />

      {/* ================= CHARTS ================= */}
      <div
        className="grid grid-cols-1 xl:grid-cols-2 gap-6
                   bg-white dark:bg-slate-800
                   p-4  border-t border-gray-200 dark:border-slate-700"
      >
        {/* charts */}
        <PlacesChart />
        <UsersChart />
      </div>
      {/* <div
        className="grid grid-cols-1 gap-6
                   bg-white dark:bg-slate-800
                   p-4  border-t border-gray-200 dark:border-slate-700"
      > */}
      {/* charts */}
      {/* <CityCategoPlaceChart /> */}
      {/* </div> */}

      {/* ================= USERS LIST ================= */}
      <UserListInfoDashboard />

      {/* =============== Places List ========== */}
      <PlacesListDashboard />
    </section>
  );
};
