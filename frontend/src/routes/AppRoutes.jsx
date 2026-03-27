/**
 * AppRoutes - Configuración de rutas
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PrivateRoute from './PrivateRoute'

// Páginas
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import DashboardPage from '../pages/DashboardPage'
import AlumnosPage from '../pages/AlumnosPage'
import AulasPage from '../pages/AulasPage'
import CursosPage from '../pages/CursosPage'
import InscripcionesPage from '../pages/InscripcionesPage'
import Navbar from '../components/layout/Navbar'

const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth()

  // Mientras carga, mostrar nada
  if (loading) {
    return null
  }

  return (
    <BrowserRouter>
      {isAuthenticated && <Navbar />}
      
      <Routes>
        {/* Rutas públicas */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
          } 
        />
        <Route 
          path="/register" 
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />
          } 
        />

        {/* Rutas protegidas */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/alumnos"
          element={
            <PrivateRoute>
              <AlumnosPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/aulas"
          element={
            <PrivateRoute>
              <AulasPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/cursos"
          element={
            <PrivateRoute>
              <CursosPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/inscripciones"
          element={
            <PrivateRoute>
              <InscripcionesPage />
            </PrivateRoute>
          }
        />

        {/* Redirección por defecto */}
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />}
        />
        
        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="container mt-5 text-center">
              <h1>404 - Página no encontrada</h1>
              <a href="/" className="btn btn-primary">Volver al inicio</a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
