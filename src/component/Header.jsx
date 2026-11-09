import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConnect";
import { Link } from "react-router-dom";
import Logo from "../img/hinh1.png";
import LoginModal from "./LoginModal";

export default function Header() {
  const [user, setUser] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);

  useEffect(() => {
  const unsub = onAuthStateChanged(auth, (u) => {
    console.log("PHOTO:", u?.photoURL);
    setUser(u);
  });

  return () => unsub();
}, []);

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <img src={Logo} className="w-9" />
            <span className="font-bold text-xl text-yellow-500">
              SmartRide
            </span>
          </div>

          {/* MENU */}
          <nav className="flex items-center gap-8 text-gray-700 font-medium">
            <Link to="/">Trang chủ</Link>
            <Link to="/vehicles">Loại xe</Link>
            <Link to="/locations">Địa điểm</Link>
            <Link to="/contact">Liên hệ</Link>

            {user && <Link to="/my-booking">Xe thuê</Link>}

            {!user ? (
              <button
                onClick={() => setOpenLogin(true)}
                className="bg-yellow-400 px-5 py-2 rounded-lg font-semibold hover:bg-yellow-500"
              >
                Đăng nhập
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/profile">
                  <img
                    src={
                      user?.photoURL
                        ? user.photoURL
                        : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="avatar"
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-full object-cover cursor-pointer"
                  />
                </Link>

              </div>
            )}
          </nav>
        </div>
      </header>

      {/* LOGIN MODAL */}
      {openLogin && (
        <LoginModal onClose={() => setOpenLogin(false)} />
      )}
    </>
  );
}