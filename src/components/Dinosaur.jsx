import React from 'react';
import { useAxios } from "use-axios-client";
import { useParams } from 'react-router-dom';
import PlaceholderImage from "../assets/placeholder-no-image.png"

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;
console.log(baseUrl);

const RenderedDinosaur = () => {
  const { id } = useParams();
  
  const endpoint = `${baseUrl}/dinosaurs/${id}?_embed`

  console.log(endpoint);

  const { data : dinosaur, error, loading } = useAxios({
      url: endpoint
  })

  // Check State of dinosaur
  if (loading) return "Loading...";
  if (!dinosaur) return "No data...";
  if (dinosaur.length === 0) return "No results found!";
  if (error) return "Error!";
  console.log(dinosaur)

  const GetImageorPlaceholder = () => {
      if (dinosaur._embedded['wp:featuredmedia']) {
          return (
            <img src={dinosaur._embedded['wp:featuredmedia']['0'].source_url} alt={dinosaur.title.rendered}/>
            )
      } else {
          return (
            <img src={PlaceholderImage} alt="placeholder" />
          )
      }
  }

  return (
      <div>
        <h2>{dinosaur.title.rendered}</h2>
        <GetImageorPlaceholder />
        <div dangerouslySetInnerHTML={{ __html: dinosaur.content.rendered }} />
      </div>
    );
  
}

const Dinosaur = () => {
    return (
        <div className='container'>
            <RenderedDinosaur />
        </div>
    )
}

export default Dinosaur;