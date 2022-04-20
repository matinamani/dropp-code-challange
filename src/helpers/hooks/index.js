import { useState } from 'react'

export const useLocalStorage = (name, initialValue = undefined) => {
    const [value, setVal] = useState(localStorage.getItem(name) || initialValue)

    const setValue = (val) => {
        setVal(val)
        localStorage.setItem(name, val)
    }

    return [value, setValue]
}
