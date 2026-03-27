/**
 * DashboardPage - Panel principal
 */

import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import alumnoService from '../services/alumnoService'
import aulaService from '../services/aulaService'
import cursoService from '../services/cursoService'
import inscripcionService from '../services/inscripcionService'

const DashboardPage = () => {
  const { user } = useAuth()
  
  // Estados para estadísticas
  const [stats, setStats] = useState({
    alumnos: 0,
    aulas: 0,
    cursos: 0,
    inscripciones: 0
  })
  const [loading, setLoading] = useState(true)

  // Cargar estadísticas
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [alumRes, aulaRes, curRes, inscrRes] = await Promise.all([
          alumnoService.getAll(),
          aulaService.getAll(),
          cursoService.getAll(),
          inscripcionService.getAll()
        ])
        
        setStats({
          alumnos: alumRes.data?.length || 0,
          aulas: aulaRes.data?.length || 0,
          cursos: curRes.data?.length || 0,
          inscripciones: inscrRes.data?.length || 0
        })
      } catch (err) {
        console.error('Error cargando estadísticas:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="page-container fade-in">
      <div className="mb-4">
        <h1 className="mb-2">Bienvenido, {user?.email}</h1>
        <p className="text-muted">Panel de gestión académica</p>
      </div>

      {/* Estadísticas */}
      {loading ? (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <div className="card bg-primary text-white">
              <div className="card-body text-center">
                <h2 className="mb-0">{stats.alumnos}</h2>
                <small>Alumnos</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-info text-white">
              <div className="card-body text-center">
                <h2 className="mb-0">{stats.aulas}</h2>
                <small>Aulas</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-success text-white">
              <div className="card-body text-center">
                <h2 className="mb-0">{stats.cursos}</h2>
                <small>Cursos</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-warning text-white">
              <div className="card-body text-center">
                <h2 className="mb-0">{stats.inscripciones}</h2>
                <small>Inscripciones</small>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <h3 className="mb-3">👨‍🎓</h3>
              <h5 className="card-title">Alumnos</h5>
              <p className="card-text text-muted">
                Gestionar alumnos del sistema
              </p>
              <Link to="/alumnos" className="btn btn-primary">
                Ir a Alumnos
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <h3 className="mb-3">🏫</h3>
              <h5 className="card-title">Aulas</h5>
              <p className="card-text text-muted">
                Administrar aulas disponibles
              </p>
              <Link to="/aulas" className="btn btn-primary">
                Ir a Aulas
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <h3 className="mb-3">📚</h3>
              <h5 className="card-title">Cursos</h5>
              <p className="card-text text-muted">
                Gestionar cursos disponibles
              </p>
              <Link to="/cursos" className="btn btn-primary">
                Ir a Cursos
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <h3 className="mb-3">📝</h3>
              <h5 className="card-title">Inscripciones</h5>
              <p className="card-text text-muted">
                Inscribir alumnos a cursos
              </p>
              <Link to="/inscripciones" className="btn btn-primary">
                Ir a Inscripciones
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Guía rápida</h5>
            </div>
            <div className="card-body">
              <ul className="mb-0">
                <li>Registrate e iniciá sesión para acceder al sistema</li>
                <li>Desde el panel podés gestionar alumnos, aulas y cursos</li>
                <li>Cada alumno puede pertenecer a un aula</li>
                <li>Los cursos permiten inscribir alumnos</li>
                <li>Las inscripciones relacionan alumnos con cursos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
