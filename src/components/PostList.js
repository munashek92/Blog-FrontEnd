// blog-frontend/src/components/PostList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/blogposts')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div>
      <h2>Blog Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id} style={{ marginBottom: '10px' }}>
            <Link to={`/posts/${post.id}`} style={{ textDecoration: 'none', color: '#007bff' }}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/create" style={{ display: 'inline-block', padding: '10px 20px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
        Create New Post
      </Link>
    </div>
  );
}

export default PostList;