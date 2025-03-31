// blog-frontend/src/components/PostDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/blogposts/${id}`)
      .then(response => setPost(response.data))
      .catch(error => console.error('Error fetching post:', error));
  }, [id]);

  const handleDelete = () => {
    axios.delete(`/api/blogposts/${id}`)
      .then(() => navigate('/'))
      .catch(error => console.error('Error deleting post:', error));
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <Link to={`/edit/${post.id}`} style={{ marginRight: '10px', textDecoration: 'none', color: '#007bff' }}>Edit</Link>
      <button onClick={handleDelete} style={{ padding: '8px 15px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
      <Link to="/" style={{ display: 'block', marginTop: '20px', textDecoration: 'none', color: '#007bff' }}>Back to List</Link>
    </div>
  );
}

export default PostDetails;
