import React, { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import PostCard from "./PostCard";
import "./PostFeed.css";

function PostFeed() {
  const [posts, setPosts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postData);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar bg-dark px-4 py-3 d-flex justify-content-between align-items-center">
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

      {/* FEED */}
      <div className="post-feed-container mt-4">
        <h3 className="text-center mb-4 text-white">What's New??</h3>

        {posts && posts.length > 0 ? (
          <div className="post-grid">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-light">No posts yet.</p>
        )}
      </div>
    </>
  );
}

export default PostFeed;