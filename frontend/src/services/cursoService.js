/**
 * Servicio de cursos
 */

import api from './api'

export const cursoService = {
  /**
   * Obtener todos los cursos
   */
  getAll: async () => {
    const response = await api.get('/cursos')
    return response.data
  },

  /**
   * Obtener un curso por ID
   */
  getById: async (id) => {
    const response = await api.get(`/cursos/${id}`)
    return response.data
  },

  /**
   * Crear nuevo curso
   */
  create: async (cursoData) => {
    const response = await api.post('/cursos', cursoData)
    return response.data
  },

  /**
   * Actualizar curso
   */
  update: async (id, cursoData) => {
    const response = await api.put(`/cursos/${id}`, cursoData)
    return response.data
  },

  /**
   * Eliminar curso
   */
  delete: async (id) => {
    const response = await api.delete(`/cursos/${id}`)
    return response.data
  }
}

export default cursoService
