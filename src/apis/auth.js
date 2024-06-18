import api from 'axios'

export const login =(email,password)=> api.post(`http://localhost:8080/login?email=${email}&password=${password}`)

