
import { FaPhoneAlt, FaSms, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase/firebaseConnect";

export default function Contact() {
  const navigate = useNavigate();
  const auth = getAuth();

  const [loading, setLoading] = useState(false);

  const handleEmergency = async () => {
    if (!auth.currentUser) {
      alert("Bạn cần đăng nhập trước.");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      // 🔎 Tìm booking đang thuê
      const q = query(
        collection(db, "bookings"),
        where("userId", "==", auth.currentUser.uid),
        where("status", "==", "renting")
      );

      const snap = await getDocs(q);

      if (snap.empty) {
        alert("Bạn chưa có đơn đang thuê.");
        setLoading(false);
        return;
      }

      const bookingId = snap.docs[0].id;

      // 👉 Điều hướng đúng có ID
      navigate(`/emergency/${bookingId}`);
    } catch (err) {
      console.error("Lỗi tìm booking:", err);
      alert("Có lỗi xảy ra.");
    }

    setLoading(false);
  };

  return (
    <div className="pt-28 min-h-screen bg-gradient-to-br from-[#f9fafb] to-[#eef2f7]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div className="flex justify-center">
            <div className="w-72 h-72 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center shadow-lg">
              <div className="w-60 h-60 rounded-full bg-white flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-32 h-32 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 20.118a7.5 7.5 0 0115 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.5-1.632z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Liên hệ khẩn cấp
            </h1>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Kết nối nhanh đến bộ phận hỗ trợ khẩn cấp <b>24/7</b> <br />
              để xử lý các sự cố trong quá trình thuê xe.
            </p>

            <div className="space-y-4 max-w-md">
              <a
                href="tel:0338023344"
                className="flex items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-xl shadow transition"
              >
                <FaPhoneAlt />
                Gọi đến số khẩn cấp
              </a>

              <a
                href="sms:0338023344"
                className="flex items-center justify-center gap-3 border-2 border-yellow-400 text-yellow-500 font-semibold py-3 rounded-xl hover:bg-yellow-50 transition"
              >
                <FaSms />
                Nhắn tin đến SOS
              </a>
            </div>

            <div className="my-8 border-t"></div>

            <div>
              <p className="flex items-center gap-2 text-red-500 font-medium mb-4">
                <FaMapMarkerAlt />
                Ấn nút để gửi vị trí của bạn
              </p>

              <button
                onClick={handleEmergency}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-xl shadow-lg transition"
              >
                {loading ? "Đang kiểm tra..." : "Nút khẩn cấp"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}