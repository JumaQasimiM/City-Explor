import { CategoryCard } from "../../components/dashboardComponent/CategoryCard";
import { CityCategoPlaceChart } from "../../components/dashboardComponent/CityPlaceChart";
import { GrowthChart } from "../../components/dashboardComponent/GrowthChart";
import { PlacesChart } from "../../components/dashboardComponent/PlacesChart";
import { PlacesListDashboard } from "../../components/dashboardComponent/PlacesListDashboard";
import { UserListInfoDashboard } from "../../components/dashboardComponent/UserListInfoDashboard";
import { UsersChart } from "../../components/dashboardComponent/UsersChart";

import { useAuth } from "../../context/AuthContext";
export const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return <p>Loading...</p>;

  const role = user?.user?.role;
  const isAdmin = role === "admin";
  const isBusiness = role === "business";
  const isViewer = role === "viewer";

  return (
    <section className="w-full space-y-6 mb-20">
      {/* ===== Admin Stats ===== */}
      {(isAdmin || isViewer) && <CategoryCard />}

      {/* ===== Growth ===== */}
      {(isAdmin || isBusiness || isViewer) && (
        <div className="grid grid-cols-1 gap-6 bg-white dark:bg-slate-800 p-4 border-t">
          <GrowthChart />
        </div>
      )}

      {/* ===== Charts ===== */}
      {(isAdmin || isViewer) && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 bg-white dark:bg-slate-800 p-4 border-t">
          <PlacesChart />
          <UsersChart />
        </div>
      )}

      {/* ===== Users ===== */}
      {(isAdmin || isViewer) && <UserListInfoDashboard />}

      {/* ===== Places ===== */}
      <PlacesListDashboard />
    </section>
  );
};
