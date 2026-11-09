import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConnect";
import { useNavigate } from "react-router-dom";

export default function AddVehicle() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: "",
    brand: "",
    model: "",
    color: "",
    kind: "",
    price: "",
    rental: "",
    description: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  /* VALIDATION */

  const validateForm = () => {

    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Vui lòng nhập tên xe";
    }

    if (!form.brand.trim()) {
      newErrors.brand = "Vui lòng nhập hãng xe";
    }

    if (!form.price) {
      newErrors.price = "Vui lòng nhập giá thuê";
    } else if (isNaN(form.price)) {
      newErrors.price = "Giá phải là số";
    }

    if (!image) {
      newErrors.image = "Vui lòng chọn ảnh xe";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* SUBMIT */

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) return;

    try {

      setLoading(true);

      /* Upload Cloudinary */

      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "product_upload");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/djkqh8tbr/image/upload",
        {
          method: "POST",
          body: data
        }
      );

      const file = await res.json();
console.log(file);

      const imageUrl = file.secure_url;

      /* Save Firestore */

      await addDoc(collection(db, "vehicles"), {

        name: form.name,
        brand: form.brand,
        model: form.model,
        color: form.color,
        kind: form.kind,
        price: Number(form.price),
        rental: form.rental,
        description: form.description,
        picture: [imageUrl],
        status: "available",
        featured: false

      });

      alert("Thêm xe thành công");

      navigate("/admin/vehicles");

    } catch (err) {

      console.log(err);
      alert("Upload lỗi");

    }

    setLoading(false);

  };

  return (

    <div className="max-w-5xl mx-auto">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-2xl font-bold">
            Thêm xe máy mới
          </h2>

          <p className="text-gray-500 text-sm">
            Điền đầy đủ thông tin để thêm xe vào hệ thống
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Đang lưu..." : "Lưu xe"}
        </button>

      </div>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow"
      >

        <h3 className="font-semibold mb-4 text-lg">
          Thông tin cơ bản
        </h3>

        <div className="grid grid-cols-2 gap-5">

          {/* NAME */}

          <div>
            <label className="text-sm font-medium">
              Tên xe *
            </label>

            <input
              name="name"
              placeholder="Ví dụ: Honda Wave Alpha"
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2"
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* BRAND */}

          <div>
            <label className="text-sm font-medium">
              Hãng xe *
            </label>

            <input
              name="brand"
              placeholder="Honda / Yamaha"
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2"
            />

            {errors.brand && (
              <p className="text-red-500 text-sm mt-1">
                {errors.brand}
              </p>
            )}
          </div>

          {/* MODEL */}

          <div>
            <label className="text-sm font-medium">
              Model
            </label>

            <input
              name="model"
              placeholder="Wave Alpha 110cc"
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2"
            />
          </div>

          {/* COLOR */}

          <div>
            <label className="text-sm font-medium">
              Màu sắc
            </label>

            <input
              name="color"
              placeholder="Đen / Đỏ"
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2"
            />
          </div>

          {/* KIND */}

          <div>
            <label className="text-sm font-medium">
              Loại xe
            </label>

            <input
              name="kind"
              placeholder="Xe số / Tay ga"
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2"
            />
          </div>

          {/* PRICE */}

          <div>
            <label className="text-sm font-medium">
              Giá thuê/ngày *
            </label>

            <input
              name="price"
              type="number"
              min="0"
              placeholder="100000"
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2"
            />

            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price}
              </p>
            )}
          </div>

          {/* RENTAL */}

          <div>
            <label className="text-sm font-medium">
              Vị trí
            </label>

            <input
              name="rental"
              placeholder="Đà Nẵng"
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2"
            />
          </div>

          {/* IMAGE */}

          <div>
            <label className="text-sm font-medium">
              Ảnh xe *
            </label>

            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                setImage(file);
                setPreview(URL.createObjectURL(file));
              }}
              className="w-full mt-1 border rounded-lg px-3 py-2"
            />

            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image}
              </p>
            )}

            {preview && (
              <img
                src={preview}
                className="mt-3 w-40 rounded-lg border"
              />
            )}
          </div>

        </div>

        {/* DESCRIPTION */}

        <div className="mt-5">

          <label className="text-sm font-medium">
            Mô tả chi tiết
          </label>

          <textarea
            name="description"
            placeholder="Mô tả chi tiết về xe..."
            onChange={handleChange}
            className="w-full mt-1 border rounded-lg px-3 py-3"
            rows="4"
          />

        </div>

      </form>

      {/* NOTE */}

      <div className="mt-6 bg-yellow-200 text-yellow-900 p-4 rounded-lg">
        <b>Lưu ý khi thêm xe mới</b>
        <p className="text-sm">
          Điền đầy đủ thông tin để xe hiển thị chính xác trong hệ thống.
        </p>
      </div>

    </div>
  );
}