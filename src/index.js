import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { useLocalStorage } from './helpers/hooks'

import App from './App'
import ThemeProvider from './contexts/ThemeContext'
import Layout from './components/Layout'
import Login from './pages/Login'

const root = ReactDOM.createRoot(document.getElementById('root'))

const RequireAuth = ({ children }) => {
    const [data] = useLocalStorage('user')
    console.log(data)

    return <>{children}</>
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

const UiContainer = () => (
    <ThemeProvider>
        <RoutesContainer />
    </ThemeProvider>
)

root.render(
    <React.StrictMode>
        <UiContainer />
    </React.StrictMode>
)
