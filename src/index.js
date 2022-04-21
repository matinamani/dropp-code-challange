import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import App from './App'
import ThemeProvider from './contexts/ThemeContext'
import Layout from './components/Layout'
import Login from './pages/Login'

const root = ReactDOM.createRoot(document.getElementById('root'))

const UiContainer = () => (
    <ThemeProvider>
        {/* <Layout>
            <App />
        </Layout> */}
        <Login />
    </ThemeProvider>
)

root.render(
    <React.StrictMode>
        <UiContainer />
    </React.StrictMode>
)
