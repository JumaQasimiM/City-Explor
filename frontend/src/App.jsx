import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";

// Website pages
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { PlacesInSite } from "./pages/Places";
import { PlaceDetailOnSite } from "./pages/PlaceDetailOnSite";
import { Blog } from "./pages/Blog";
import { BlogDetail } from "./pages/BlogDetail";
import { Login } from "./pages/Login";
import { RegisterUser } from "./pages/Resgister";
import { ResetPassword } from "./pages/ResetPassword";
import { NotFoundPage } from "./pages/404";

// Layouts
import { MainLayout } from "./layouts/MainLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";

// Dashboard pages
import { Dashboard } from "./pages/dashbord/Dashboard";
import { Users } from "./pages/dashbord/Users";
import { Cities } from "./pages/dashbord/Cities";
import { Country } from "./pages/dashbord/Country";
import { Category } from "./pages/dashbord/Category";
import { Places } from "./pages/dashbord/Places";
import { AddPlace } from "./pages/dashbord/AddPlace";
import { PlaceDetail } from "./pages/dashbord/PlaceDetail";
import { Setting } from "./pages/dashbord/Setting";

// Auth
import { ProtectedRoutes } from "./routes/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext";

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
          {/* ================= WEBSITE ROUTES ================= */}
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

          {/* ================= DASHBOARD (ALL LOGGED USERS) ================= */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />

              {/* Available for ALL logged-in users */}
              <Route path="settings" element={<Setting />} />

              {/* Admin only */}
              <Route
                element={<ProtectedRoutes allowRole={["admin", "viewer"]} />}
              >
                <Route path="users" element={<Users />} />
                <Route path="cities" element={<Cities />} />
                <Route path="countries" element={<Country />} />
                <Route path="categories" element={<Category />} />
              </Route>

              {/* Admin + Owner */}
              <Route
                element={<ProtectedRoutes allowRole={["admin", "business"]} />}
              >
                <Route path="places">
                  <Route index element={<Places />} />
                  <Route path="add" element={<AddPlace />} />
                  <Route path=":id" element={<PlaceDetail />} />
                </Route>
              </Route>
              {/* Admin + writer (guide) */}
              {/* <Route
                element={
                  <ProtectedRoutes
                    allowRole={["admin", "business", "viewer"]}
                  />
                }
              >
                <Route path="blogs">
                  <Route element={<DashboardBlogs />} />
                  <Route path="add" element={<CreateBlog />} />
                </Route>
              </Route> */}
            </Route>
          </Route>

          {/* ================= NOT FOUND ================= */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
