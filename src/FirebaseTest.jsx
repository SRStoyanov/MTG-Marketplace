// FirebaseTest.jsx
import { useEffect } from "react";
import { auth } from "../firebase";

const FirebaseTest = () => {
  useEffect(() => {
    const checkFirebaseConfig = async () => {
      try {
        const user = auth.currentUser;
        console.log("Firebase Configuration is set up properly:", user);
      } catch (error) {
        console.error("Firebase Configuration Error:", error);
      }
    };

    checkFirebaseConfig();
  }, []);

  return <div>Checking Firebase Configuration...</div>;
};

export default FirebaseTest;
