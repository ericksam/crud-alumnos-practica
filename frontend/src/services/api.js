/**
 * Servicio API con Axios
 * Configura interceptors para JWT y manejo de errores
 */

import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Crear instancia de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor - agregar token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - manejar errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el backend retorna errores estructurados
    if (error.response?.data) {
      return Promise.reject(error.response.data)
    }
    
    // Errores de red o otros
    return Promise.reject({
      success: false,
      message: error.message || 'Error de conexión',
      errors: []
    })
  }
)

export default api
