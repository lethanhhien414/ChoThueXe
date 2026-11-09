import { FaUser, FaUserShield, FaArrowRight, FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";//chuyển trang
import logo from "../img/hinh1.png";

export default function LoginModal({ onClose }) {//nhận onClose prop
  const navigate = useNavigate();// điều hướng đến trang login
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-[520px] bg-white rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.2)] overflow-hidden relative">
        {/* HEADER */}
        <div className="bg-yellow-400 px-10 py-10 text-center relative">
          <button onClick={onClose} className="absolute right-6 top-6 text-black/60 hover:text-black">
            <FaXmark size={18} />
          </button>
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow">
            <img src={logo} className="w-10" />
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-black">
            SmartRide
          </h2>
          <p className="text-black/70 text-sm">
            Chọn cách đăng nhập
          </p>
        </div>
        {/* BODY */}
        <div className="p-8 space-y-4">
          {/* USER */}
          <button onClick={() => navigate("/login")} className="group w-full flex items-center justify-between border border-gray-200 hover:border-blue-400 rounded-xl px-6 py-5 hover:shadow-md transition">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                <FaUser />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-800">
                  Người dùng
                </p>
                <p className="text-sm text-gray-500">
                  Đăng nhập bằng Google
                </p>
              </div>
            </div>
            <FaArrowRight className="text-gray-400 group-hover:translate-x-1 transition" />
          </button>
          {/* ADMIN */}
          <button onClick={() => navigate("/admin/login")} className="group w-full flex items-center justify-between border border-yellow-400 bg-yellow-50 hover:shadow-md rounded-xl px-6 py-5 transition">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-yellow-400 text-white rounded-lg flex items-center justify-center">
                <FaUserShield />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-800">
                  Quản trị viên
                </p>
                <p className="text-sm text-gray-500">
                  Truy cập Admin Portal
                </p>
              </div>
            </div>
            <FaArrowRight className="text-gray-400 group-hover:translate-x-1 transition" />
          </button>
        </div>
      </div>
    </div>
  );
}