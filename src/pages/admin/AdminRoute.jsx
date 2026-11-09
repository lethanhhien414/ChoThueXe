import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConnect";// đối tượng
import { useEffect, useState } from "react";

export default function AdminRoute({ children }) {//bao quanh các trang của admin
  const [loading, setLoading] = useState(true);
  const [allow, setAllow] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      // Chưa đăng nhập → cấm
      if (!user) {
        setAllow(false);
        setLoading(false);
        return;
      }
      //Kiểm tra role
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists() && snap.data().role === "admin") {
        setAllow(true);
      } else {
        setAllow(false);
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Đang kiểm tra quyền truy cập...</p>
      </div>
    );
  }

  // Không đủ quyền → về HOME (chưa đăng nhập)
  if (!allow) {
    return <Navigate to="/" replace />;
  }

  // OK → cho vào admin
  return children;
}
