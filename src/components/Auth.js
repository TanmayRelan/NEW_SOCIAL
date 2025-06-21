import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, googleProvider } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        navigate("/feed"); // redirect to feed
      } else {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", userCred.user.uid), {
          email,
          name: "",
          bio: "",
          avatar: `https://avatars.dicebear.com/api/initials/${email}.svg`,
        });
        navigate("/profile"); // redirect to profile setup
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const userCred = await signInWithPopup(auth, googleProvider);
      const userRef = doc(db, "users", userCred.user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        // New Google user
        await setDoc(userRef, {
          email: userCred.user.email,
          name: userCred.user.displayName || "",
          bio: "",
          avatar: userCred.user.photoURL || `https://avatars.dicebear.com/api/initials/${userCred.user.email}.svg`,
        });
        navigate("/profile");
      } else {
        navigate("/feed");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-header">
        <h1 className="app-title">🔗 THE NEW SOCIAL</h1>
        <p className="app-quote">"Where every thought sparks a connection."</p>
      </div>

      <form onSubmit={handleEmailAuth} className="auth-form">
        <h2 className="text-center mb-3">{isLogin ? "Login" : "Create Account"}</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-glow w-100 mb-2">
          {isLogin ? "Login" : "Create Account"}
        </button>

        <button
          type="button"
          className="btn btn-outline-light w-100 mb-3"
          onClick={handleGoogleSignIn}
        >
          Sign In with Google
        </button>

        <p className="mt-2 text-center switch-link">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Sign up" : " Login"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default Auth;