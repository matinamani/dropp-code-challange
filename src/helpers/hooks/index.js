import { useState } from 'react'

export const useLocalStorage = (name, initialValue = undefined) => {
    const [value, setVal] = useState(() => {
        let val = localStorage.getItem(name)
        if (val === 'undefined') val = undefined
        return JSON.parse(val) || initialValue
    })

    const setValue = (val) => {
        setVal(val)
        localStorage.setItem(name, JSON.stringify(val))
    }

    return [value, setValue]
}

export const useInput = (initialValue = '') => {
    const [value, setValue] = useState(initialValue)
    const onChange = ({ target }) => setValue(target.value)
    const clearInput = () => setValue('')

    return { value, onChange, clearInput }
}
