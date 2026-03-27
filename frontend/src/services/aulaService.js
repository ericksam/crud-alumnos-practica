/**
 * Servicio de aulas
 */

import api from './api'

export const aulaService = {
  /**
   * Obtener todas las aulas
   */
  getAll: async () => {
    const response = await api.get('/aulas')
    return response.data
  },

  /**
   * Obtener un aula por ID
   */
  getById: async (id) => {
    const response = await api.get(`/aulas/${id}`)
    return response.data
  },

  /**
   * Crear nueva aula
   */
  create: async (aulaData) => {
    const response = await api.post('/aulas', aulaData)
    return response.data
  },

  /**
   * Actualizar aula
   */
  update: async (id, aulaData) => {
    const response = await api.put(`/aulas/${id}`, aulaData)
    return response.data
  },

  /**
   * Eliminar aula
   */
  delete: async (id) => {
    const response = await api.delete(`/aulas/${id}`)
    return response.data
  }
}

export default aulaService
