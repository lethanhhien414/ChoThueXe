import BannerImg from "../img/banner.png";
import { useNavigate } from "react-router-dom";

export default function HeroBanner() {

  const navigate = useNavigate();

  return (
    <section
      className="pt-28 relative h-[520px] bg-cover bg-center"
      style={{ backgroundImage: `url(${BannerImg})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center text-white">
        
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          THUÊ XE MÁY TẠI ĐÀ NẴNG
        </h1>

        <p className="text-lg mb-8">
          Xe mới 100% • Thủ tục nhanh gọn • Hỗ trợ 24/7
        </p>

        {/* SEARCH BOX */}

        <div className="bg-white rounded-2xl p-5 shadow-xl grid md:grid-cols-5 gap-4 text-black max-w-5xl">

          <input
            className="border rounded-lg px-4 py-3"
            placeholder="Chọn điểm nhận xe"
          />

          <input
            type="date"
            className="border rounded-lg px-4 py-3"
          />

          <input
            className="border rounded-lg px-4 py-3"
            placeholder="Chọn điểm trả xe"
          />

          <input
            type="date"
            className="border rounded-lg px-4 py-3"
          />

          <button
            onClick={() => navigate("/booking")}
            className="bg-yellow-400 rounded-lg font-semibold hover:bg-yellow-500"
          >
            Đặt xe ngay
          </button>

        </div>

      </div>
    </section>
  );
}