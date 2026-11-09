import { Outlet, NavLink, useNavigate } from "react-router-dom";//nội dung trang con
import { FaHome, FaMotorcycle, FaFileInvoice, FaUsers, FaChartLine, FaCog, FaSignOutAlt,} from "react-icons/fa";
import { signOut } from "firebase/auth";//đăng xuất
import { auth } from "../firebase/firebaseConnect";
import Sidebar from "../component/Sidebar";

export default function AdminLayout() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);               
      navigate("/", { replace: true }); 
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f5f7fa] font-[Poppins]">
      {/* ===== SIDEBAR ===== */}
      <Sidebar />

      {/* ===== MAIN ===== */}
      <div className="flex-1 flex flex-col">
        {/* ===== TOPBAR ===== */}
        <header className="h-[64px] bg-white border-b flex items-center justify-between px-6">
          <h1 className="font-semibold text-slate-700">
            Trang quản trị SmartRide
          </h1>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold">Admin</p>
              <p className="text-xs text-gray-500">Quản trị viên</p>
            </div>
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-black">
              A
            </div>
          </div>
        </header>

        {/* ===== CONTENT ===== */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

/* ===== SIDEBAR ITEM ===== */
function SidebarItem({ to, label, icon, end = false }) {
  return (
    <li>
      <NavLink
        to={to}
        end={end}
        className={({ isActive }) =>
          `
          flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium
          ${
            isActive
              ? "bg-white text-black"
              : "text-black hover:bg-white/80"
          }
          `
        }
      >
        {icon}
        {label}
      </NavLink>
    </li>
  );
}
