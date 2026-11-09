import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  CLOUDINARY_UPLOAD_URL,
  CLOUDINARY_UPLOAD_PRESET
} from "../../firebase/cloudinaryConfig";

export default function UploadDocument() {

  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state;

  const [front,setFront] = useState(null);
  const [back,setBack] = useState(null);

  const [frontPreview,setFrontPreview] = useState(null);
  const [backPreview,setBackPreview] = useState(null);

  const [loading,setLoading] = useState(false);

  // nếu không có dữ liệu booking
  if(!state){
    return(
      <div className="text-center py-20">
        Không có dữ liệu đặt xe
      </div>
    )
  }

  // upload ảnh lên cloudinary
  const uploadImage = async (file)=>{

    const formData = new FormData();

    formData.append("file",file);
    formData.append("upload_preset",CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(CLOUDINARY_UPLOAD_URL,{
      method:"POST",
      body:formData
    });

    const data = await res.json();

    return data.secure_url;

  }

  const handleNext = async ()=>{

    if(!front || !back){
      alert("Vui lòng upload CCCD");
      return;
    }

    try{

      setLoading(true);

      const frontUrl = await uploadImage(front);
      const backUrl = await uploadImage(back);

      // giữ nguyên dữ liệu booking
      const bookingData = {
        ...state,
        cccdFront: frontUrl,
        cccdBack: backUrl
      };

      navigate("/payment",{
        state: bookingData
      });

    }catch(err){

      console.log(err);
      alert("Upload thất bại");

    }finally{

      setLoading(false);

    }

  }

  return (

<div className="bg-gray-100 min-h-screen py-16">

  <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10">

    <h1 className="text-3xl font-bold text-center mb-2">
      Xác minh danh tính
    </h1>

    <p className="text-center text-gray-500 mb-10">
      Vui lòng tải lên CCCD để hoàn tất quá trình thuê xe
    </p>

    <div className="grid md:grid-cols-2 gap-10">

      {/* FRONT */}

      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-yellow-500 transition">

        <p className="font-semibold mb-3">
          CCCD mặt trước
        </p>

        {frontPreview ? (

          <img
            src={frontPreview}
            className="h-48 mx-auto object-contain rounded-xl mb-4"
          />

        ) : (

          <div className="text-gray-400 mb-4">

            <div className="text-5xl mb-2">
              📷
            </div>

            <p>Chọn hoặc kéo ảnh vào đây</p>

          </div>

        )}

        <input
          type="file"
          accept="image/*"
          className="mt-3"
          onChange={(e)=>{

            const file = e.target.files[0];

            if(!file) return;

            setFront(file);
            setFrontPreview(URL.createObjectURL(file));

          }}
        />

      </div>

      {/* BACK */}

      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-yellow-500 transition">

        <p className="font-semibold mb-3">
          CCCD mặt sau
        </p>

        {backPreview ? (

          <img
            src={backPreview}
            className="h-48 mx-auto object-contain rounded-xl mb-4"
          />

        ) : (

          <div className="text-gray-400 mb-4">

            <div className="text-5xl mb-2">
              📷
            </div>

            <p>Chọn hoặc kéo ảnh vào đây</p>

          </div>

        )}

        <input
          type="file"
          accept="image/*"
          className="mt-3"
          onChange={(e)=>{

            const file = e.target.files[0];

            if(!file) return;

            setBack(file);
            setBackPreview(URL.createObjectURL(file));

          }}
        />

      </div>

    </div>

    {/* BUTTON */}

    <div className="text-center mt-12">

      <button
        onClick={handleNext}
        disabled={loading}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-12 py-4 rounded-xl font-semibold text-lg shadow-md transition"
      >

        {loading ? "Đang upload..." : "Tiếp tục"}

      </button>

      <p className="text-gray-400 text-sm mt-4">
        🔒 Thông tin của bạn được bảo mật tuyệt đối
      </p>

    </div>

  </div>

</div>

)
}