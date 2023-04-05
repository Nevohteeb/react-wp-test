import React from 'react';
import { useAxios } from 'use-axios-client';

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const AllPosts = () => {
  const endpoint = `${baseUrl}/posts?_embed`
  console.log(endpoint);
  const { data: posts , error, loading} = useAxios({
    url : endpoint
  })

  if (loading) return "Loading...";
  if (!posts) return "No data...";
  if (posts.length === 0) return "No results found!";
  if (error) return "Error!";
  console.log(posts)

  const renderedPosts = posts.map((post, index) => {

    const GetImageOrPlaceholder = () => {
      if (post._embedded['wp:featuredmedia']) {
          return (
              <img src={post._embedded['wp:featuredmedia']['0'].source_url} alt={post.title.rendered} />
          )
      } else {
          return (
              <img src={PlaceholderImage} alt="placeholder" />
          )
      }
    }

    return (
        <div className="post-container item-container" key={index}>
            <GetImageOrPlaceholder />
            <h4 className="title">{post.title.rendered}</h4>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
        </div>
    )
  })

  return (
    <>
      {renderedPosts}
    </>
  )
  
}

const AllDinos = () => {
  const endpoint = `${baseUrl}/dinosaurs?_embed`
  console.log(endpoint);
  const { data: dinosaurs , error, loading} = useAxios({
    url : endpoint
  })

  if (loading) return "Loading...";
  if (!dinosaurs) return "No data...";
  if (dinosaurs.length === 0) return "No results found!";
  if (error) return "Error!";
  console.log(dinosaurs)

  const renderedDinos = dinosaurs.map((dinosaur, index) => {

    const GetImageOrPlaceholder = () => {
      if (dinosaur._embedded['wp:featuredmedia']) {
          return (
              <img src={dinosaur._embedded['wp:featuredmedia']['0'].source_url} alt={dinosaur.title.rendered} />
          )
      } else {
          return (
              <img src={PlaceholderImage} alt="placeholder" />
          )
      }
    }

    return (
        <div className="post-container item-container" key={index}>
            <GetImageOrPlaceholder />
            <h4 className="title">{dinosaur.title.rendered}</h4>
            <div dangerouslySetInnerHTML={{ __html: dinosaur.excerpt.rendered }} />
        </div>
    )
  })

  return (
    <>
      {renderedDinos}
    </>
  )
  
}

const Home = () => {
  return (
    <div className='container'>
      <h2>Posts:</h2>
      <AllPosts />
      <h2>Dinosaurs:</h2>
      <AllDinos />
    </div>
  );
}

export default Home;