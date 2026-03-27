/**
 * Servicio de inscripciones
 */

import api from './api'

export const inscripcionService = {
  /**
   * Obtener todas las inscripciones
   */
  getAll: async () => {
    const response = await api.get('/inscripciones')
    return response.data
  },

  /**
   * Obtener una inscripción por ID
   */
  getById: async (id) => {
    const response = await api.get(`/inscripciones/${id}`)
    return response.data
  },

  /**
   * Obtener inscripciones por curso
   */
  getByCurso: async (cursoId) => {
    const response = await api.get(`/inscripciones/curso/${cursoId}`)
    return response.data
  },

  /**
   * Obtener inscripciones por alumno
   */
  getByAlumno: async (alumnoId) => {
    const response = await api.get(`/inscripciones/alumno/${alumnoId}`)
    return response.data
  },

  /**
   * Crear nueva inscripción
   */
  create: async (inscripcionData) => {
    const response = await api.post('/inscripciones', inscripcionData)
    return response.data
  },

  /**
   * Eliminar inscripción
   */
  delete: async (id) => {
    const response = await api.delete(`/inscripciones/${id}`)
    return response.data
  }
}

export default inscripcionService
