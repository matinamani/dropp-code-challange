import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import App from './App'
import ThemeProvider from './contexts/ThemeContext'
import Layout from './components/Layout'
// import Login from './pages/Login'
import LoginCard from './components/sections/LoginCard'

const root = ReactDOM.createRoot(document.getElementById('root'))

const RequireAuth = () => {
    // TODO:
}

const RoutesContainer = () => (
    <Router>
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<App />} />
            </Route>
            <Route path="/login" element={<LoginCard />} />
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
