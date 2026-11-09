import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc
} from "firebase/firestore";

import { db, auth } from "../../firebase/firebaseConnect";
import { onAuthStateChanged } from "firebase/auth";

import {
  FaMotorcycle,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaTimesCircle,
  FaEye
} from "react-icons/fa";

export default function MyBooking() {

  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("active");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const perPage = 5;

  useEffect(() => {

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {

      if (!user) {
        setLoading(false);
        return;
      }

      const q = query(
        collection(db, "bookings"),
        where("userId", "==", user.uid)
      );

      const unsubscribeSnap = onSnapshot(q, (snapshot) => {

        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setBookings(data);
        setLoading(false);

      });

      return unsubscribeSnap;

    });

    return () => unsubscribeAuth();

  }, []);

  const cancelBooking = async (id) => {

    const confirm = window.confirm("Bạn có chắc muốn hủy đơn này?");

    if (!confirm) return;

    await updateDoc(doc(db, "bookings", id), {
      status: "cancel"
    });

  };

  const filtered = bookings
    .filter(b => {

      if (filter === "active") {
        return b.status === "renting" || b.status === "pending";
      }

      if (filter === "completed") {
        return b.status === "completed";
      }

      if (filter === "cancel") {
        return b.status === "cancel";
      }

      return true;

    })
    .filter(b =>
      b.vehicleName?.toLowerCase().includes(search.toLowerCase())
    );

  const totalPages = Math.ceil(filtered.length / perPage);

  const displayed = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  if (loading) {
    return (
      <div className="pt-40 flex justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (

    <div className="bg-gray-100 min-h-screen pt-28 pb-20">

      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-3xl font-bold mb-8">
          Đơn thuê của tôi
        </h1>

        {/* SEARCH */}

        <input
          placeholder="Tìm kiếm xe..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-xl px-5 py-4 mb-8 focus:ring-2 focus:ring-yellow-400 outline-none"
        />

        {/* FILTER */}

        <div className="flex gap-3 mb-10">

          <FilterBtn
            label="Đang thuê"
            active={filter === "active"}
            onClick={() => setFilter("active")}
          />

          <FilterBtn
            label="Hoàn thành"
            active={filter === "completed"}
            onClick={() => setFilter("completed")}
          />

          <FilterBtn
            label="Đã hủy"
            active={filter === "cancel"}
            onClick={() => setFilter("cancel")}
          />

        </div>

        {/* LIST */}

        <div className="space-y-6">

          {displayed.length === 0 && (
            <p className="text-center text-gray-500">
              Không có đơn thuê nào
            </p>
          )}

          {displayed.map(b => (
            <BookingCard
              key={b.id}
              booking={b}
              cancelBooking={cancelBooking}
            />
          ))}

        </div>

        {/* PAGINATION */}

        {totalPages > 1 && (

          <div className="flex justify-center gap-3 mt-10">

            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="px-4 py-2 border rounded"
            >
              Prev
            </button>

            <span className="px-4 py-2">
              {page} / {totalPages}
            </span>

            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              className="px-4 py-2 border rounded"
            >
              Next
            </button>

          </div>

        )}

      </div>

    </div>

  );

}

function BookingCard({ booking, cancelBooking }) {

  return (

    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex justify-between items-center">

      {/* LEFT */}

      <div className="flex gap-6 items-center">

        <img
          src={booking.vehicleImage}
          className="w-28 h-20 object-contain bg-gray-50 rounded-lg"
        />

        <div>

          <h3 className="font-semibold text-lg flex items-center gap-2">
            <FaMotorcycle />
            {booking.vehicleName}
          </h3>

          <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
            <FaCalendarAlt />
            {booking.startDate} → {booking.endDate}
          </p>

          <p className="text-gray-500 text-sm flex items-center gap-2">
            <FaMapMarkerAlt />
            {booking.rental}
          </p>

          <p className="font-semibold text-yellow-600 flex items-center gap-2 mt-1">
            <FaMoneyBillWave />
            {booking.total?.toLocaleString()} đ
          </p>

        </div>

      </div>

      {/* RIGHT */}

      <div className="flex flex-col items-end gap-3">

        <StatusBadge status={booking.status} />

        <div className="flex gap-3">

          <button className="flex items-center gap-2 text-blue-600 text-sm hover:underline">
            <FaEye />
            Chi tiết
          </button>

          {booking.status !== "cancel" && booking.status !== "completed" && (

            <button
              onClick={() => cancelBooking(booking.id)}
              className="flex items-center gap-2 text-red-500 text-sm hover:underline"
            >
              <FaTimesCircle />
              Hủy
            </button>

          )}

        </div>

      </div>

    </div>

  );

}

function StatusBadge({ status }) {

  if (status === "renting") {
    return (
      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
        Đang thuê
      </span>
    );
  }

  if (status === "completed") {
    return (
      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
        Hoàn thành
      </span>
    );
  }

  if (status === "cancel") {
    return (
      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
        Đã hủy
      </span>
    );
  }

  return null;

}

function FilterBtn({ label, active, onClick }) {

  return (

    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-lg text-sm font-semibold
      ${active
        ? "bg-yellow-400 text-white"
        : "bg-white border"}`}
    >
      {label}
    </button>

  );

}