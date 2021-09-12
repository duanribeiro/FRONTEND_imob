import axios from "axios"
import { getToken } from "./auth"

const api = axios.create({
  baseURL: "http://127.0.0.1:3000"
})

// Envio do token JWT em todas as requisições
api.interceptors.request.use(async originalReq => {
  const token = getToken()

  if (token) {
    originalReq.headers['Authorization'] = `Bearer ${token}`
  }
  return originalReq
})

// Atualização automática após expirar o token JWT
// api.interceptors.response.use(response => {
//   return response;
// }, err => {
//   return new Promise((resolve, reject) => {
//       const originalReq = err.config
//       if ( err.response.status === 401 && err.config && !err.config.__isRetryRequest )
//       {
//           originalReq._retry = true

//           let res = fetch('http://localhost:5000/auth/refresh', {
//               method: 'POST',
//               mode: 'cors',
//               cache: 'no-cache',
//               credentials: 'same-origin',
//               headers: {
//                   'Content-Type': 'application/json',
//                   'Device': 'device',
//                   'Token': localStorage.getItem("TOKEN_KEY")
//               },
//               redirect: 'follow',
//               referrer: 'no-referrer',
//               // body: JSON.stringify({
//               //     token: localStorage.getItem("TOKEN_KEY"),
//               //     refresh_token: localStorage.getItem("refresh_token")
//               // }),
//           }).then(res => res.json()).then(res => {
//               console.log(res)
//               originalReq.headers['Authorization'] = `Bearer ${res.token}`

//               return axios(originalReq)
//           })
//           resolve(res)
//       }

//       return Promise.reject(err)
//   })
// })

export default api