import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConnect";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

const provider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    // nếu user chưa tồn tại trong Firestore
    if (!userSnap.exists()) {

      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
        role: "user",
        createdAt: serverTimestamp()
      });

    }

    return user;

  } catch (error) {

    console.error("Login Google error:", error);

  }
};