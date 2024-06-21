// src/App.js
import React, { useState, useEffect } from "react";
import Header from "./Header";
import PostForm from "./PostForm";
import PostList from "./PostList";
import "./App.css"; // Importuje CSS soubor

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts"));
    if (storedPosts) {
      setPosts(storedPosts);
    }
  }, []);

  const addPost = (post) => {
    const newPosts = [post, ...posts];
    setPosts(newPosts);
    localStorage.setItem("posts", JSON.stringify(newPosts));
  };

  return (
    <div className="App">
      <Header />
      <PostForm addPost={addPost} />
      <PostList posts={posts} />
    </div>
  );
}

export default App;
