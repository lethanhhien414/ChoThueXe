import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConnect";
import { FaCheckCircle } from "react-icons/fa";

export default function VehicleDetail() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState(null);
  const [tab, setTab] = useState("intro");
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {

    const fetchVehicle = async () => {

      const ref = doc(db, "vehicles", id);
      const snap = await getDoc(ref);

      if (snap.exists()) {

        const data = snap.data();

        setVehicle({
          id: snap.id,
          ...data
        });

        setMainImage(data.picture?.[0] || "");

      }

    };

    fetchVehicle();

  }, [id]);

  if (!vehicle) {
    return (
      <p className="text-center py-20">
        Đang tải...
      </p>
    );
  }

  return (

    <div className="bg-gray-50 min-h-screen">

      {/* HEADER */}

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold">
          {vehicle.name}
        </h1>

        <p className="text-gray-500 mt-2">
          {vehicle.brand} • {vehicle.kind}
        </p>

      </div>

      {/* MAIN */}

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">

        {/* ================= LEFT ================= */}

        <div className="md:col-span-2">

          {/* MAIN IMAGE */}

          <div className="bg-white rounded-2xl shadow p-8">

            <img
              src={mainImage}
              alt="vehicle"
              className="w-full h-[420px] object-contain"
            />

          </div>

          {/* IMAGE GALLERY */}

          <div className="flex gap-3 mt-4 flex-wrap">

            {vehicle.picture?.map((img, i) => (

              <img
                key={i}
                src={img}
                onClick={() => setMainImage(img)}
                className={`w-24 h-24 object-cover rounded-lg cursor-pointer border
                  ${mainImage === img ? "border-yellow-500" : "border-gray-200"}`}
              />

            ))}

          </div>

          {/* TAB MENU */}

          <div className="flex gap-8 mt-10 border-b">

            <button
              onClick={() => setTab("intro")}
              className={tab === "intro" ? "border-b-2 pb-3 font-bold" : ""}
            >
              Giới thiệu
            </button>

            <button
              onClick={() => setTab("feature")}
              className={tab === "feature" ? "border-b-2 pb-3 font-bold" : ""}
            >
              Tính năng
            </button>

            <button
              onClick={() => setTab("spec")}
              className={tab === "spec" ? "border-b-2 pb-3 font-bold" : ""}
            >
              Thông số kỹ thuật
            </button>

          </div>

          {/* TAB CONTENT */}

          <div className="bg-white rounded-2xl shadow p-8 mt-6">

            {/* INTRO */}

            {tab === "intro" && (

              <>
                <h2 className="text-2xl font-bold mb-4">
                  Tổng quan xe
                </h2>

                <div className="space-y-4 text-gray-600 leading-7">

                  <p>{vehicle.introduction}</p>

                  <p>
                    <strong>Dòng xe:</strong> {vehicle.brand} {vehicle.model}
                  </p>

                  <p>
                    <strong>Loại xe:</strong> {vehicle.kind}
                  </p>

                  <p>
                    <strong>Màu sắc:</strong> {vehicle.color}
                  </p>

                  <p>
                    <strong>Phiên bản:</strong>{" "}
                    {vehicle.versions?.join(", ")}
                  </p>

                  {vehicle.description && (
                    <p>{vehicle.description}</p>
                  )}

                </div>
              </>

            )}

            {/* FEATURES */}

            {tab === "feature" && (

              <>
                <h2 className="text-2xl font-bold mb-6">
                  Tính năng nổi bật
                </h2>

                <div className="space-y-3">

                  {vehicle.features?.map((f, i) => (

                    <div key={i} className="flex items-center gap-3">

                      <FaCheckCircle className="text-green-500 text-lg" />

                      <p className="text-gray-600">
                        {f}
                      </p>

                    </div>

                  ))}

                </div>
              </>

            )}

            {/* SPECS */}

            {tab === "spec" && (

              <div className="space-y-4">

                <Spec label="Loại động cơ" value={vehicle.specs?.engineType} />
                <Spec label="Bố trí xi lanh" value={vehicle.specs?.cylinderLayout} />
                <Spec label="Dung tích" value={vehicle.specs?.displacement} />
                <Spec label="Đường kính x Hành trình" value={vehicle.specs?.boreStroke} />
                <Spec label="Công suất" value={vehicle.specs?.maxPower} />
                <Spec label="Hộp số" value={vehicle.specs?.transmission} />

              </div>

            )}

          </div>

        </div>

        {/* ================= RIGHT ================= */}

        <div>

          <div className="bg-white rounded-2xl shadow p-6 sticky top-24">

            <p className="text-3xl font-bold text-yellow-600">
              {vehicle?.price ? vehicle.price.toLocaleString() : "0"}đ / ngày
            </p>

            <p className="text-gray-500 mt-2">
              Khu vực: {vehicle.rental}
            </p>

            <hr className="my-6" />

            <h3 className="font-semibold mb-3">
              Giá thuê theo ngày
            </h3>

            {[
              ["1_5", vehicle.priceTable?.["1_5"]],
              ["6_10", vehicle.priceTable?.["6_10"]],
              ["11_15", vehicle.priceTable?.["11_15"]],
              ["16_30", vehicle.priceTable?.["16_30"]],
              ["30_plus", vehicle.priceTable?.["30_plus"]],
            ].map(([key, value]) => (

              <div key={key} className="flex justify-between py-2 border-b">

                <span>
                  {key === "30_plus"
                    ? "Trên 30 ngày"
                    : key.replace("_", "-") + " ngày"}
                </span>

                <span>
                  {value ? Number(value).toLocaleString() : "0"}đ
                </span>

              </div>

            ))}

            <button
              onClick={() =>
                navigate("/booking", { state: { vehicle } })
              }
              className="w-full mt-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl font-semibold"
            >
              Thuê xe ngay
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

function Spec({ label, value }) {

  return (

    <div className="flex justify-between border-b py-3">

      <span className="text-gray-500">
        {label}
      </span>

      <span className="font-medium">
        {value}
      </span>

    </div>

  );

}