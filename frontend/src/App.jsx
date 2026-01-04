import { Home } from "./pages/Home";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About } from "./pages/About";
import { Dashboard } from "./pages/dashbord/Dashboard";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { MainLayout } from "./layouts/MainLayout";
import { Users } from "./pages/dashbord/Users";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* website layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Route>

          {/* dashboard layout */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/users" element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
