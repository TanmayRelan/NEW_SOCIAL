import React from "react";
import { db } from "../firebase";
import { doc, updateDoc, increment } from "firebase/firestore";
import "./PostCard.css";
import "../styles.css";

function PostCard({ post }) {
  const handleLike = async () => {
    const postRef = doc(db, "posts", post.id);
    await updateDoc(postRef, {
      likes: increment(1)
    });
  };

  let formattedDate = "Just now";
  if (post.createdAt && typeof post.createdAt.toDate === "function") {
    formattedDate = post.createdAt.toDate().toLocaleString();
  }
  

  return (
    <div className="post-card-gradient-wrapper mb-4">
      <div className="post-card">
        <div className="d-flex align-items-center mb-2">
          <img
            src={post.avatar}
            alt="avatar"
            className="post-avatar me-2"
          />
          <div>
            <strong>{post.userName}</strong>
            <div className="text-muted" style={{ fontSize: "0.8rem" }}>{formattedDate}</div>
          </div>
        </div>
        <p>{post.content}</p>
        <button className="btn btn-outline-light btn-sm" onClick={handleLike}>
          ❤️ LIKES({post.likes})
        </button>
      </div>
    </div>
  );
}

export default PostCard;