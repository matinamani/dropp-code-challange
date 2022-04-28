import { createContext, useContext } from 'react'

import { useLocalStorage } from '../helpers/hooks'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('user', undefined)

    const login = (data) => setUser(data)
    const logout = () => setUser(undefined)

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
export default AuthProvider
