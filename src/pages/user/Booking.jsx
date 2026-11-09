import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { addDoc, collection, Timestamp, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConnect";
import { auth } from "../../firebase/firebaseConnect";

export default function Booking() {

  const { state } = useLocation();
  const navigate = useNavigate();

  const vehicle = state?.vehicle;

    if (!vehicle) {
    return (
        <div className="text-center py-20">
        <p>Không tìm thấy xe</p>
        </div>
    );
    }

  const [startDate,setStartDate] = useState("");
  const [endDate,setEndDate] = useState("");
  const [days,setDays] = useState(0);
  const [total,setTotal] = useState(0);

  const calcPrice = (s,e)=>{

    if(!s || !e) return;

    const start = new Date(s);
    const end = new Date(e);

    const d = Math.ceil((end-start)/(1000*60*60*24));

    if(d<=0) return;

    setDays(d);

    let price = vehicle.price;

    const table = vehicle.priceTable || {};

    if(d<=5) price = table["1_5"];
    else if(d<=10) price = table["6_10"];
    else if(d<=15) price = table["11_15"];
    else if(d<=30) price = table["16_30"];
    else price = table["30_plus"];

    setTotal(d*price);
  }
  
  const checkBooking = async () => {

  const q = query(
    collection(db,"bookings"),
    where("vehicleId","==",vehicle.id)
  );

  const snap = await getDocs(q);

  let isBooked = false;

  snap.forEach(doc => {

    const data = doc.data();

    const oldStart = new Date(data.startDate);
    const oldEnd = new Date(data.endDate);

    const newStart = new Date(startDate);
    const newEnd = new Date(endDate);

    // kiểm tra trùng ngày
    if(newStart <= oldEnd && newEnd >= oldStart){
      isBooked = true;
    }

  });

  return isBooked;

};
  const handleBooking = async () => {

  const user = auth.currentUser;

  if (!user) {
    alert("Vui lòng đăng nhập trước khi đặt xe");
    navigate("/login");
    return;
  }

  if(!startDate || !endDate){
    alert("Vui lòng chọn ngày");
    return;
  }

  if (new Date(endDate) <= new Date(startDate)) {
    alert("Ngày trả phải sau ngày nhận");
    return;
  }

  const booked = await checkBooking();

  if(booked){
    alert("Xe đã được đặt trong khoảng thời gian này");
    return;
  }

  const bookingData = {
    userId: user.uid,
    userEmail: user.email,
    vehicle, // ⭐ QUAN TRỌNG
    vehicleId:vehicle.id,
    vehicleName:vehicle.name,
    vehicleImage:vehicle.picture[0],
    rental:vehicle.rental,
    startDate,
    endDate,
    days,
    pricePerDay:vehicle.price,
    total
  };

  navigate("/upload", { state: bookingData });

};

  return(

  <div className="bg-gray-50 min-h-screen py-12">

    <div className="max-w-6xl mx-auto px-6">

      <h1 className="text-3xl font-bold mb-10">
        Đặt Xe Máy
      </h1>

      <div className="grid md:grid-cols-3 gap-10">

        {/* LEFT */}

        <div className="md:col-span-2 space-y-6">

          {/* VEHICLE CARD */}

          <div className="bg-white rounded-2xl shadow-md p-6 flex gap-6">

            <img
              src={vehicle.picture[0]}
              className="w-56 object-contain"
            />

            <div>

              <h2 className="text-xl font-bold">
                {vehicle.name}
              </h2>

              <p className="text-gray-500 mt-1">
                {vehicle.brand} • {vehicle.kind}
              </p>

              <p className="text-yellow-600 text-xl font-bold mt-3">
                {vehicle.price.toLocaleString()} đ / ngày
              </p>

              <div className="mt-4 space-y-1 text-gray-600 text-sm">

                <p>✔ Xe được bảo dưỡng định kỳ</p>
                <p>✔ Miễn phí mũ bảo hiểm</p>
                <p>✔ Hỗ trợ giao xe tận nơi</p>

              </div>

            </div>

          </div>

          {/* FORM */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-6">
              Chi tiết đặt xe
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">
                  Ngày nhận xe
                </label>

                <input
                  type="date"
                  value={startDate}
                  onChange={(e)=>{
                    setStartDate(e.target.value)
                    calcPrice(e.target.value,endDate)
                  }}
                  className="border rounded-lg p-3 w-full mt-1"
                />

              </div>

              <div>

                <label className="text-sm font-medium">
                  Ngày trả xe
                </label>

                <input
                  type="date"
                  value={endDate}
                  onChange={(e)=>{
                    setEndDate(e.target.value)
                    calcPrice(startDate,e.target.value)
                  }}
                  className="border rounded-lg p-3 w-full mt-1"
                />

              </div>

            </div>

            <textarea
              placeholder="Ghi chú (không bắt buộc)"
              className="border rounded-lg p-3 w-full mt-6"
            />

          </div>

        </div>

        {/* RIGHT */}

        <div>

          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">

            <h3 className="font-semibold text-lg mb-4">
              Tóm Tắt Đặt Xe
            </h3>

            <p className="text-gray-500">
              {vehicle.rental}
            </p>

            <hr className="my-5" />

            <div className="space-y-2 text-sm">

              <p>
                Ngày nhận: {startDate || "---"}
              </p>

              <p>
                Ngày trả: {endDate || "---"}
              </p>

            </div>

            <hr className="my-5" />

            <p className="text-gray-600">
              {days} ngày
            </p>

            <p className="text-3xl font-bold text-green-600 mt-1">
              {total.toLocaleString()} đ
            </p>

            <button
              onClick={handleBooking}
              className="w-full mt-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl font-semibold text-lg"
            >
              Đặt Xe Ngay
            </button>

          </div>

        </div>

      </div>

    </div>

  </div>

  )
}