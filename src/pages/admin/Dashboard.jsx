import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConnect";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer} from "recharts";

export default function Dashboard() {
  const navigate = useNavigate();
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [renting, setRenting] = useState(0);
  const [users, setUsers] = useState(0);
  const [ordersToday, setOrdersToday] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 5;

  useEffect(() => {
    const fetchData = async () => {

  const bookingSnap = await getDocs(collection(db, "bookings"));

  let revenue = 0;
  let rentingCount = 0;
  let todayCount = 0;

  const today = new Date();
  const todayStr = today.toLocaleDateString("en-CA");

  const revenueMap = {};
  const ordersTemp = [];
  const uniqueUsers = new Set();

  for (let i = 6; i >= 0; i--) {

    const d = new Date();
    d.setDate(today.getDate() - i);

    const key = d.toLocaleDateString("en-CA");

    revenueMap[key] = 0;

  }

  for (const bookingDoc of bookingSnap.docs) {
    const data = bookingDoc.data();
    if (data.status === "completed" || data.status === "renting") {
      revenue += data.total || 0;
    }
    if (data.status === "renting") rentingCount++;
    if (data.startDate && data.startDate === todayStr) {
      todayCount++;
    }
    uniqueUsers.add(data.userId);
    if (revenueMap[data.startDate] !== undefined) {
      revenueMap[data.startDate] += data.total || 0;
    }
    const vehicleRef = doc(db, "vehicles", data.vehicleId);
    const vehicleSnap = await getDoc(vehicleRef);
    ordersTemp.push({
      id: bookingDoc.id,
      vehicleName: vehicleSnap.exists()
        ? vehicleSnap.data().name
        : data.vehicleId,
      ...data
    });
  }
  const chart = Object.keys(revenueMap).map(date => ({
    date,
    revenue: revenueMap[date]
  }));
  setChartData(chart);
  setTotalRevenue(revenue);
  setRenting(rentingCount);
  setOrdersToday(todayCount);
  setUsers(uniqueUsers.size);
  setOrders(ordersTemp);
};
    fetchData();
  }, []);

  const statusStyle = (status) => {
    if (status === "renting") return "bg-yellow-100 text-yellow-600";
    if (status === "completed") return "bg-green-100 text-green-600";
    if (status === "support") return "bg-blue-100 text-blue-600";
    return "bg-gray-100 text-gray-600";
  };
  const filteredOrders = orders.filter(order => {
    const keyword = search.toLowerCase();
    return (
      order.vehicleName?.toLowerCase().includes(keyword) ||
      order.id?.toLowerCase().includes(keyword) ||
      order.status?.toLowerCase().includes(keyword)
    );

  });
  const totalPages = Math.ceil(filteredOrders.length / perPage);
  const displayedOrders = filteredOrders.slice(
    (page - 1) * perPage,
    page * perPage
  );
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">
        Tổng quan hệ thống
      </h1>
      {/* STATS */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-green-500 text-white p-6 rounded-xl shadow">
          <p className="text-sm opacity-80">Tổng doanh thu</p>
          <p className="text-2xl font-bold mt-1">
            {totalRevenue.toLocaleString()}đ
          </p>
        </div>

        <div className="bg-blue-500 text-white p-6 rounded-xl shadow">
          <p className="text-sm opacity-80">Xe đang cho thuê</p>
          <p className="text-2xl font-bold mt-1">{renting}</p>
        </div>

        <div className="bg-purple-500 text-white p-6 rounded-xl shadow">
          <p className="text-sm opacity-80">Khách hàng</p>
          <p className="text-2xl font-bold mt-1">{users}</p>
        </div>

        <div className="bg-orange-500 text-white p-6 rounded-xl shadow">
          <p className="text-sm opacity-80">Đơn hôm nay</p>
          <p className="text-2xl font-bold mt-1">{ordersToday}</p>
        </div>

      </div>

      {/* CHART + QUICK ACTION */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">
            Doanh thu 7 ngày gần nhất
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(v) => v.toLocaleString() + "đ"} />
              <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* QUICK ACTION */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">
            Thao tác nhanh
          </h2>
          <div className="space-y-4">
            <button onClick={() => navigate("/admin/create-booking")}
              className="w-full bg-blue-400 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold"
            >
              Tạo đơn mới
            </button>
            <button onClick={() => navigate("/admin/them-xe-moi")}
              className="w-full bg-green-400 hover:bg-green-500 text-white py-3 rounded-lg font-semibold"
            >
              Thêm xe mới
            </button>
            <button
              onClick={() => navigate("/admin/bookings")}
              className="w-full bg-purple-300 hover:bg-purple-400 text-white py-3 rounded-lg font-semibold"
            >
              Lịch đặt xe
            </button>
          </div>
        </div>
      </div>
      {/* TABLE */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold">
            Đơn thuê gần đây
          </h2>
          <input type="text" placeholder="Tìm xe..." value={search}  onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="border px-3 py-2 rounded-lg text-sm"
          />
        </div>
        <table className="w-full text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="text-left py-2">Mã đơn</th>
              <th className="text-left py-2">Xe</th>
              <th className="text-left py-2">Ngày thuê</th>
              <th className="text-left py-2">Trạng thái</th>
              <th className="text-right py-2">Số tiền</th>
            </tr>
          </thead>
          <tbody>
            {displayedOrders.map(order => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="py-3">{order.id}</td>
                <td>{order.vehicleName}</td>
                <td>{order.startDate}</td>
                <td>
                  <span className={`px-3 py-1 text-xs rounded-full ${statusStyle(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="text-right font-medium">
                  {order.total?.toLocaleString()}đ
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1} className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages} className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}