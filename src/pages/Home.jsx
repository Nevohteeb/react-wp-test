import { useState, useEffect } from 'react';
import axios from "axios"

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Home = () => {
  const [posts, setPosts] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const endpoint = `${baseUrl}/posts?_embed`
  
  console.log({ endpoint }, { baseUrl });
  
  useEffect(() => {
    axios.get(`${endpoint}`)
    .then((res) => {
      console.log(res)
      setPosts(res.data)
      setLoading(false)
    })
    .catch((err) => console.log(err))
  }, [])

  const Posts = ({ posts }) => {
    console.log({ posts });
    const mappedPosts = posts.map((post, index) => {
      return (
        <div key={post.slug + "-" + index} className="post-container">
          <h4 className="title">{post.title.rendered}</h4>
          <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          <div>Key: {post.slug + "-" + index}</div>
          <li key={post.slug + "-" + index}>
            <a href={`#/post/${post.id}`}>Read More...</a>
          </li>
        </div>
      )
    })
    
    console.log({ mappedPosts });
    
    return (
      <>
        {/* All our posts are here! */}
        {mappedPosts}
      </>
    )
  }
  
  return (
   <div className='container' >
     <h2>Posts:</h2>
      <div id="homeCont">
        {loading ? <p>Loading</p> : <Posts posts={posts} />}
      </div>
    </div>
 );
}




export default Home;