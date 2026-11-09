
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase/firebaseConnect";
import Swal from "sweetalert2";

export default function Emergency() {

  const navigate = useNavigate();
  const auth = getAuth();

  const [bookings, setBookings] = useState([]);      // danh sách xe đang thuê
  const [booking, setBooking] = useState(null);      // xe được chọn
  const [location, setLocation] = useState(null);
  const [issueType, setIssueType] = useState("Xe hỏng / chết máy");
  const [description, setDescription] = useState("");

  /* LOAD TẤT CẢ XE ĐANG THUÊ */

  useEffect(() => {

    const loadBookings = async () => {

      if (!auth.currentUser) return;

      try {

        const q = query(
          collection(db, "bookings"),
          where("userId", "==", auth.currentUser.uid),
          where("status", "==", "renting")
        );

        const snap = await getDocs(q);

        if (snap.empty) {
          navigate("/my-booking");
          return;
        }

        const data = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setBookings(data);
        setBooking(data[0]); // mặc định chọn xe đầu tiên

      } catch (err) {
        console.log(err);
      }

    };

    loadBookings();

  }, []);

  /* GPS */

  useEffect(() => {

    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setLocation({
          lat: pos.coords.latitude.toFixed(6),
          lng: pos.coords.longitude.toFixed(6),
        }),
      () => setLocation(null)
    );

  }, []);

  /* GỬI YÊU CẦU */

  const handleSend = async () => {

    const confirm = await Swal.fire({
      title: "Gửi yêu cầu khẩn cấp?",
      text: "Đội hỗ trợ sẽ nhận được vị trí của bạn.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Gửi yêu cầu",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#dc2626"
    });

    if (!confirm.isConfirmed) return;

    if (!description.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Thiếu thông tin",
        text: "Vui lòng mô tả sự cố."
      });
      return;
    }

    try {

      await addDoc(collection(db, "emergency_support"), {

        bookingId: booking.id,
        vehicleId: booking.vehicleId,
        vehicleName: booking.vehicleName,
        vehicleImage: booking.vehicleImage,

        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,

        startDate: booking.startDate,
        endDate: booking.endDate,
        rental: booking.rental,

        issueType,
        description,

        latitude: location?.lat || null,
        longitude: location?.lng || null,

        status: "pending",
        createdAt: serverTimestamp(),
      });

      await Swal.fire({
        icon: "success",
        title: "Yêu cầu hỗ trợ đã được gửi",
        text: "Đội hỗ trợ sẽ liên hệ với bạn trong vài phút.",
        confirmButtonText: "OK",
        confirmButtonColor: "#22c55e"
      });

      navigate("/my-booking");

    } catch (err) {

      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Không thể gửi yêu cầu hỗ trợ."
      });

    }

  };

  if (!booking) return null;

  return (

    <div className="min-h-screen bg-red-50 pt-28 pb-20 px-6">

      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-6">
          <FaExclamationTriangle className="text-red-500 text-4xl mx-auto mb-2" />
          <h1 className="text-2xl font-bold text-red-600">
            Emergency Support
          </h1>
        </div>

        {/* CHỌN XE */}

        {bookings.length > 1 && (
          <select
            className="w-full border rounded-lg px-3 py-2 mb-6"
            onChange={(e) =>
              setBooking(bookings.find(b => b.id === e.target.value))
            }
          >
            {bookings.map(b => (
              <option key={b.id} value={b.id}>
                {b.vehicleName}
              </option>
            ))}
          </select>
        )}

        {/* THÔNG TIN XE */}

        <div className="bg-gray-100 p-4 rounded-xl mb-6 flex gap-4 items-center">

          <img
            src={booking.vehicleImage}
            className="w-20 h-20 object-contain bg-white rounded-lg p-2"
          />

          <div>
            <p className="font-semibold">{booking.vehicleName}</p>

            <p className="text-sm text-gray-600">
              📍 {booking.rental}
            </p>

            <p className="text-sm text-gray-600">
              📅 {booking.startDate} - {booking.endDate}
            </p>
          </div>

        </div>

        {/* LOCATION */}

        <p className="text-sm mb-3">
          📍 Vị trí hiện tại:{" "}
          {location
            ? `${location.lat}, ${location.lng}`
            : "Không xác định"}
        </p>

        {location && (
          <div className="border rounded-xl overflow-hidden mb-4">
            <iframe
              title="map"
              width="100%"
              height="220"
              src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&z=16&output=embed`}
            />
          </div>
        )}

        {/* ISSUE TYPE */}

        <select
          value={issueType}
          onChange={(e) => setIssueType(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4"
        >
          <option>Xe hỏng / chết máy</option>
          <option>Tai nạn</option>
          <option>Mất xe</option>
          <option>Khác</option>
        </select>

        {/* DESCRIPTION */}

        <textarea
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Mô tả sự cố..."
          className="w-full border rounded-lg px-3 py-2 mb-6"
        />

        {/* BUTTON */}

        <button
          onClick={handleSend}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition"
        >
          🚨 Gửi yêu cầu khẩn cấp
        </button>

      </div>

    </div>

  );
}