import { useState, useEffect } from 'react';
import PlaceholderImage from "../assets/placeholder-no-image.png"
import axios from "axios"

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Dinosaurs = () => {
  const [dinos, setDinos] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const endpoint = `${baseUrl}/dinosaurs`
  
  console.log({ endpoint }, { baseUrl });
  
  useEffect(() => {
    axios.get(`${endpoint}`)
    .then((res) => {
      console.log(res)
      setDinos(res.data)
      setLoading(false)
    })
    .catch((err) => console.log(err))
  }, [])

  const Dinos = ({ dinos }) => {
    console.log({ dinos });
    const mappedPosts = dinos.map((dino, index) => {
      return (
        <div key={dino.slug + "-" + index} className="post-container">
          <h4 className="title">{dino.title.rendered}</h4>
          <div dangerouslySetInnerHTML={{ __html: dino.content.rendered }} />
          <div>Key: {dino.slug + "-" + index}</div>
          <li key={Dinos.slug + "-" + index}>
            <a href={`#/dinosaur/${dino.id}`}>Read More...</a>
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
     <h2>Dinosuars:</h2>
      <div id="dinosCont">
        {loading ? <p>Loading</p> : <Dinos dinos={dinos} />}
      </div>
    </div>
 );
}




export default Dinosaurs;