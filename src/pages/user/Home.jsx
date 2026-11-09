import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConnect";
import Banner from "../../img/banner.png";
import { Link } from "react-router-dom";
import Hinh3 from "../../img/hinh3.png";
import Hinh4 from "../../img/hinh4.png";
import { PiStarThin } from "react-icons/pi";
import { FaLocationArrow } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";


export default function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [featuredVehicles, setFeaturedVehicles] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const snapshot = await getDocs(collection(db, "vehicles"));

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const available = data.filter(
          (item) => item.status === "available"
        );

        setVehicles(available);
        setFeaturedVehicles(
          available.filter((item) => item.featured === true)
        );
      } catch (err) {
        console.error("Lỗi lấy xe:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const filteredVehicles = vehicles.filter((item) =>
    `${item.name} ${item.kind} ${item.rental}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>

{/* BẢNG GIÁ */}
<section className="max-w-7xl mx-auto px-6 py-20">
  <h2 className="text-3xl font-bold text-center mb-10">
    BẢNG GIÁ THUÊ XE MÁY ĐÀ NẴNG
  </h2>

  <div className="overflow-x-auto">
    <table className="w-full border rounded-xl overflow-hidden">
      <thead className="bg-yellow-400 text-left">
        <tr>
          <th className="p-4">Loại xe</th>
          <th className="p-4">1–5 ngày</th>
          <th className="p-4">6–10 ngày</th>
          <th className="p-4">11–15 ngày</th>
          <th className="p-4">16–30 ngày</th>
          <th className="p-4">+30 ngày</th>
        </tr>
      </thead>
      <tbody className="bg-white">
        <tr className="border-b">
          <td className="p-4 font-medium">Sirius 110cc</td>
          <td className="p-4">130.000đ</td>
          <td className="p-4">120.000đ</td>
          <td className="p-4">110.000đ</td>
          <td className="p-4">100.000đ</td>
          <td className="p-4">80.000đ</td>
        </tr>
        <tr className="border-b bg-gray-50">
          <td className="p-4 font-medium">Vision 110cc</td>
          <td className="p-4">180.000đ</td>
          <td className="p-4">160.000đ</td>
          <td className="p-4">140.000đ</td>
          <td className="p-4">120.000đ</td>
          <td className="p-4">100.000đ</td>
        </tr>
        <tr>
          <td className="p-4 font-medium">Air Blade 125cc</td>
          <td className="p-4">200.000đ</td>
          <td className="p-4">180.000đ</td>
          <td className="p-4">160.000đ</td>
          <td className="p-4">140.000đ</td>
          <td className="p-4">120.000đ</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
{/* THỦ TỤC THUÊ XE */}
<section className="max-w-7xl mx-auto px-6 py-24">
  <h2 className="text-3xl font-bold text-center mb-16">
    Thủ tục thuê xe
  </h2>

  <div className="grid md:grid-cols-3 gap-12">
    {/* KHÁCH DU LỊCH */}
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center font-bold">
          👤
        </div>
        <h3 className="font-semibold text-lg">Khách du lịch</h3>
      </div>

      <ul className="space-y-4 text-gray-600 pl-16 relative">
        <div className="absolute left-6 top-0 h-full w-px bg-gray-200"></div>
        <li className="relative">
          <span className="absolute -left-9 top-1 w-6 h-6 rounded-full bg-white border-2 border-yellow-400"></span>
          1 trong 3 loại giấy tờ sau: Chứng minh thư, Hộ chiếu, Thẻ căn cước công dân.
        </li>
        <li className="relative">
          <span className="absolute -left-9 top-1 w-6 h-6 rounded-full bg-white border-2 border-yellow-400"></span>
          Thông tin vé máy bay hoặc vé tàu chiều đến và rời Đà Nẵng. Thông tin vé có thể là cuống vé hoặc vé điện tử.
        </li>
      </ul>
    </div>

    {/* KHÁCH DAD NẴNG */}
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center font-bold">
          👤
        </div>
        <h3 className="font-semibold text-lg">
          Khách đang sống tại Đà Nẵng
        </h3>
      </div>

      <ul className="space-y-4 text-gray-600 pl-16 relative">
        <div className="absolute left-6 top-0 h-full w-px bg-gray-200"></div>
        <li className="relative">
          <span className="absolute -left-9 top-1 w-6 h-6 rounded-full bg-white border-2 border-yellow-400"></span>
          1 trong 3 loại giấy tờ sau: Chứng minh thư, Hộ chiếu, Thẻ căn cước công dân.
        </li>
        <li className="relative">
          <span className="absolute -left-9 top-1 w-6 h-6 rounded-full bg-white border-2 border-yellow-400"></span>
          Sổ hộ khẩu gốc. Trường hợp không có sổ hộ khẩu gốc thì đặt cọc 3 triệu thay thế cho Sổ hộ khẩu.
        </li>
      </ul>
    </div>

    {/* NHÓM KHÁC */}
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center font-bold">
          👤
        </div>
        <h3 className="font-semibold text-lg">Nhóm khác</h3>
      </div>

      <p className="text-gray-600 pl-16">
        Với khách thuê xe không thuộc 2 nhóm trên, xin vui lòng gọi điện cho tổng đài hỗ, trợ số điện thoại 0338 023 344 để được hỗ trợ và giải đáp.
      </p>
    </div>
  </div>
</section>


      {/* XE NỔI BẬT */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center flex items-center justify-center gap-2">
            <PiStarThin className="text-yellow-500 text-3xl" />
                Xe nổi bật
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {featuredVehicles.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition p-5"
            >
              <img
                src={item.picture?.[0]}
                className="h-44 w-full object-contain mb-4"
              />
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-gray-500 text-sm">{item.rental}</p>
              <p className="text-yellow-600 font-bold text-xl mt-2">
                {item.price.toLocaleString()}đ / ngày
              </p>

              <button className="mt-4 w-full bg-yellow-400 py-2 rounded-lg font-semibold">
                Đặt xe
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* VÌ SAO CHỌN */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold mb-10 flex items-center gap-2">
          <PiStarThin className="text-yellow-500 text-3xl" />
          Vì sao nên chọn thuê xe máy của
        <span className="text-yellow-500 ml-2">SmartRide</span>?
        </h2>
      <div className="grid md:grid-cols-2 gap-12 items-start">
    {/* TEXT */}
    <div className="space-y-4 text-gray-700 leading-relaxed">
      <p>
        Nói đến dịch vụ thuê xe máy để khám phá du lịch Đà Nẵng, không thể bỏ qua SMARTRIDE – đơn vị uy tín với dịch vụ chuyên nghiệp và chất lượng xe luôn được đặt lên hàng đầu. Khác với nhiều đơn vị khác vì lợi nhuận mà cho thuê xe cũ, kém chất lượng, SMARTRIDE cam kết:
      </p>

      <ul className="space-y-3 list-disc pl-6">
        <li>
          <b>Xe mới 100% – Chạy khỏe, an tâm tuyệt đối:</b> – Nói không với xe cũ, xe kém chất lượng. SMARTRIDE chỉ cung cấp xe mới nhập nguyên lô, đồng bộ kiểu dáng – đảm bảo an toàn và trải nghiệm lái mượt mà.
        </li>
        <li>
          <b>Giấy tờ đầy đủ – Vi vu không lo nghĩ:</b> – Mỗi chiếc xe đều có giấy tờ hợp lệ, nguồn gốc minh bạch – bạn chỉ việc lên đường, mọi thứ đã sẵn sàng.
        </li>
        <li>
          <b>Nhiều dòng xe – Hợp mọi hành trình:</b> – Từ xe tay ga Honda Vision, Air Blade đến xe số Yamaha Sirius 110cc và tay côn WinnerX – SMARTRIDE có đủ lựa chọn cho cả phượt thủ chuyên nghiệp lẫn người mới.
        </li>
        <li>
          <b>Bảo dưỡng kỹ – Phụ tùng chính hãng:</b> – Mỗi chuyến đi là một khởi đầu mới. Xe luôn được kiểm tra, thay thế linh kiện chính hãng để đảm bảo vận hành ổn định.
        </li>
        <li>
          <b>Kiểm tra trước khi giao – Đảm bảo an toàn: </b> – Bạn được chạy thử và kiểm tra xe kỹ lưỡng trước khi nhận – vì sự an toàn của bạn là ưu tiên hàng đầu.
        </li>
        <li>
          <b>Đồ nghề đầy đủ – Chuẩn bị sẵn sàng:</b> – Tặng kèm 2 mũ bảo hiểm, áo mưa, xăng, baga và dây chằng đồ. Ngoài ra, còn có thêm đồ phượt chuyên dụng nếu cần như: bộ dụng cụ vá xe, găng tay bảo hộ, mũ bảo hiểm 3/4,…
        </li>
        <li>
          <b>Dịch vụ tận tâm – Hỗ trợ mọi lúc:</b> – Đội ngũ nhân viên thân thiện, chuyên nghiệp, luôn sẵn sàng đồng hành cùng bạn trên mọi cung đường.
        </li>
      </ul>

      <button onClick={() => setShowMore(true)} className="mt-6 px-6 py-3 border border-black rounded-lg hover:bg-black hover:text-white transition">
        Xem thêm
      </button>

    </div>

    {/* IMAGE */}
    <div>
      <img
  src={Hinh3}
  alt="SmartRide store"
  className="rounded-xl shadow-lg"
/>

    </div>
  </div>
</section>
    {showMore && (
  <section className="max-w-7xl mx-auto px-6 py-24">
    <h2 className="text-3xl font-bold mb-8">
      Thuê xe máy ở Đà Nẵng trả xe tại một tỉnh khác
    </h2>

    <p className="text-gray-700 leading-relaxed mb-10">
      Thuê xe một chiều, trả xe nơi khác không chỉ tiện lợi mà còn giúp bạn tiết kiệm
      tối đa thời gian di chuyển. Dịch vụ này đặc biệt phù hợp với những chuyến đi
      ngắn ngày, giúp bạn thoải mái khám phá Đà Nẵng và các tỉnh lân cận mà không
      cần quay lại điểm nhận xe ban đầu.
      <br /><br />
      Hiện nay, <strong>SmartRide tập trung triển khai dịch vụ cho thuê xe máy tại Đà Nẵng</strong>
      – trung tâm du lịch năng động của miền Trung. Bên cạnh đó, SmartRide cũng đang
      mở rộng hệ thống cho thuê xe máy tại nhiều tỉnh thành khác trên cả nước như
      Hà Nội, Hà Giang, Sa Pa, Hạ Long, Vũng Tàu…
    </p>

    {/* HÌNH 4 */}
    <img
      src={Hinh4}
      alt="Thuê xe máy tại Đà Nẵng"
      className="rounded-xl shadow-lg mb-14 w-full"
    />

    <div className="space-y-8 text-gray-700 leading-relaxed">
      <h3 className="text-2xl font-semibold">
        Thuê xe máy tại Đà Nẵng giao tận nơi
      </h3>

      <p>
        <strong>Phạm vi giao xe miễn phí dưới 3km</strong> từ cửa hàng đến điểm
        nhận/trả xe bao gồm:
      </p>

      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Quận Hải Châu:</strong> Trung tâm thành phố, Bạch Đằng, Trần Phú,
          Nguyễn Văn Linh, Lê Duẩn.
        </li>
        <li>
          <strong>Quận Sơn Trà:</strong> Khu vực biển Mỹ Khê, Phạm Văn Đồng,
          Võ Nguyên Giáp.
        </li>
        <li>
          <strong>Quận Thanh Khê:</strong> Ga Đà Nẵng, đường Nguyễn Tất Thành,
          Điện Biên Phủ.
        </li>
        <li>
          <strong>Sân bay Đà Nẵng:</strong> Giao nhận theo lịch hẹn trước.
        </li>
      </ul>

      <p>
        <strong>Phí giao nhận ngoài phạm vi miễn phí:</strong>
      </p>

      <ul className="list-disc pl-6 space-y-1">
        <li>3 – 5km: 30.000đ / lượt</li>
        <li>Trên 5km: 40.000đ / lượt</li>
      </ul>

      <h3 className="text-2xl font-semibold mt-10">
        Bảng giá giao hoặc nhận xe tại Đà Nẵng
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="border px-4 py-3 font-semibold">
                Địa điểm thuê xe máy
              </th>
              <th className="border px-4 py-3 font-semibold">
                Phí giao hoặc nhận xe / lượt
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-3">Quận Hải Châu</td>
              <td className="border px-4 py-3">Miễn phí</td>
            </tr>
            <tr>
              <td className="border px-4 py-3">Quận Thanh Khê</td>
              <td className="border px-4 py-3">20.000 – 30.000 VND</td>
            </tr>
            <tr>
              <td className="border px-4 py-3">Quận Sơn Trà</td>
              <td className="border px-4 py-3">20.000 – 30.000 VND</td>
            </tr>
            <tr>
              <td className="border px-4 py-3">Quận Ngũ Hành Sơn</td>
              <td className="border px-4 py-3">30.000 – 40.000 VND</td>
            </tr>
            <tr>
              <td className="border px-4 py-3">Quận Liên Chiểu</td>
              <td className="border px-4 py-3">30.000 – 40.000 VND</td>
            </tr>
            <tr>
              <td className="border px-4 py-3">Sân bay Đà Nẵng</td>
              <td className="border px-4 py-3">30.000 VND</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="italic text-sm text-gray-500">
        * Bảng giá áp dụng cho dịch vụ giao hoặc nhận xe trong khu vực nội thành Đà Nẵng.
      </p>
    </div>
  </section>
)}

      {/* 👉 LIÊN HỆ (ĐÍCH ĐỂ HEADER SCROLL) */}
      {/* LIÊN HỆ */}
<section className="bg-gray-900 text-white py-20">
  <div className="max-w-6xl mx-auto px-6 text-center space-y-6">
    <h2 className="text-3xl font-bold">Liên hệ SmartRide</h2>

    <p className="text-gray-300">
      Thuê xe nhanh chóng – Hỗ trợ tận tâm – Phục vụ 24/7
    </p>

    <div className="space-y-2 text-lg">
      <p className="flex items-center justify-center gap-2">
        <FaLocationArrow className="text-yellow-400" />
        86/26 Thi Sách, Hải Châu, Đà Nẵng
      </p>
      <p className="flex items-center justify-center gap-2">
        <FaPhone className="text-yellow-400" />
        0338 023 344
      </p>
      <p className="flex items-center justify-center gap-2">
        <SiGmail className="text-yellow-400" />
        smartride@gmail.com
        </p>
    </div>

    <Link
      to="/contact"
      className="inline-block mt-6 bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold hover:bg-yellow-500 transition"
    >
      Liên hệ ngay
    </Link>
  </div>
</section>

    </>
  );
}
