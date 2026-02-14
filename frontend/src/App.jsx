import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";

// website pages
import { Home } from "./pages/Home";
import { About } from "./pages/About";

// layout
import { MainLayout } from "./layouts/MainLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";

// dashboard pages
import { Dashboard } from "./pages/dashbord/Dashboard";
import { Users } from "./pages/dashbord/Users";
import { Cities } from "./pages/dashbord/Cities";
import { Places } from "./pages/dashbord/Places";
import { AddPlace } from "./pages/dashbord/AddPlace";
import { Country } from "./pages/dashbord/Country";
import { Category } from "./pages/dashbord/Category";
import { PlaceDetail } from "./pages/dashbord/PlaceDetail";
import { Login } from "./pages/Login";
import { RegisterUser } from "./pages/Resgister";
import { ResetPassword } from "./pages/ResetPassword";
import { PlacesInSite } from "./pages/Places";
import { PlaceDetailOnSite } from "./pages/PlaceDetailOnSite";
import { Blog } from "./pages/Blog";
import { BlogDetail } from "./pages/BlogDetail";
import { ProtectedRoutes } from "./routes/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext";
import { Contact } from "./pages/Contact";
import { Setting } from "./pages/dashbord/Setting";
import { NotFoundPage } from "./pages/404";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          theme="colored"
          transition={Bounce}
        />

        <Routes>
          {/* Website */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/places" element={<PlacesInSite />} />
            <Route path="/place/:id" element={<PlaceDetailOnSite />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
          </Route>
          {/* =========================================================================== */}
          {/* protected Routes and role base access  */}

          <Route element={<ProtectedRoutes allowRole={["admin"]} />}>
            {/* Dashboard */}

            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />

              <Route path="users" element={<Users />} />
              <Route path="cities" element={<Cities />} />

              <Route path="countries" element={<Country />} />
              <Route path="categories" element={<Category />} />
            </Route>
          </Route>

          {/* admin + owner */}
          <Route element={<ProtectedRoutes allowRole={["admin", "owner"]} />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="places">
                <Route index element={<Places />} />
                <Route path="add" element={<AddPlace />} />
                <Route path=":id" element={<PlaceDetail />} />
              </Route>
              <Route path="settings" element={<Setting />} />
            </Route>
          </Route>
          {/* ======================================================================= */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
