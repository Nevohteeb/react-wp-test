import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PlaceholderImage from "../assets/placeholder-no-image.png"

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;
console.log(baseUrl);

const Dinosaur = () => {
  const [dino, setDino] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams();
  
  const endpoint = `${baseUrl}/dinosaurs/${id}?_embed`
  
  useEffect(() => {
    axios.get(`${endpoint}`)
    .then((res) => {
      console.log(res)
      setDino(res.data)
      setLoading(false)
    })
    .catch((err) => console.log(err))
  }, [id])

  console.log(dino);

  if (loading) {
    return <>Loading...</>
  }

  
  
  return (
   <div className='container'>
      <h2>Single Post:</h2>
      <div key={dino.slug} className="post-container">
          <h4 className="title">{dino.title.rendered}</h4>
          <div dangerouslySetInnerHTML={{ __html: dino.content.rednered }} />
          <div>Key: {dino.slug}</div>
      </div>
    </div>
 );
}

export default Dinosaur;