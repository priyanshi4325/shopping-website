import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Cart from './pages/Cart'
import { Route,Routes } from 'react-router-dom'


function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/shopping-website' element={<Home/>}/>
      <Route path='shopping-website/cart' element={<Cart/>}/>
      </Routes>
    </>
  )
}

export default App
