import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConnect";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../img/hinh1.png";

export default function AdminLogin() {//khai báo component, đăng nhập

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async () => {//click để đăng nhập
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth, email, password
      );
      const uid = userCredential.user.uid;
      const userDoc = await getDoc(doc(db, "users",uid) );
      if (!userDoc.exists()) {
        alert("Không tìm thấy thông tin người dùng");
        return;
      }
      const role = userDoc.data().role;
      if (role !== "admin") {
        alert("Bạn không có quyền admin");
        return;
      }
      navigate("/admin");
    } catch (error) {
      console.error(error);
      alert("Sai email hoặc mật khẩu");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center
    bg-gradient-to-br from-yellow-50 via-white to-gray-100">
      <div className="w-[400px] bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* HEADER */}
        <div className="bg-yellow-400 text-center py-10">
          <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center shadow">
            <img src={logo} className="w-8"/>
          </div>
          <h2 className="mt-4 font-bold text-lg"> SmartRide</h2>
          <p className="text-sm opacity-80">Admin Portal</p>
        </div>
        {/* BODY */}
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-1">
            Welcome Back
          </h3>
          <p className="text-sm text-gray-500 mb-5">
            Đăng nhập để tiếp tục quản lý hệ thống
          </p>
          {/* EMAIL */}
          <div className="relative mb-3">
            <FaEnvelope className="absolute left-3 top-4 text-gray-400"/>
            <input value={email} onChange={(e) => setEmail(e.target.value)} 
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Email Address"
            />
          </div>
          {/* PASSWORD */}
          <div className="relative mb-4">
            <FaLock className="absolute left-3 top-4 text-gray-400"/>
            <input type={showPass ? "text" : "password"} value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Password"
            />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-4 text-gray-400">
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {/* BUTTON */}
          <button onClick={handleLogin} className="w-full bg-yellow-400 py-3 rounded-xl font-semibold hover:bg-yellow-500 transition shadow">
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}