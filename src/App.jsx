import { Routes, Route } from 'react-router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { HomePage } from './pages/HomePage'
import { CheckOut } from './pages/checkoutPage'
import { OrdersPage } from './pages/OrdersPage'
import { TrackingPage } from './pages/TrackingPage'
import './App.css'

function App() {
  const [cart, setCart] = useState([]);
  //asyn await 
  const loadCart = () => {
    return axios.get('/api/cart-items?expand=product')
      .then((response) => {
        setCart(response.data);
      });
  }

  useEffect(() => {
    void loadCart();
  }, [])

  // useEffect(() => {

  //   axios.get('/api/cart-items?expand=product')
  //     .then((response) => {
  //       setCart(response.data);
  //     })
  // }, [])


  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route path="checkout" element={<CheckOut cart={cart} loadCart={loadCart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route path="tracking" element={<TrackingPage />} />
    </Routes>

  )
}

export default App


//to avoid loading we must use props