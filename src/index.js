import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'

import { useAuth } from './contexts/AuthContext'

import App from './App'
import ThemeProvider from './contexts/ThemeContext'
import AuthProvider from './contexts/AuthContext'
import Layout from './components/Layout'
import Login from './pages/Login'

const root = ReactDOM.createRoot(document.getElementById('root'))

const RequireAuth = ({ children }) => {
    const { user } = useAuth()
    if (!user) return <Navigate to="/login" />
    return children
}

const RoutesContainer = () => (
    <Router>
        <Routes>
            <Route
                element={
                    <RequireAuth>
                        <Layout />
                    </RequireAuth>
                }
            >
                <Route path="/" element={<App />} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
)

const AuthContainer = () => (
    <AuthProvider>
        <RoutesContainer />
    </AuthProvider>
)

const UiContainer = () => (
    <ThemeProvider>
        <AuthContainer />
    </ThemeProvider>
)

root.render(
    <React.StrictMode>
        <UiContainer />
    </React.StrictMode>
)
