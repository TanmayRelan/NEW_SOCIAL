import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css";
import "./Profile.css";

function CreatePost() {
  const [user, setUser] = useState(null);
  const [postContent, setPostContent] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUser({ id: currentUser.uid, ...userDoc.data() });
        }
      }
    });

    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handlePost = async () => {
    if (!postContent.trim()) {
      alert("Post content cannot be empty!");
      return;
    }

    if (!user) return;

    await addDoc(collection(db, "posts"), {
      content: postContent,
      userId: user.id,
      userName: user.name,
      avatar: user.avatar,
      createdAt: serverTimestamp(),
      likes: 0,
    });

    setPostContent("");
    alert("Post published!");
    navigate("/feed"); 
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar bg-dark px-4 py-3 d-flex justify-content-between align-items-center">
        <h4 className="text-purple fw-bold m-0">🚀 THE NEW SOCIAL</h4>

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
                  navigate("/profile");
                  setMenuOpen(false);
                }}
              >
                ✏️ Edit Profile
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
                onClick={handleLogout}
              >
                🔒 Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* POST CREATOR */}
      <div className="create-post-container">
        <div className="create-post-box">
          <h2 className="post-title">✨ Share Something Awesome</h2>
          <textarea
            className="post-textarea"
            rows="5"
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
          <button className="post-button" onClick={handlePost}>
            🚀 Publish Post
          </button>
        </div>
      </div>
    </>
  );
}

export default CreatePost;