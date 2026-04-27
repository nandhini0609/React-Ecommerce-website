import { Routes, Route, useLocation } from 'react-router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { HomePage } from './pages/HomePage'
import { CheckOut } from './pages/checkoutPage'
import { OrdersPage } from './pages/OrdersPage'
import { TrackingPage } from './pages/TrackingPage'
import './App.css'

function App() {
  const [cart, setCart] = useState([]);
  const [apiError, setApiError] = useState('');
  const location = useLocation();
  //asyn await 
  const loadCart = () => {
    return axios.get('/api/cart-items?expand=product')
      .then((response) => {
        const cartItems = Array.isArray(response.data) ? response.data : []
        setCart(cartItems);
      });
  }

  useEffect(() => {
    loadCart().catch(() => {
      // Handled by global interceptor.
    });
  }, [])

  useEffect(() => {
    const onApiError = (event) => {
      const message = event?.detail || 'Something went wrong while loading data.'
      setApiError(message)
    }

    window.addEventListener('nmart-api-error', onApiError)
    return () => {
      window.removeEventListener('nmart-api-error', onApiError)
    }
  }, [])

  const handleRetry = () => {
    setApiError('')

    if (location.pathname === '/' || location.pathname === '/checkout') {
      loadCart().catch(() => {
        // Handled by global interceptor.
      })
    }

    window.dispatchEvent(new CustomEvent('nmart-api-retry', {
      detail: { path: location.pathname }
    }))
  }

  // useEffect(() => {

  //   axios.get('/api/cart-items?expand=product')
  //     .then((response) => {
  //       setCart(response.data);
  //     })
  // }, [])


  return (
    <>
      {apiError && (
        <div className="api-error-banner" role="alert">
          <span>{apiError}</span>
          <div className="api-error-banner-actions">
            <button
              type="button"
              className="api-error-banner-retry"
              onClick={handleRetry}
            >
              Retry
            </button>
            <button
              type="button"
              className="api-error-banner-close"
              onClick={() => setApiError('')}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
      <Routes>
        <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
        <Route path="checkout" element={<CheckOut cart={cart} loadCart={loadCart} />} />
        <Route path="orders" element={<OrdersPage cart={cart} />} />
        <Route path="tracking" element={<TrackingPage />} />
      </Routes>
    </>
  )
}

export default App


//to avoid loading we must use props