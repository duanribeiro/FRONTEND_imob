import axios from "axios"
import { get_access_token, get_refresh_token } from "./auth"

const api = axios.create({
  baseURL: "http://127.0.0.1:3000"
})

// Envio do token JWT em todas as requisições
api.interceptors.request.use(async originalReq => {
  const access_token = get_access_token()

  if (access_token) {
    originalReq.headers['Authorization'] = `Bearer ${access_token}`
  }
  return originalReq
})

// Atualização automática após expirar o token JWT
api.interceptors.response.use(response => {
  return response;
}, err => {
  return new Promise((resolve, reject) => {
      const originalReq = err.config
      if ( err.response.status === 401 && err.config && !err.config.__isRetryRequest )
      {
          originalReq._retry = true
          const refresh_token = get_refresh_token()
          // const access_token = get_access_token()
          let res = fetch(`${process.env.REACT_APP_BACKEND_API}/auth/refresh`, {
              method: 'POST',
              mode: 'cors',
              cache: 'no-cache',
              credentials: 'same-origin',
              headers: {
                  'Content-Type': 'application/json',
                  'Device': 'device',
                  'Authorization': `Bearer ${refresh_token}`
              },
              redirect: 'follow',
              referrer: 'no-referrer',
              body: JSON.stringify({
                'Authorization': `Bearer ${refresh_token}`
              }),
          }).then(res => res.json()).then(res => {
              originalReq.headers['Authorization'] = `Bearer ${res.access_token}`
              return axios(originalReq)
          })
          resolve(res)
      }

      return Promise.reject(err)
  })
})

export default api