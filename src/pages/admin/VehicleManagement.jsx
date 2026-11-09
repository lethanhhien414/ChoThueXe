import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConnect";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

export default function VehicleManagement() {

  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");
  const [rentedVehicles, setRentedVehicles] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    const fetchData = async () => {

      // lấy vehicles
      const vehicleSnap = await getDocs(collection(db, "vehicles"));

      const vehicleList = vehicleSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setVehicles(vehicleList);


      // lấy bookings
      const bookingSnap = await getDocs(collection(db, "bookings"));

      const activeBookings = bookingSnap.docs
        .map(doc => doc.data())
        .filter(b => b.status === "active" || b.status === "renting");

      // lấy vehicleId duy nhất
      const uniqueVehicleIds = [...new Set(activeBookings.map(b => b.vehicleId))];

      setRentedVehicles(uniqueVehicleIds);

    };

    fetchData();

  }, []);


  const filteredVehicles = vehicles.filter(v =>
    v.name?.toLowerCase().includes(search.toLowerCase())
  );

  const total = vehicles.length;
  const rented = rentedVehicles.length;
  const available = total - rented;
  const maintenance = vehicles.filter(v => v.status === "maintenance").length;

  return (

    <div className="p-6">

      {/* TITLE */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-2xl font-bold">Quản lý xe</h2>
          <p className="text-gray-500 text-sm">
            Quản lý toàn bộ xe trong hệ thống
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/them-xe-moi")}
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg font-semibold"
        >
          <FaPlus />
          Thêm xe mới
        </button>

      </div>


      {/* STATS */}
      <div className="grid grid-cols-4 gap-4 mb-6">

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Tổng số xe</p>
          <h3 className="text-xl font-bold">{total}</h3>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Đang cho thuê</p>
          <h3 className="text-xl font-bold">{rented}</h3>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Sẵn sàng</p>
          <h3 className="text-xl font-bold">{available}</h3>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Bảo trì</p>
          <h3 className="text-xl font-bold">{maintenance}</h3>
        </div>

      </div>


      {/* SEARCH */}
      <div className="mb-6">

        <input
          type="text"
          placeholder="Tìm kiếm theo tên..."
          className="w-full border rounded-lg px-4 py-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>


      {/* VEHICLE LIST */}
      <div className="grid grid-cols-3 gap-6">

        {filteredVehicles.map(vehicle => {

          const isRented = rentedVehicles.includes(vehicle.id);

          return (

            <div
              key={vehicle.id}
              className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >

              <img
                src={vehicle.picture?.[0]}
                className="w-full h-44 object-contain"
              />

              <h3 className="font-semibold mt-3 text-lg">
                {vehicle.name}
              </h3>

              <p className="text-sm text-gray-500">
                {vehicle.brand} • {vehicle.color}
              </p>

              <div className="text-xs text-gray-400 mt-1">
                {vehicle.kind}
              </div>

              <p className="text-blue-600 font-bold mt-2 text-lg">
                {vehicle.price?.toLocaleString()} đ / ngày
              </p>

              {/* STATUS */}
              <div className="mt-2">
                {isRented && (
                  <span className="bg-red-100 text-red-600 px-2 py-1 text-xs rounded">
                    Đang thuê
                  </span>
                )}
                {!isRented && (
                  <span className="bg-green-100 text-green-600 px-2 py-1 text-xs rounded">
                    Sẵn sàng
                  </span>
                )}
              </div>

              <div className="flex justify-end gap-4 mt-4 text-lg">

                <button className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>

                <button className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>

              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}