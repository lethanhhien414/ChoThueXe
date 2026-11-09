import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ===== LAYOUTS ===== */
import UserLayout from "./layouts/Userlayout";
import AdminLayout from "./layouts/Adminlayout";

/* ===== USER PAGES ===== */
import Home from "./pages/user/Home";
import Contact from "./pages/user/Contact";
import Emergency from "./pages/user/Emergency";
import UserLogin from "./pages/user/Login";
import Vehicles from "./pages/user/Vehicles";
import VehicleDetail from "./pages/user/VehicleDetail";
import LocationPage from "./pages/user/LocationPage";
import Booking from "./pages/user/Booking";
import UploadDocument from "./pages/user/UploadDocument";
import Payment from "./pages/user/Payment";
import MyBooking from "./pages/user/MyBooking";
import Profile from "./pages/user/Profile";

/* ===== ADMIN PAGES ===== */
import AdminLogin from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AdminRoute from "./pages/admin/AdminRoute";
import VehicleManagement from "./pages/admin/VehicleManagement";
import Themxemoi from "./pages/admin/AddVehicle";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= USER LOGIN ================= */}
        <Route path="/login" element={<UserLogin />} />

        {/* ================= USER AREA ================= */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/emergency/:id" element={<Emergency />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/vehicles/:id" element={<VehicleDetail />} />
          <Route path="/locations" element={<LocationPage />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/upload" element={<UploadDocument />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/my-booking" element={<MyBooking/>}/>
          <Route path="/profile" element={<Profile />} />
          
        </Route>

        {/* ================= ADMIN LOGIN ================= */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ================= ADMIN AREA (PROTECTED) ================= */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          {/* Dashboard */}
          <Route index element={<Dashboard />} />

          {/* QUẢN LÝ XE */}
          <Route path="vehicles" element={<VehicleManagement />} />

          {/* THÊM XE MỚI */}
          <Route path="them-xe-moi" element={<Themxemoi />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
