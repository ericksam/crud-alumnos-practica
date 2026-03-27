/**
 * Auth Context
 * Maneja el estado de autenticación global con JWT
 */

import { createContext, useContext, useState, useEffect } from 'react'
import authService from '../services/authService'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  // Verificar si hay sesión al cargar
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser && token) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [token])

  /**
   * Registrar usuario
   */
  const register = async (email, password) => {
    const data = await authService.register(email, password)
    // El registro no hace login automático
    return data
  }

  /**
   * Iniciar sesión
   */
  const login = async (email, password) => {
    const data = await authService.login(email, password)
    
    if (data.success && data.data) {
      const { user: userData, token: userToken } = data.data
      
      // Guardar en localStorage
      localStorage.setItem('token', userToken)
      localStorage.setItem('user', JSON.stringify(userData))
      
      // Actualizar estado
      setToken(userToken)
      setUser(userData)
    }
    
    return data
  }

  /**
   * Cerrar sesión
   */
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  /**
   * Verificar si está autenticado
   */
  const isAuthenticated = !!token

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    register,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}

export default AuthContext
