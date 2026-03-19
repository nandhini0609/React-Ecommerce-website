import { Routes, Route } from 'react-router'
import { HomePage } from './components/HomePage'
import { CheckOut } from './components/checkoutPage'
import { OrdersPage } from './components/OrdersPage'
import './App.css'

function App() {


  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="checkout" element={<CheckOut />} />
      <Route path="orders" element={<OrdersPage />} />
    </Routes>

  )
}

export default App
