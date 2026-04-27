import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
if (apiBaseUrl) {
  axios.defaults.baseURL = apiBaseUrl
}

if (!window.__NMART_API_ERROR_INTERCEPTOR__) {
  window.__NMART_API_ERROR_INTERCEPTOR__ = axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error?.response?.status
      const statusText = error?.response?.statusText
      const message = status
        ? `Request failed (${status}${statusText ? ` ${statusText}` : ''}). Check backend URL and deployment settings.`
        : 'Unable to connect to the server. Check your network or backend deployment.'

      window.dispatchEvent(new CustomEvent('nmart-api-error', { detail: message }))
      return Promise.reject(error)
    }
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

