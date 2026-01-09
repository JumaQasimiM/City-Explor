import { Home } from "./pages/Home";

import { ToastContainer, Bounce } from "react-toastify";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About } from "./pages/About";
import { Dashboard } from "./pages/dashbord/Dashboard";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { MainLayout } from "./layouts/MainLayout";
import { Users } from "./pages/dashbord/Users";
import { Cities } from "./pages/dashbord/Cities";
import { Places } from "./pages/dashbord/Places";
import { AddPlace } from "./pages/dashbord/AddPlace";
import { Country } from "./pages/dashbord/Country";
import { Category } from "./pages/dashbord/Category";
function App() {
  return (
    <>
      <BrowserRouter>
        {/* Notification */}
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />

        <Routes>
          {/* website layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Route>

          {/* dashboard layout */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            {/* users */}
            <Route path="/dashboard/users" element={<Users />} />
            <Route path="/dashboard/users/add" element={<Users />} />

            {/* cities */}
            <Route path="/dashboard/cities" element={<Cities />} />

            {/* places */}
            <Route path="/dashboard/places" element={<Places />} />
            <Route path="/dashboard/places/add" element={<AddPlace />} />

            {/* countray */}
            <Route path="/dashboard/countries" element={<Country />} />
            {/* category */}
            <Route path="/dashboard/categories" element={<Category />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
