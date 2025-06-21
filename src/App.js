// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Profile from "./components/Profile";
import CreatePost from "./components/CreatePost";
import PostFeed from "./components/PostFeed";


function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/feed" element={<PostFeed />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;