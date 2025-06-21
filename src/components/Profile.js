import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import {
  onAuthStateChanged,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signOut
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import "../styles.css";

const predefinedAvatars = [
  "https://avatars.githubusercontent.com/u/1?v=4",
  "https://avatars.githubusercontent.com/u/2?v=4",
  "https://avatars.githubusercontent.com/u/3?v=4",
  "https://avatars.githubusercontent.com/u/4?v=4",
  "https://avatars.githubusercontent.com/u/5?v=4",
];

function Profile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!formData.name || !formData.bio || !formData.avatar) {
      alert("Please fill out all fields: name, bio, and avatar.");
      return;
    }

    if (!user) return;

    const docRef = doc(db, "users", user.uid);
    await updateDoc(docRef, formData);
    alert("Profile updated!");
  };

  const handleDeleteProfile = async () => {
    if (!user) return;

    const confirmDelete = window.confirm("Are you sure you want to delete your profile? This cannot be undone.");
    if (!confirmDelete) return;

    const password = prompt("Please re-enter your password to confirm:");

    if (!password) {
      alert("Password required for deletion.");
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(auth.currentUser);

      alert("Your profile has been deleted.");
      navigate("/");
    } catch (error) {
      alert("Error deleting profile: " + error.message);
    }
  };

  if (loading) {
    return <div className="text-center text-light mt-5">Loading profile...</div>;
  }

  return (
    <div className="profile-container mt-3">
      {/* NAVBAR */}
      <nav className="navbar bg-dark px-4 py-3 d-flex justify-content-between align-items-center mb-4">
        <span className="navbar-brand text-purple fw-bold m-0">🔗 THE NEW SOCIAL</span>

        <div className="position-relative">
          <button
            className="btn btn-outline-light"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            ☰
          </button>

          {menuOpen && (
            <div className="dropdown-menu show position-absolute end-0 mt-2 p-2 bg-dark border rounded shadow">
              <button
                className="btn btn-outline-light w-100 mb-2"
                onClick={() => {
                  navigate("/feed");
                  setMenuOpen(false);
                }}
              >
                📃 Go to Feed
              </button>
              <button
                className="btn btn-outline-light w-100 mb-2"
                onClick={() => {
                  navigate("/create-post");
                  setMenuOpen(false);
                }}
              >
                ➕ Create Post
              </button>
              <button
                className="btn btn-danger w-100"
                onClick={async () => {
                  await signOut(auth);
                  navigate("/");
                }}
              >
                🔒 Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      <h2 className="text-center mb-4 gold-text"style={{ color: "gold" }}>Edit Profile</h2>

      <div className="text-center">
        <img
          src={formData.avatar || "https://via.placeholder.com/100"}
          alt="Avatar"
          className="profile-avatar"
        />
      </div>

      <div className="form-group mb-3">
        <label>Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group mb-3">
        <label>Bio</label>
        <textarea
          name="bio"
          className="form-control"
          rows="3"
          value={formData.bio}
          onChange={handleChange}
        />
      </div>

      <div className="form-group mb-3">
        <label>Choose Avatar</label>
        <div className="d-flex flex-wrap gap-2 mb-2">
          {predefinedAvatars.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`avatar-${index}`}
              className={`profile-avatar-option ${formData.avatar === url ? "selected-avatar" : ""}`}
              onClick={() => setFormData({ ...formData, avatar: url })}
            />
          ))}
        </div>

        <label>Or paste custom avatar URL</label>
        <input
          type="text"
          name="avatar"
          className="form-control"
          value={formData.avatar}
          onChange={handleChange}
        />
      </div>

      <button className="btn btn-primary w-100" onClick={handleSave}>
        Save Profile
      </button>

      <button className="btn btn-danger w-100 mt-2" onClick={handleDeleteProfile}>
        🗑️ Delete Profile
      </button>
    </div>
  );
}

export default Profile;