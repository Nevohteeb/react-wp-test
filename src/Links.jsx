import React from 'react'
import { Routes, Route} from 'react-router-dom'

import Home from './components/Home'
import Post from './components/Post'

const Links = () => {
  return (
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
    </Routes>
  )
}

export default Links