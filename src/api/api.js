import axios from 'axios';

const url =  import.meta.env.VITE_WP_API_BASEURL;

export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${url}/posts?_embed`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const fetchPost = async (id) => {
  try {
    const response = await axios.get(`${url}/posts/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}