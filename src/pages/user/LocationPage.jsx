import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConnect";
import { collection, getDocs, query, where } from "firebase/firestore";
import cccdImg from "../../img/cccd.jpg";
import bangImg from "../../img/banglaixe.png";
import benxeImg from "../../img/benxe.jpeg";
import GaDNImg from "../../img/gadanang.jpg";
import SanbayImg from "../../img/sanbay.jpg";
import bienImg from "../../img/bienmykhe.jpg";
import banaImg from "../../img/banahills.png";
import NguHanhSonImg from "../../img/nguhanhson.jpg";
import sontraIMG from "../../img/sonTra.jpg";
export default function LocationDanang() {
  const [featuredBikes, setFeaturedBikes] = useState([]);
  const xeSo = featuredBikes.find(
    bike => bike.kind === "Xe số");
  const xeTayGa = featuredBikes.find(
    bike => bike.kind === "Xe tay ga");
    const [vehicleTypes, setVehicleTypes] = useState([]);
  useEffect(() => {
  const fetchVehicleTypes = async () => {

    const snap = await getDocs(collection(db, "vehicles"));

    const data = snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // chỉ lấy Xe số + Xe tay ga
    const filtered = data.filter(
      bike =>
        bike.status === "available" &&
        (bike.kind === "Xe số" || bike.kind === "Xe tay ga")
    );

    // tránh lặp loại xe
    const uniqueKinds = [];

    const result = filtered.filter(bike => {
      if (!uniqueKinds.includes(bike.kind)) {
        uniqueKinds.push(bike.kind);
        return true;
      }
      return false;
    });

    setVehicleTypes(result);
  };

  fetchVehicleTypes();
}, []);

  return (
    
    <div className="bg-gray-50">

      {/* ================= LOẠI XE PHỔ BIẾN ================= */}
      <div className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold mb-10">
            Những loại xe máy phổ biến ở Đà Nẵng
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {vehicleTypes.map((bike) => (
              <TypeCard key={bike.id}img={bike.picture?.[0]} title={bike.kind} desc={bike.description}/>
            ))}
          </div>
        </div>
      </div>
      {/* ================= LƯU Ý ================= */}
<section className="py-16">
  <div className="max-w-7xl mx-auto px-6">

  <h2 className="text-3xl font-bold mb-10">
    Một số lưu ý khi thuê xe máy ở Đà Nẵng
  </h2>

  <div className="space-y-10 text-gray-700 leading-7">

    {/* 1 */}
    <div>
      <h3 className="font-semibold text-xl mb-3">
        1. Lưu ý về thời tiết
      </h3>
      <p>Thời tiết ở Đà Nẵng trong năm trải qua 2 mùa chủ đạo. Mùa mưa thường diễn ra từ tháng 9 đến hết tháng 12, với đỉnh điểm vào tháng 10 và 11. Trong thời gian này, mưa có thể kéo dài, thậm chí kèm theo bão, ngập lụt khiến cho việc điều khiển xe máy gặp nhiều khó khăn. Đặc biệt di chuyển trên các con đường đèo và quanh các khu vực núi sẽ tương đối nguy hiểm.
        Trong khi đó, từ khoảng tháng 4 đến tháng 8 là mùa nắng nhiều nhất tại Đà Nẵng. Trong thời gian này, nhiệt độ có thể đạt mức cao, đặc biệt là vào buổi trưa.
        Bạn nên kiểm tra dự báo thời tiết Đà Nẵng trước khi thuê xe máy để có thể lựa chọn loại xe, chuẩn bị đồ mang theo cũng như lên được lịch trình phù hợp nhất.</p>
    </div>
    {/* 2 */}
    <div>
      <h3 className="font-semibold text-xl mb-3">
        2. Chọn loại xe phù hợp
      </h3>
      <div>
        Việc lựa chọn đúng loại xe máy không chỉ giúp bạn tiết kiệm chi phí nhiên liệu mà còn đảm bảo an toàn và thuận tiện trong suốt hành trình. Dưới đây là gợi ý các loại xe phổ biến:
        <p>Xe số là lựa chọn phổ biến với những ai muốn tiết kiệm xăng và di chuyển trên các địa hình dốc như bán đảo Sơn Trà hay đèo Hải Vân. Loại xe này có ưu điểm là gọn nhẹ, dễ sửa chữa và giá thuê rẻ. Tuy nhiên, nếu bạn không quen đi xe số, có thể mất thời gian làm quen.
        <br />Xe tay ga rất phù hợp cho việc di chuyển trong trung tâm thành phố, dọc bờ biển Mỹ Khê hoặc đi dạo ở Hội An. Dòng xe này dễ điều khiển, cốp rộng, mang lại cảm giác thoải mái cho người lái. Tuy nhiên, xe tay ga tiêu tốn nhiên liệu nhiều hơn và không thực sự phù hợp khi đi đường đèo hoặc quãng đường dài.
        <br />Xe côn tay là lựa chọn tuyệt vời cho những ai yêu thích cảm giác mạnh, thích phượt và có kinh nghiệm lái xe. Với động cơ khỏe, xe côn tay giúp bạn chinh phục các cung đường dài như Đà Nẵng – Huế một cách dễ dàng. Tuy nhiên, xe khá nặng, khó điều khiển với người mới và tiêu hao xăng hơn các loại khác.
        <br />Xe máy điện là xu hướng mới, thân thiện với môi trường, không cần đổ xăng, phù hợp để di chuyển quanh thành phố. Xe chạy êm, dễ sử dụng và không phát ra tiếng ồn. Tuy nhiên, bạn cần chú ý đến dung lượng pin và quãng đường di chuyển để tránh hết điện giữa đường.
      </p>
      </div>
    </div>
    {/* 3 */}
    <div>
      <h3 className="font-semibold text-xl mb-3">
        3. Đặt xe trước mùa cao điểm
      </h3>
      <p>
        Vào mùa cao điểm du lịch như dịp lễ, Tết hay mùa hè, nhu cầu thuê xe máy ở Đà Nẵng tăng mạnh, khiến nhiều cửa hàng nhanh chóng cháy xe. Để tránh tình trạng hết xe hoặc phải thuê xe cũ, chất lượng kém, bạn nên chủ động đặt xe trước. Việc đặt trước không chỉ giúp đảm bảo còn xe đời mới, máy khỏe mà còn giúp bạn linh hoạt sắp xếp thời gian nhận xe, tiết kiệm thời gian chờ đợi khi đến nơi.
      </p>
    </div>
    {/* 4 */}
    <div>
      <h3 className="font-semibold text-xl mb-3">
        4. Chuẩn bị giấy tờ cần thiết
      </h3>
      <p>
        Để thuê xe máy ở Đà Nẵng, bạn phải mang theo các giấy tờ cá nhân như Giấy phép lái xe, Chứng minh nhân dân/Căn cước công dân. Bạn cũng cần lưu ý GPLX phải đứng tên người điều khiển xe máy nhé.
      <br />Nếu bạn thuê xe máy ở Đà Nẵng du lịch trong ngắn ngày, hầu hết các điểm thuê xe máy chỉ yêu cầu chụp lại giấy tờ tùy thân của bạn là có thể hoàn tất thủ tục thuê xe, giúp bạn có thể linh hoạt sử dụng giấy tờ cho nhiều mục đích.</p>
    </div>
    {/* 5 */}
    <div>
      <h3 className="font-semibold text-xl mb-3">
        5. Kiểm tra xe trước khi nhận
      </h3>
      <p>
        Trước khi thuê xe máy, hãy thảo luận rõ ràng với nhà xe về các điều khoản thuê xe như giá cước, thời gian thuê, phí phạt và các điều kiện khác. Bạn nên yêu cầu nhà xe lập hợp đồng thuê xe, để đảm bảo quyền lợi cho cả hai bên.
      <br />Đồng thời, cung cấp địa chỉ giao nhận xe một cách càng chi tiết càng tốt để tránh những sự nhầm lẫn không đáng có. Bạn có thể sử dụng tọa độ vị trí trên ứng dụng bản đồ để chia sẻ địa chỉ chính xác với chủ xe.</p>
    </div>
    {/* 6 */}
    <div>
      <h3 className="font-semibold text-xl mb-3">
        6. Đọc và hiểu rõ hợp đồng thuê xe máy
      </h3>
      <p>Trước khi nhận xe, bạn nên đọc kỹ hợp đồng thuê xe máy để nắm rõ các điều khoản và trách nhiệm liên quan. Dù hầu hết các địa chỉ cho thuê xe máy uy tín tại Đà Nẵng đều cung cấp hợp đồng rõ ràng, dễ hiểu, nhưng việc xem kỹ vẫn rất cần thiết để tránh phát sinh tranh chấp sau này. Kiểm tra các nội dung như thời gian thuê, chi phí, quy định trả xe, và xử lý khi xe gặp sự cố sẽ giúp bạn yên tâm hơn trong suốt hành trình.</p>
    </div>
    {/* 7 */}
    <div>
      <h3 className="font-semibold text-xl mb-3">
        7. Kiểm tra xe kỹ lưỡng khi nhận xe
      </h3>
      <p>Khi nhận xe, hãy chắc chắn bạn đã kiểm tra cẩn thận hiện trạng xe.
        <br /> - Chức năng của các bộ phận xe (như còi, xi nhan, đèn xe, phanh trước, phanh sau, khoá cổ xe,…) Nếu phát hiện có gì bất thường, bạn nên báo ngay cho nhà xe hỗ trợ kịp thời, hoặc yêu cầu đổi xe nếu cảm thấy không an toàn cho chuyến đi.
        <br /> - Vết sơn và vết trầy xước trên thân xe: Nếu phát hiện có bất kỳ sự cố nào, hãy báo ngay cho nhà xe để được hỗ trợ kịp thời. Để tránh có thể bị cáo buộc về hư hỏng trên thân xe sau này, tốt hơn hết bạn nên chụp lại hiện trạng chi tiết của xe khi nhận xe.
        <br /> - Lượng xăng có sẵn: Thông thường, trong xe khi giao cho khách đều có sẵn tối thiểu khoảng 1 lít xăng để khách có thể chạy xe tới cây xăng gần nhất và bổ sung nhiên liệu. Nếu kiểm tra tại thời điểm nhận xe mà phát hiện lượng xăng đang có là không đủ, bạn cần yêu cầu nhà xe bổ sung thêm lượng xăng cần thiết nhé.</p>
    </div>
    {/* 8 */}
    <div>
      <h3 className="font-semibold text-xl mb-3">
        8. Lưu lại thông tin liên lạc của chủ xe
      </h3>
      <p>Khi nhận xe, hãy chắc chắn bạn đã kiểm tra cẩn thận hiện trạng xe.
        <br /> Khi thuê xe máy, bạn nên lưu lại đầy đủ thông tin liên hệ của cửa hàng cho thuê, bao gồm tên đơn vị, số điện thoại và địa chỉ cụ thể. Điều này giúp bạn dễ dàng liên hệ khi xe gặp sự cố hoặc cần hỗ trợ trong quá trình sử dụng.
        <br /> Thông tin liên lạc thường được ghi trên hợp đồng, giấy nhận xe, mũ bảo hiểm hoặc dán trên thân xe. Hãy kiểm tra và lưu lại để đảm bảo an toàn và thuận tiện trong suốt chuyến đi.
        </p>
    </div>
    
    {/* 9 */}
    <div>
        <h2 className="text-3xl font-bold mb-10">
            Một số lưu ý khi thuê xe máy ở Đà Nẵng
        </h2>
        <h3 className="text-xl font-semibold">
            Xe số phổ thông
        </h3>
        <br />
      <p>Xe số là lựa chọn phổ biến khi thuê xe máy tại Đà Nẵng nhờ khả năng vận hành linh hoạt và tiết kiệm xăng. Giá thuê xe số ở Đà Nẵng dao động từ 90.000 – 110.000 VNĐ/ngày, tùy thuộc vào đời xe và thời điểm thuê.
        <br /> Một số dòng xe số được ưa chuộng như Honda Wave Alpha, Yamaha Sirius – dễ sử dụng, bền bỉ, phù hợp với địa hình cả trong thành phố lẫn vùng ngoại ô. Nếu bạn muốn thuê xe số Đà Nẵng giá rẻ, nên đặt trước và chọn các đơn vị uy tín để đảm bảo chất lượng xe tốt và dịch vụ chuyên nghiệp.
        </p>
        {xeSo?.picture?.length > 0 && (
          <img src={xeSo.picture[0]} alt={xeSo.name} className="rounded-xl shadow-md"/>)}
    </div>
    {/* 10 */}
    <div>
        <h3 className="text-xl font-semibold">
            Xe tay ga phổ thông
        </h3>
        <br />
      <p>Bên cạnh xe số, xe tay ga được nhiều du khách lựa chọn khi thuê xe máy tại Đà Nẵng nhờ dễ sử dụng, vận hành êm ái và thuận tiện di chuyển trong thành phố.
        <br />Giá thuê xe tay ga ở Đà Nẵng thường dao động từ 110.000 – 140.000 VNĐ/ngày, tùy loại xe và thời điểm. Các mẫu xe phổ biến như Honda Vision, Air Blade, Lead luôn nằm trong top được thuê nhiều nhờ độ bền và thiết kế tiện lợi.
        </p>
        {xeTayGa?.picture?.length > 0 && (
          <img src={xeTayGa.picture[0]} alt={xeTayGa.name} className="rounded-xl shadow-md"/>)}
    </div>
    {/* 11 */}
    <div>
        <h3 className="text-2xl font-semibold">
            Giá thuê xe máy Đà Nẵng
        </h3>
        <br />
      <p>Giá thuê xe máy tại Đà Nẵng thường dao động từ 90.000 – 140.000 VNĐ/ngày, tùy thuộc vào loại xe và thời điểm thuê. Vào mùa du lịch cao điểm như lễ, Tết hoặc mùa hè, giá có thể tăng nhẹ khoảng 10–20%, nhưng nhìn chung vẫn rất hợp lý so với các thành phố du lịch khác.
        <br />Thời gian thuê xe máy tại Đà Nẵng thường được tính theo chu kỳ 24 giờ, tuy nhiên một số cửa hàng áp dụng khung giờ giao – nhận xe trong ngày, từ 7:00 sáng đến 21:00 tối. Chính sách thuê có thể thay đổi tùy từng đơn vị, đặc biệt trong các dịp lễ lớn khi nhu cầu tăng cao.
        <br />Tại Đà Nẵng, không nhiều cơ sở hỗ trợ cho thuê xe máy theo giờ. Một số nhà xe áp dụng vào mùa thấp điểm, bao gồm các gói thuê xe 6 tiếng, nửa ngày hoặc cả ngày, tùy thuộc vào nhu cầu của khách hàng.
        <br />Để thuê xe máy Đà Nẵng giá tốt, bạn nên đặt thuê xe trước. Đồng thời, nên kiểm tra kỹ thời gian giao trả xe và các phụ phí phát sinh nếu có, để tránh phát sinh chi phí không mong muốn.
        </p>
    </div>
    {/* 12 */}
    <div>
        <h2 className="text-3xl font-bold mb-10">
            Thuê xe máy Đà Nẵng cần những giấy tờ gì?
        </h2>
        <p>Để thuê xe máy ở Đà Nẵng, bạn cần chuẩn bị các loại giấy tờ sau:</p>
        <br />
        <h3 className="text-xl font-semibold">
           1. Chứng minh nhân dân/Căn cước công dân hoặc Hộ chiếu
        </h3>
        <br />
      <p>Chứng minh nhân dân hoặc căn cước công dân là các loại giấy tờ cá nhân quan trọng, được yêu cầu bắt buộc khi thuê xe máy ở Đà Nẵng. Đây là các tài liệu xác thực danh tính cá nhân, cung cấp thông tin về người thuê xe để đảm bảo tính minh bạch và an toàn trong quá trình giao dịch.
        <br />Hộ chiếu là một trong những loại giấy tờ chứng minh danh tính quốc tế và thường được yêu cầu khi người thuê xe là người nước ngoài. Hộ chiếu cung cấp thông tin cần thiết về quốc tịch và danh tính của người sử dụng dịch vụ thuê xe máy.
        </p>
        <img src={cccdImg} alt="CCCD" className="rounded-xl shadow-md"/>
    </div>
    {/* 13 */}
    <div>
        <h3 className="text-xl font-semibold">
           2. Giấy phép lái xe
        </h3>
        <br />
      <p>Giấy phép lái xe là một tài liệu quan trọng chứng minh khả năng lái xe của người thuê xe. Đây là một yếu tố cần thiết để đảm bảo an toàn khi lái xe máy trên đường phố. Việc có giấy phép lái xe hợp lệ cũng thể hiện sự tuân thủ luật lệ giao thông của bạn.
        <br />Khi thuê xe máy ở Đà Nẵng, việc có giấy phép lái xe hợp lệ là điều bắt buộc và quan trọng. Nó chứng minh rằng người sử dụng có đủ kỹ năng và kiến thức để lái xe an toàn, giảm thiểu nguy cơ tai nạn giao thông.
        <br />Thông thường, với hầu hết các loại xe phổ thông ở Đà Nẵng bạn chỉ cần Giấy phép lái xe hạng A1 là đủ điều kiện để thuê xe máy.
        </p>
        <img src={bangImg} alt="bang" className="rounded-xl shadow-md"/>
    </div>
    {/* 14 */}
    <div>
        <h3 className="text-xl font-semibold">
           3. Giấy tờ khác như sổ tạm trú, thường trú, sổ hộ khẩu
        </h3>
        <br />
      <p>Ngoài các giấy tờ chứng minh danh tính và giấy phép lái xe, khi bạn thuê xe máy dài ngày như thuê xe theo tháng, bạn có thẻ cần xuất trình thêm một số giấy tờ khác như sổ tạm trú, sổ thường trú hoặc sổ hộ khẩu để xác định địa chỉ cư trú của bạn.
        <br />Bạn nên liên hệ điểm cho thuê xe trong từng trường hợp cụ thể để được tư vấn chi tiết hơn nhé.
        </p>
    </div>
    {/* 15 */}
    <div>
        <h2 className="text-3xl font-bold mb-10">
            Các khu vực thuê xe máy ở Đà Nẵng
        </h2>
        <br />
        <h3 className="text-xl font-semibold">
           Thuê xe máy Hải Châu
        </h3>
        <br />
      <p>Hải Châu là trung tâm hành chính và du lịch của Đà Nẵng, tập trung nhiều khách sạn, homestay cùng các địa điểm như chợ Hàn, cầu Rồng và các tuyến phố sầm uất. Hầu hết du khách đều chọn ở khu vực này làm điểm dừng chân khi đến Đà Nẵng, dễ dàng đặt dịch vụ thuê xe máy và giao trả xe tận nơi miễn phí chỉ sau 5 phút.
        <br />Nếu đang lưu trú ở khu vực Hải Châu, việc thuê xe máy sẽ giúp bạn dễ dàng di chuyển từ trung tâm ra các điểm du lịch nổi tiếng. Lựa chọn này giúp bạn tiết kiệm chi phí và chủ động hơn so với taxi hay xe công nghệ.
        <br />Khi thuê xe máy qua SmartRide, bạn có thể nhận xe nhanh chóng ngay tại khách sạn hoặc homestay. Trên mỗi xe thường kèm theo mũ bảo hiểm cũng như có hỗ trợ 24/7, giúp bạn có thể an tâm nhất khi khám phá Đà Nẵng.
        </p>
    </div>
    {/* 16 */}
    <div>
        <h3 className="text-xl font-semibold">
           Thuê xe máy Ngũ Hành Sơn
        </h3>
        <br />
      <p>Ngũ Hành Sơn là điểm đến nổi bật của Đà Nẵng với cụm núi đá vôi kỳ vĩ, làng đá mỹ nghệ Non Nước và bãi biển Non Nước trải dài tuyệt đẹp. Nếu lưu trú tại khách sạn hay homestay khu này quanh bãi biển Non Nước, việc thuê xe máy sẽ giúp bạn linh hoạt khám phá cả danh thắng Ngũ Hành Sơn lẫn các bãi biển lân cận mà không phụ thuộc taxi hay tour cố định.
        <br />Trên SmartRide, bạn dễ dàng đặt dịch vụ thuê xe máy khu vực Ngũ Hành Sơn với đa dạng loại xe phù hợp cả đi cặp đôi, nhóm bạn hay gia đình. Điểm cộng lớn là giao xe tận nơi miễn phí, giúp bạn tiết kiệm thời gian di chuyển.
        <br />Ngoài ra, các cửa hàng cho thuê xe máy tại Ngũ Hành Sơn với thủ tục nhanh gọn, chỉ mất vài phút đặt xe online trên SmartRide là bạn đã có ngay phương tiện để khám phá “danh thắng ngũ hành” nổi tiếng này.
        </p>
    </div>
    {/* 17 */}
    <div>
        <h3 className="text-xl font-semibold">
           Thuê xe máy gần Bến xe Đà Nẵng
        </h3>
        <br />
      <p>Bến xe trung tâm Đà Nẵng nơi tập trung nhiều tuyến xe khách đi đến các tỉnh thành ở khu vực miền Trung.. Sau khi vừa xuống xe, lựa chọn thuê xe máy giao tại Bến xe Đà Nẵng sẽ giúp bạn có phương tiện di chuyển ngay, không mất thời gian chờ taxi hay xe công nghệ.
        <br />Đặt xe ngay hôm nay để trải nghiệm dịch vụ thuê xe máy Bến xe Đà Nẵng nhanh chóng, uy tín. Chỉ cần vài thao tác đăng ký online, bạn có thể nhận xe nhanh chóng ngay khi vừa đến bến xe.
        </p>
        <img src={benxeImg} alt="benxe" className="rounded-xl shadow-md"/>
    </div>
    {/* 18 */}
    <div>
        <h3 className="text-xl font-semibold">
           Thuê xe máy gần Sân bay Đà Nẵng
        </h3>
        <br />
      <p>Sân bay quốc tế Đà Nẵng là cửa ngõ chính đón hàng triệu du khách mỗi năm. Để tiết kiệm chi phí và chủ động di chuyển ngay khi vừa hạ cánh, nhiều khách lựa chọn thuê xe máy ở Sân bay Đà Nẵng thay vì chờ taxi hay xe dịch vụ. Đây là cách thuận tiện để bạn bắt đầu khám phá thành phố chỉ sau vài phút nhận xe. Khi kết thúc chuyến đi, bạn cũng có thể trả xe trực tiếp tại Sân bay Đà Nẵng, vô cùng thuận tiện.
        <br />Chỉ cần đặt trước trên trang thuê xe máy Đà Nẵng, bạn sẽ được giao nhận xe miễn phí ngay tại sảnh sân bay. Thủ tục nhanh gọn, nhận xe kèm mũ bảo hiểm, và có thể di chuyển thẳng về khách sạn hoặc ghé các điểm tham quan gần trung tâm ngay sau khi hạ cánh.
        </p>
        <img src={SanbayImg} alt="bay" className="rounded-xl shadow-md"/>
    </div>
    {/* 19 */}
    <div>
        <h3 className="text-xl font-semibold">
           Thuê xe máy gần Ga Đà Nẵng
        </h3>
        <br />
      <p>Ga Đà Nẵng có lợi thế nằm ngay trung tâm, chỉ cách cầu Rồng, chợ Hàn hay sông Hàn vài phút di chuyển. Vì vậy, lựa chọn thuê xe máy gần Ga Đà Nẵng là giải pháp tiện lợi để bạn chủ động đi thẳng vào trung tâm, không cần đổi phương tiện trung gian.
        </p>
        <img src={GaDNImg} alt="Ga" className="rounded-xl shadow-md"/>
        <p>Nhiều cửa hàng cho thuê xe máy Đà Nẵng hỗ trợ giao xe miễn phí tận cổng ga. Bạn có thể nhận xe ngay, cùng hành lý gọn gàng trên xe và vi vu khám phá thành phố. Đặc biệt, hình thức thuê xe tại ga Đà Nẵng còn đáp ứng tốt nhu cầu của khách đi tàu đêm hoặc sáng sớm, cần xe máy di chuyển ngay lập tức.</p>
    </div>
    {/* 20 */}
    <div>
        <h2 className="text-3xl font-bold mb-10">
            Gợi ý một số địa điểm phượt Đà Nẵng bằng xe máy
        </h2>
        <br />
        <h3 className="text-xl font-semibold">
           Bãi biển Mỹ Khê
        </h3>
        <br />
        <img src={bienImg} alt="CCCD" className="rounded-xl shadow-md"/>
        <br />
      <p>Bãi biển Mỹ Khê Đà Nẵng là điểm đến nổi bật dành cho du khách muốn kết hợp du lịch biển và khám phá thành phố bằng xe máy. Với bãi cát trắng mịn, làn nước xanh mát và hàng dừa trải dài, nơi đây được mệnh danh là một trong những bãi biển đẹp nhất hành tinh. Nếu bạn đang có kế hoạch thuê xe máy Đà Nẵng, đừng bỏ qua hành trình vi vu đến Mỹ Khê điểm dừng chân lý tưởng chỉ cách trung tâm thành phố vài phút di chuyển.
        </p>
    </div>
    {/* 21 */}
    <div>
        <br />
        <h3 className="text-xl font-semibold">
           Bà Nà Hills
        </h3>
        <br />
        <img src={banaImg} alt="bana" className="rounded-xl shadow-md"/>
        <br />
      <p>Bà Nà Hills Đà Nẵng là khu du lịch nghỉ dưỡng nổi tiếng nằm trên đỉnh núi Bà Nà với khí hậu mát mẻ quanh năm. Được biết đến với tuyến cáp treo đạt kỷ lục thế giới, nơi đây mang đến trải nghiệm “lơ lửng giữa mây trời” và phóng tầm nhìn ra thiên nhiên hùng vĩ.
        <br />Với vườn hoa rực rỡ, công viên giải trí Fantasy Park, và làng Pháp cổ kính, Bà Nà Hills là điểm đến lý tưởng khi khám phá Đà Nẵng. Nhiều du khách lựa chọn thuê xe máy Đà Nẵng để chủ động di chuyển đến chân núi, kết hợp hành trình phượt thú vị cùng không khí trong lành nơi núi cao.
        </p>
    </div>
    {/* 22 */}
    <div>
        <br />
        <h3 className="text-xl font-semibold">
           Ngũ Hành Sơn
        </h3>
        <br />
        <img src={NguHanhSonImg} alt="nui" className="rounded-xl shadow-md"/>
        <br />
      <p>Ngũ Hành Sơn Đà Nẵng còn gọi là Núi Ngũ Hành là quần thể núi đá vôi nổi tiếng nằm cách trung tâm thành phố khoảng 10 km. Khu vực này gồm năm ngọn núi tượng trưng cho ngũ hành Kim Mộc Thủy Hỏa Thổ mỗi ngọn mang vẻ đẹp và giá trị tâm linh riêng biệt.
        <br />Đây là điểm đến lý tưởng cho du khách yêu thích khám phá thiên nhiên và văn hóa tâm linh. Nhiều người lựa chọn thuê xe máy Đà Nẵng để dễ dàng di chuyển đến Ngũ Hành Sơn và chủ động khám phá từng ngọn núi chùa chiền và hang động tại đây.
        </p>
    </div>
    {/* 23 */}
    <div>
        <br />
        <h3 className="text-xl font-semibold">
           Bán đảo Sơn Trà
        </h3>
        <br />
        <img src={sontraIMG} alt="bandao" className="rounded-xl shadow-md"/>
        <br />
      <p>Bán đảo Sơn Trà – hòn ngọc xanh của thành phố Đà Nẵng, Việt Nam được mệnh danh là “lá phổi xanh” của thành phố, Sơn Trà sở hữu những khu rừng nguyên sinh phong phú, đa dạng hệ động, thực vật và cảnh quan núi non hùng vĩ. Bán đảo cũng nổi tiếng với Chùa Linh Ứng, Đỉnh Bàn Cờ, nơi cho bạn tầm nhìn 360 độ ra biển Đông và thành phố Đà Nẵng. 
        <br />Bên cạnh đó, Bán đảo Sơn Trà còn có các bãi biển hoang sơ và đẹp như tranh vẽ như bãi Bụt, bãi Rạng, thích hợp cho việc lặn biển ngắm san hô và thưởng ngoạn cảnh đẹp. Sơn Trà không chỉ là điểm đến cho những chuyến phiêu lưu mà còn là nơi nghỉ dưỡng lý tưởng cho mọi nhà.
        </p>
    </div>
  </div>
  </div>
</section>
    </div>
  );

}

/* ================= COMPONENT ================= */

function VehicleCard({ img, name, price }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-5">
      <img src={img} className="h-48 w-full object-contain" />
      <h3 className="font-bold text-lg mt-4">{name}</h3>
      <p className="text-yellow-600 font-semibold mt-2">
        {price}
      </p>

      <button className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg">
        Thuê ngay
      </button>
    </div>
  );
}

function TypeCard({ img, title, desc }) {
  return (
    <div className="text-center">
      <img
        src={img}
        className="h-40 mx-auto object-contain"
      />
      <h3 className="font-bold text-xl mt-4">
        {title}
      </h3>
      <p className="text-gray-600 mt-2">
        {desc}
      </p>
    </div>
  );
}