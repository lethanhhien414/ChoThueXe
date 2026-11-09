import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConnect";
import { FaEnvelope, FaPhone, FaIdCard, FaBirthdayCake, FaUser, FaMapMarkerAlt, FaCreditCard, FaLock} from "react-icons/fa";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConnect";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [bookings,setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const unsub = onAuthStateChanged(auth, async (u) => {
    if (!u) return;
    setUser(u);
    const q = query(
      collection(db, "bookings"),
      where("userId", "==", u.uid)
    );
    const snap = await getDocs(q);
    const data = await Promise.all(
      snap.docs.map(async (docSnap) => {
        const booking = docSnap.data();
        const vehicleRef = doc(db, "vehicles", booking.vehicleId);
        const vehicleSnap = await getDoc(vehicleRef);
        return {
          id: docSnap.id,
          ...booking,
          vehicle: vehicleSnap.exists()
            ? vehicleSnap.data()
            : null
        };
      })
    );
    setBookings(data);
  });
  return () => unsub();
}, []);

    if (!user) {
    return (
        <div className="pt-32 text-center">
        Loading...
        </div>
    );
    }

  return (
  <div className="mt-6 min-h-screen bg-gray-100">
  <div className="max-w-[1300px] mx-auto px-6">
    <div className="grid grid-cols-3 gap-6 items-start">
    {/* LEFT PROFILE */}
    <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center">
    <div className="mb-8 w-full">

        {/* AVATAR */}
        <div className="flex justify-center">
        <img
            src={
            user.photoURL ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            referrerPolicy="no-referrer"
            className="w-24 h-24 rounded-full border-4 border-yellow-400 shadow object-cover"
        />
        </div>

        <h2 className="text-lg font-semibold mt-4">
        {user.displayName || "User"}
        </h2>

        <p className="text-gray-500 text-sm mt-1">
        {user.email}
        </p>

    </div>
    <div className="w-full space-y-3">
        <button className="w-full bg-yellow-400 hover:bg-yellow-500 transition py-2 rounded-lg font-semibold">
        Cập nhật hồ sơ
        </button>
        <button onClick={async () => { await signOut(auth); navigate("/");}}
        className="w-full bg-gray-200 hover:bg-gray-300 transition py-2 rounded-lg font-semibold">
          Đăng xuất
        </button>
        </div>
    </div>
    {/* RIGHT SIDE */}
    <div className="col-span-2 space-y-8">
      {/* ACCOUNT INFO */}
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-xl font-semibold mb-6">
          Thông tin tài khoản
        </h2>
        <div className="space-y-5 text-[15px]">
          <div className="flex justify-between border-b pb-3">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-yellow-500"/>
              <span>Email</span>
            </div>
            <span className="text-gray-600">
              {user.email}
            </span>
          </div>
          <div className="flex justify-between border-b pb-3">
            <div className="flex items-center gap-3">
              <FaPhone className="text-yellow-500"/>
              <span>SĐT</span>
            </div>
            <span className="text-gray-600">
              Chưa cập nhật
            </span>
          </div>
          <div className="flex justify-between border-b pb-3">
            <div className="flex items-center gap-3">
              <FaIdCard className="text-yellow-500"/>
              <span>CCCD / CMND</span>
            </div>
            <span className="text-gray-600">
              Chưa cập nhật
            </span>
          </div>
          <div className="flex justify-between border-b pb-3">
            <div className="flex items-center gap-3">
              <FaBirthdayCake className="text-yellow-500"/>
              <span>Ngày sinh</span>
            </div>
            <span className="text-gray-600">
              Chưa cập nhật
            </span>
          </div>
          <div className="flex justify-between border-b pb-3">
            <div className="flex items-center gap-3">
              <FaUser className="text-yellow-500"/>
              <span>Giới tính</span>
            </div>
            <span className="text-gray-600">
              Chưa cập nhật
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-yellow-500"/>
              <span>Địa chỉ</span>
            </div>
            <button className="bg-yellow-100 text-yellow-600 px-4 py-2 rounded-lg hover:bg-yellow-200">
              Cập nhật địa chỉ
            </button>
          </div>
        </div>
      </div>
      {/* BOOKING HISTORY */}
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-xl font-semibold mb-6">
          Hồ sơ thuê xe
        </h2>
        {bookings.length === 0 ? (
          <p className="text-gray-500">
            Chưa có lịch sử thuê xe
          </p>
        ) : (
          <div className="space-y-6">
            {bookings.map((item) => {
              const days =
                (new Date(item.endDate) - new Date(item.startDate)) /
                (1000 * 60 * 60 * 24);
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-6 border rounded-xl p-5 hover:shadow-md transition"
                >
                  {/* IMAGE */}
                  <img
                    src={
                      item.vehicle?.picture?.[0] ||
                      "https://via.placeholder.com/200x150"
                    }
                    alt={item.vehicle?.name}
                    className="w-36 h-24 object-cover rounded-lg"
                  />
                  {/* INFO */}
                  <div className="flex-1">
                    <p className="font-semibold text-lg">
                      {item.vehicle?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.vehicle?.brand} • {item.vehicle?.color}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.startDate} → {item.endDate}
                    </p>
                    <p className="text-sm text-gray-500">
                      {days} ngày • {item.rental}
                    </p>
                  </div>
                  {/* PRICE */}
                  <div className="text-right">
                    <p className="text-lg font-semibold text-yellow-500">
                      {item.total?.toLocaleString()}đ
                    </p>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        item.status === "renting"
                          ? "bg-yellow-100 text-yellow-600"
                          : item.status === "cancel"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {item.status === "renting"
                        ? "Đang thuê"
                        : item.status === "cancel"
                        ? "Đã hủy"
                        : "Hoàn thành"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  </div>

</div>
```
  </div>
);
}