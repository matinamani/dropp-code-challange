import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import ThemeProvider from './contexts/ThemeContext'

const root = ReactDOM.createRoot(document.getElementById('root'))

const UiContainer = () => (
    <ThemeProvider>
        <App />
    </ThemeProvider>
)

root.render(
    <React.StrictMode>
        <UiContainer />
    </React.StrictMode>
)
