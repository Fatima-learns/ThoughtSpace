import axios from "axios"
import { useAuthContext } from "../modules/auth/context/AuthContext"

export default function useApi(){

    const authContext = useAuthContext()

    const api = axios.create({
        baseURL: `${import.meta.env.VITE_API_URL}/api`,
        withCredentials: true
    })



    api.interceptors.request.use(config => {

        config.headers.Authorization = `Bearer ${authContext.accessToken}`
        return config
    })


    api.interceptors.response.use(response => response,
        async(error) => {
            if(error.response && error.response.status === 401){
                const res = await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
                    {},
                    { withCredentials: true }
                );
                authContext.setAccessToken(res.data.accessToken)
                error.config.headers.Authorization = `Bearer ${res.data.accessToken}`
                return axios(error.config)
            }
            return Promise.reject(error)
        }

    )

    return api
}


