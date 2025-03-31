// blog-frontend/src/components/PostForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function PostForm() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/api/blogposts/${id}`)
        .then(response => {
          setTitle(response.data.title);
          setContent(response.data.content);
        })
        .catch(error => console.error('Error fetching post:', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = { title, content };
    const request = id ? axios.put(`http://localhost:8080/api/blogposts/${id}`, postData) : axios.post('/api/blogposts', postData);
    request.then(() => navigate('/')).catch(error => console.error('Error saving post:', error));
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
      <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} style={{ padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
      <button type="submit" style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Save</button>
    </form>
  );
}

export default PostForm;