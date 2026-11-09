import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConnect";

import {
  FaChartPie,
  FaMotorcycle,
  FaPlusCircle,
  FaUsers,
  FaMoneyBill,
  FaSignOutAlt,
  FaBars
} from "react-icons/fa";

import { MdAssignment } from "react-icons/md";
import { useState } from "react";

import logo from "../img/hinh1.png";

export default function Sidebar() {

  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
     ${isActive
       ? "bg-white text-yellow-500 font-semibold shadow"
       : "hover:bg-yellow-300 text-gray-800 hover:translate-x-1"}`;

  return (

    <div
      className={`bg-yellow-400 min-h-screen flex flex-col p-5 transition-all duration-300
      ${collapsed ? "w-20" : "w-64"}`}
    >

      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">

        {!collapsed && (
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" className="w-10 h-10 rounded-full" />
            <h2 className="text-xl font-bold">SmartRide</h2>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-800 hover:text-black text-lg"
        >
          <FaBars />
        </button>

      </div>


      {/* MENU */}
      <nav className="flex flex-col gap-2 flex-1 text-sm">

        <NavLink to="/admin" end className={linkClass}>
          <FaChartPie className="transition-transform hover:scale-110" />
          {!collapsed && "Tổng quan"}
        </NavLink>

        <NavLink to="/admin/vehicles" end className={linkClass}>
          <FaMotorcycle className="transition-transform hover:scale-110" />
          {!collapsed && "Quản lý xe"}
        </NavLink>

        <NavLink to="/admin/them-xe-moi" end className={linkClass}>
          <FaPlusCircle className="transition-transform hover:scale-110" />
          {!collapsed && "Thêm xe mới"}
        </NavLink>

        <NavLink to="/admin/orders" end className={linkClass}>
          <MdAssignment className="transition-transform hover:scale-110" />
          {!collapsed && "Đơn cho thuê"}
        </NavLink>

        <NavLink to="/admin/customers" end className={linkClass}>
          <FaUsers className="transition-transform hover:scale-110" />
          {!collapsed && "Khách hàng"}
        </NavLink>

        <NavLink to="/admin/revenue" end className={linkClass}>
          <FaMoneyBill className="transition-transform hover:scale-110" />
          {!collapsed && "Doanh thu"}
        </NavLink>

      </nav>


      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white hover:bg-gray-100 text-red-500 font-semibold transition"
      >
        <FaSignOutAlt className="transition-transform hover:scale-110" />
        {!collapsed && "Đăng xuất"}
      </button>

    </div>

  );
}