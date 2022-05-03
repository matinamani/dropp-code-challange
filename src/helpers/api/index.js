import axios from 'axios'

export default axios.create({
    baseURL: 'https://reqres.in/api',
})

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
