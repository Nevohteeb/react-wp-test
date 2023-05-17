import React from 'react'
import { Routes, Route} from 'react-router-dom'

// Import Pages
import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import Dinosaurs from './pages/Dinosaurs'
import Shopfront from './pages/shop/Shopfront'
import Checkout from './pages/shop/Checkout'
import Cart from './pages/shop/Cart'

// Import Components
import Post from './components/Post'
import Dinosaur from './components/Dinosaur'
import Product from './pages/shop/Product'

const Links = () => {
  return (
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/dinosaurs" element={<Dinosaurs />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/dinosaur/:id" element={<Dinosaur />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        {/* Shop pages */}
        <Route path="/shop" element={<Shopfront />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
    </Routes>
  )
}

export default Links