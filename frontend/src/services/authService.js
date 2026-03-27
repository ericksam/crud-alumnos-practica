/**
 * Servicio de autenticación
 */

import api from './api'

export const authService = {
  /**
   * Registrar nuevo usuario
   */
  register: async (email, password) => {
    const response = await api.post('/auth/register', { email, password })
    return response.data
  },

  /**
   * Iniciar sesión
   */
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  }
}

export default authService
