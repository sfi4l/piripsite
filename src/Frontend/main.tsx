import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'antd/dist/reset.css'
import Layout from './components/Layout.tsx'
import Home from './pages/Home.tsx'
import Catalog from './pages/Catalog.tsx'
import Cart from './pages/Cart.tsx'
import About from './pages/About.tsx'
import Profile from './pages/Profile.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </StrictMode>,
)
