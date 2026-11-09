import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConnect";
import VehicleItem from "../../component/VehicleItem";
import {
  FaSadCry,
  FaSearch,
  FaFilter,
  FaTimesCircle,
} from "react-icons/fa";

export default function Vehicles() {
  //QUẢN LÝ DỮ LIỆU
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // SEARCH + FILTER
  const [search, setSearch] = useState("");
  const [kind, setKind] = useState("all");
  const [location, setLocation] = useState("all");
  const [brand, setBrand] = useState("all");

  // 🔥 FETCH 1 LẦN (KHÔNG để search ở đây nữa)
  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const snap = await getDocs(collection(db, "vehicles"));

        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setVehicles(data);
      } catch (err) {
        console.error("Lỗi load xe:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  //  FILTER + SEARCH LOCAL 
  const filteredVehicles = vehicles.filter((v) => {
    const matchName =
      v.name?.toLowerCase().includes(search.toLowerCase());

    const matchKind =
      kind === "all" || v.kind === kind;

    const matchLocation =
      location === "all" || v.rental === location;

    const matchBrand =
      brand === "all" || v.brand === brand;

    const matchStatus = v.status === "available";

    return (
      matchName &&
      matchKind &&
      matchLocation &&
      matchBrand &&
      matchStatus
    );
  });

  // LOADING
  if (loading) {
    return (
      <p className="text-center py-20 text-gray-500">
        Đang tải xe...
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">
        Danh sách xe cho thuê
      </h1>

      {/* SEARCH */}
      <div className="relative mb-4">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm xe..."
          className="w-full pl-11 pr-4 py-3 border rounded-xl
          focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        />
      </div>

      {/* FILTER */}
      <div className="flex gap-4 mb-6 flex-wrap items-center">
        <FaFilter className="text-yellow-500 text-xl" />

        {/* BRAND */}
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        >
          <option value="all">Dòng xe</option>
          <option value="Sirius">Yamaha Sirius</option>
          <option value="Vision">Honda Vision</option>
          <option value="Air Blade">Honda Air Blade</option>
        </select>

        {/* KIND */}
        <select
          value={kind}
          onChange={(e) => setKind(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        >
          <option value="all">Loại xe</option>
          <option value="Xe số">Xe số</option>
          <option value="Xe tay ga">Xe tay ga</option>
        </select>

        {/* LOCATION */}
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        >
          <option value="all">Địa điểm</option>
          <option value="Đà Nẵng">Đà Nẵng</option>
          <option value="Hà Nội">Hà Nội</option>
          <option value="Sài Gòn">Sài Gòn</option>
        </select>

        {/* CLEAR FILTER */}
        {(search ||
          kind !== "all" ||
          location !== "all" ||
          brand !== "all") && (
          <button
            onClick={() => {
              setSearch("");
              setKind("all");
              setLocation("all");
              setBrand("all");
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg
            bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
          >
            <FaTimesCircle />
            Xóa bộ lọc
          </button>
        )}
      </div>

      {/* LIST */}
      {filteredVehicles.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <div className="flex flex-col items-center gap-3">
            <FaSadCry className="text-5xl text-yellow-400 animate-pulse" />
            <p className="text-xl font-semibold">
              Không có xe phù hợp
            </p>
            <p className="text-sm">
              Vui lòng thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredVehicles.map((vehicle) => (
            <VehicleItem
              key={vehicle.id}
              vehicle={vehicle}
              layout="row"
            />
          ))}
        </div>
      )}
    </div>
  );
}