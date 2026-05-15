
import axios from 'axios'

const baseUrl='http://127.0.0.1:8000/'
const AxiosInstance =axios.create({
    baseURL:baseUrl,
    timeout:10000,
    headers:{
        "Content-Type":"application/json",
        accept:"application/json"

    }
})
 
// ✅ THIS IS THE FIX — add trailing slash to every request automatically
AxiosInstance.interceptors.request.use((config) => {
    if (config.url && !config.url.endsWith('/')) {
        config.url += '/'
    }
    return config
})

export default AxiosInstance
