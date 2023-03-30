import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPost } from '../api/api';

const Post = () => {
  const [post, setPost] = useState({loading: true});
  const { id } = useParams();
  

  useEffect(() => {
    console.log(id);
    const getPost = async () => {
      const singlePost = await fetchPost(id);
      setPost(singlePost);
    }
    getPost();
  }, [id]);

  if (post !== {loading: true}) {
    console.log(post);
    return (
      <div>
        <h2>{post.title.rendered}</h2>
      </div>
    );
  }

  else {
    return <div>No Post to show</div>
  }
}

export default Post;