const TOKEN_KEY = "L9ThxnotKPzthJ7hu3bnORuT6xI="
const TOKEN_KEY_2 = "asasasssdfafaf="
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null
export const get_access_token = () => localStorage.getItem(TOKEN_KEY)
export const get_refresh_token = () => localStorage.getItem(TOKEN_KEY_2)
export const save_access_token = access_token => localStorage.setItem(TOKEN_KEY, access_token)
export const save_refresh_token = refresh_token => localStorage.setItem(TOKEN_KEY_2, refresh_token)
export const logout = () =>  localStorage.removeItem(TOKEN_KEY)