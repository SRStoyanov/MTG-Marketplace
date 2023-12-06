import { useState } from "react";
// import { auth } from '../../firebase';
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User registered:", userCredential.user);
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
