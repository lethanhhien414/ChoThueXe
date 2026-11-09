import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../../services/authService";
import logo from "../../img/hinh1.png";
import loginImg from "../../img/login.jpg";

export default function Login() {
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch {
      alert("Đăng nhập thất bại");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-gray-100 flex items-center justify-center p-8">
      <div className="w-[920px] bg-white rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.15)] grid grid-cols-2 overflow-hidden">
        {/* LEFT */}
        <div className="p-12 flex flex-col justify-center">
          {/* LOGO */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow">
              <img src={logo} className="w-6"/>
            </div>
            <span className="font-semibold text-lg">
              SmartRide
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            Đăng nhập
          </h1>
          <p className="text-gray-500 mb-10">
            Thuê xe nhanh chóng và tiện lợi
          </p>
          {/* GOOGLE BUTTON */}
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 bg-white border border-gray-200 hover:border-yellow-400 hover:bg-yellow-50 py-3 rounded-xl font-medium shadow-sm hover:shadow-md transition"
          >
            <FaGoogle className="text-red-500 text-lg"/>
            Đăng nhập bằng Google
          </button>
          <p className="text-sm text-gray-400 text-center mt-6">
            Chỉ hỗ trợ đăng nhập Google
          </p>
        </div>
        {/* RIGHT */}
        <div className="bg-yellow-50 flex items-center justify-center p-10">
          <div className="bg-white rounded-2xl shadow-md p-8">
            <img src={loginImg} className="w-[250px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}