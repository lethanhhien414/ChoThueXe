import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaYoutube, FaLinkedinIn, FaPhoneAlt, FaMapMarkerAlt, FaClock, } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import Logo from "../img/hinh1.png";

export default function Footer() {
  return (
    <footer className="bg-[#1f1f1f] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* ===== CỘT 1: LOGO + INFO ===== */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={Logo} alt="SmartRide" className="h-10 w-auto object-contain"/>

            <span className="text-white text-xl font-bold">
              SMART<span className="text-yellow-400">RIDE</span>
            </span>
          </div>

          <p className="mb-4">
            SmartRide là dịch vụ cho thuê xe máy tự lái chuyên nghiệp tại Việt Nam.
          </p>

          <p className="flex items-center gap-2 mb-2">
            <FaPhoneAlt className="text-yellow-400" />
            <strong>Tổng đài (24/24):</strong> 0338 023 344
          </p>

          <p className="flex items-center gap-2 mb-2">
            <FaPhoneAlt className="text-yellow-400" />
            <strong>English speaking:</strong> 0966 456 969
          </p>

          <p className="flex items-center gap-2 mb-2">
            <SiGmail className="text-yellow-400" />
            <strong>Email:</strong> contact@smartride.vn
          </p>

          <p className="flex items-center gap-2 mb-4">
            <FaClock className="text-yellow-400" />
            <strong>Thứ Hai – Chủ Nhật:</strong> 7:00 – 22:00
          </p>

          {/* SOCIAL */}
          <div className="flex gap-4 text-yellow-400 text-xl mt-4">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaPinterestP />
            <FaYoutube />
            <FaLinkedinIn />
          </div>
        </div>

        {/* ===== CỘT 2: VỀ SMARTRIDE ===== */}
        <div>
          <h3 className="text-yellow-400 font-semibold mb-6 uppercase">
            Về SmartRide
          </h3>

          <ul className="space-y-3">
            <li>› Giới thiệu về SmartRide</li>
            <li>› Liên hệ</li>
            <li>› FAQs</li>
            <li>› Tuyển dụng</li>
            <li>› Cửa hàng SmartRide</li>
            <li>› Chính sách thủ tục thuê xe máy</li>
            <li>› Chính sách bảo mật thông tin cá nhân</li>
            <li>› SmartRide Tours</li>
          </ul>
        </div>

        {/* ===== CỘT 3: ĐỊA ĐIỂM ===== */}
        <div>
          <h3 className="text-yellow-400 font-semibold mb-6 uppercase">
            Địa điểm
          </h3>

          <div className="space-y-6">

            <div>
              <p className="text-white font-semibold mb-1 flex items-center gap-2">
                <FaMapMarkerAlt className="text-yellow-400" />
                Thuê Xe Máy Đà Nẵng
              </p>
              <p>421/3 Đ. Lê Duẩn, Chính Gián, Thanh Khê, Đà Nẵng, Vietnam</p>
            </div>

            <div>
              <p className="text-white font-semibold mb-1 flex items-center gap-2">
                <FaMapMarkerAlt className="text-yellow-400" />
                Thuê Xe Máy Hà Nội
              </p>
              <p>CS1: 81 P. Nguyễn Khả Trạc, Mai Dịch, Cầu Giấy, Hà Nội</p>
              <p>CS2: 1081 Đ. Hồng Hà, Chương Dương, Hoàn Kiếm, Hà Nội</p>
              <p>CS3: 7 Đường Trục Chính Phía Tây, Điền Xá, Sóc Sơn, Hà Nội</p>
            </div>

            <div>
              <p className="text-white font-semibold mb-1 flex items-center gap-2">
                <FaMapMarkerAlt className="text-yellow-400" />
                Thuê Xe Máy Hà Giang
              </p>
              <p>Tổ 1, Thôn Cầu Mè, Phương Thiện, Hà Giang, Vietnam</p>
            </div>

          </div>
        </div>
      </div>

      {/* ===== COPYRIGHT ===== */}
      <div className="border-t border-gray-700 py-6 text-center text-sm text-gray-400">
        © 2026 – Bản quyền thuộc về Công ty TNHH SmartRide Việt Nam – 
        GPĐKKD: 0108635823 do Sở KH & ĐT TP Đà Nẵng cấp ngày 01/01/2026.
      </div>
    </footer>
  );
}
