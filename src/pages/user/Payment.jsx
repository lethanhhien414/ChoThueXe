import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db, auth } from "../../firebase/firebaseConnect";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import zalo from "../../img/zalo.jpg";
import momo from "../../img/momo.png";

export default function Payment() {

  const { state } = useLocation();
  const navigate = useNavigate();

  const [method,setMethod] = useState("card");

  // kiểm tra dữ liệu
  if(!state || !state.vehicle){
    return(
      <div className="text-center py-20">
        Không có dữ liệu đặt xe
      </div>
    )
  }

  const vehicle = state.vehicle;

  const price = state.total;
  const vat = Math.round(price * 0.1);
  const total = price + vat;

  const handlePayment = async () => {

    try {

      await addDoc(collection(db,"bookings"),{

  userId: auth.currentUser.uid,

  vehicleId: vehicle.id,
  vehicleName: vehicle.name,
  vehicleImage: vehicle.picture[0],

  rental: vehicle.rental,

  startDate: state.startDate,
  endDate: state.endDate,

  days: state.days,
  total: total,

  paymentMethod: method,

  cccdFront: state.cccdFront,
  cccdBack: state.cccdBack,

  status:"renting",

  createdAt:Timestamp.now()

});

      alert("Thanh toán thành công");

      navigate("/my-booking");

    } catch(err) {

      console.log(err);
      alert("Thanh toán thất bại");

    }

  };

  return (

<div className="bg-gray-100 min-h-screen py-16">

  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6">

    {/* LEFT PAYMENT */}

    <div className="bg-white rounded-2xl shadow-lg p-8">

      <h2 className="text-xl font-bold mb-6">
        Thông tin thanh toán
      </h2>

      {/* CARD */}

      <label className="flex items-center gap-3 mb-4">
        <input
          type="radio"
          checked={method==="card"}
          onChange={()=>setMethod("card")}
        />
        Thanh toán qua thẻ
      </label>

      {method==="card" && (

        <div className="space-y-3 mb-5">

          <input
            placeholder="1234 5678 9012 3456"
            className="border rounded-lg p-3 w-full"
          />

          <div className="grid grid-cols-2 gap-3">

            <input
              placeholder="MM/YY"
              className="border rounded-lg p-3"
            />

            <input
              placeholder="CVV"
              className="border rounded-lg p-3"
            />

          </div>

        </div>

      )}

      {/* WALLET */}

      <label className="flex items-center gap-3 mb-3">
        <input
          type="radio"
          checked={method==="wallet"}
          onChange={()=>setMethod("wallet")}
        />
        Thanh toán ví điện tử
      </label>

      {method==="wallet" && (

        <div className="flex gap-6 mb-5">

          <img
            src={momo}
            className="h-10 cursor-pointer"
          />

          <img
            src={zalo}
            className="h-10 cursor-pointer"
          />

        </div>

      )}

      {/* CASH */}

      <label className="flex items-center gap-3 mb-6">
        <input
          type="radio"
          checked={method==="cash"}
          onChange={()=>setMethod("cash")}
        />
        Thanh toán khi nhận xe
      </label>

      <button
        onClick={handlePayment}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl font-semibold text-lg"
      >
        XÁC NHẬN & THANH TOÁN
      </button>

      <p className="text-xs text-gray-400 mt-4">
        🔒 Giao dịch của bạn được bảo mật và mã hóa an toàn
      </p>

    </div>

    {/* RIGHT SUMMARY */}

    <div className="bg-white rounded-2xl shadow-lg p-8">

      <h2 className="text-xl font-bold mb-6">
        Thông tin đặt xe
      </h2>

      <div className="flex gap-4 items-center">

        <img
          src={vehicle.picture[0]}
          className="w-28 object-contain"
        />

        <div>

          <h3 className="font-semibold text-lg">
            {vehicle.name}
          </h3>

          <p className="text-gray-500">
            {vehicle.rental}
          </p>

          <p className="text-sm text-gray-500 mt-2">
            {state.startDate} → {state.endDate}
          </p>

        </div>

      </div>

      <hr className="my-6"/>

      <div className="space-y-3 text-sm">

        <div className="flex justify-between">
          <span>Giá thuê</span>
          <span>{price.toLocaleString()} đ</span>
        </div>

        <div className="flex justify-between">
          <span>VAT 10%</span>
          <span>{vat.toLocaleString()} đ</span>
        </div>

      </div>

      <hr className="my-6"/>

      <div className="flex justify-between text-xl font-bold text-yellow-600">

        <span>Tổng cộng</span>

        <span>
          {total.toLocaleString()} đ
        </span>

      </div>

    </div>

  </div>

</div>

)
}