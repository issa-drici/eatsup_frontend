import Axios from 'axios'

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
    },
    withCredentials: true,
    withXSRFToken: true,
})

// Add an interceptor to redirect to the login page if the server responds with a 401 (unauthorized)
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            if (
                typeof window !== 'undefined' &&
                window.location.pathname !== '/login'
            ) {
                // We're on the client side
                // It's important to check that we're not on the login page, otherwise we'll end up in an infinite loop
                // The server side redirects should be handled by a ServerSideRequestsManager class
                window.location.href = '/login?expired_session'
            }
        }
        return Promise.reject(error)
    },
)

export default axios
