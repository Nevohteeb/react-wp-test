import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../api/api';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const allPosts = await fetchPosts();
      setPosts(allPosts);
    }
    getPosts();
  }, []);

  return (
    <div>
      <h2>Recent Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <a href={`/#/post/${post.id}`}>{post.title.rendered}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;