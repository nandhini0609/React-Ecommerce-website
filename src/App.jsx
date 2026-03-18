import { Routes, Route } from 'react-router'
import { HomePage } from './components/HomePage'

import './App.css'

function App() {


  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="checkout" element={<h1>Checkout</h1>} />
    </Routes>

  )
}

export default App
