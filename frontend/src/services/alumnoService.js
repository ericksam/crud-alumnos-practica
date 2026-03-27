/**
 * Servicio de alumnos
 */

import api from './api'

export const alumnoService = {
  /**
   * Obtener todos los alumnos
   */
  getAll: async () => {
    const response = await api.get('/alumnos')
    return response.data
  },

  /**
   * Obtener un alumno por ID
   */
  getById: async (id) => {
    const response = await api.get(`/alumnos/${id}`)
    return response.data
  },

  /**
   * Crear nuevo alumno
   */
  create: async (alumnoData) => {
    const response = await api.post('/alumnos', alumnoData)
    return response.data
  },

  /**
   * Actualizar alumno
   */
  update: async (id, alumnoData) => {
    const response = await api.put(`/alumnos/${id}`, alumnoData)
    return response.data
  },

  /**
   * Eliminar alumno
   */
  delete: async (id) => {
    const response = await api.delete(`/alumnos/${id}`)
    return response.data
  }
}

export default alumnoService
