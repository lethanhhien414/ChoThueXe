import { useState } from "react";
import zaloQR from "../img/zaloQR.png";

export default function ZaloButton() {

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ===== NÚT ZALO ===== */}
      <div className="fixed bottom-6 right-6 z-50">

        {/* QR BOX */}
        {open && (
          <div className="mb-3 bg-white shadow-xl rounded-2xl p-4 w-64 animate-fadeIn">

            <p className="font-semibold text-center mb-2">
              Liên hệ Zalo
            </p>

            <img
              src={zaloQR}
              alt="Zalo QR"
              className="rounded-lg"
            />

            <a
              href="https://zalo.me/0915208414"
              target="_blank"
              className="block mt-3 text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Nhắn tin ngay
            </a>

          </div>
        )}

        {/* ICON */}
        <button
          onClick={() => setOpen(!open)}
          className="w-14 h-14 rounded-full bg-blue-500 shadow-lg flex items-center justify-center animate-bounce"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
            alt="zalo"
            className="w-8"
          />
        </button>

      </div>
    </>
  );
}