import { Routes, Route } from 'react-router'
import { HomePage } from './components/HomePage'
import { CheckOut } from './components/checkoutPage'

import './App.css'

function App() {


  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="checkout" element={<CheckOut />} />
    </Routes>

  )
}

export default App
