import axios from 'axios'

export const searchGooglePlaces = async query => {
    const response = await axios.get(`/api/google/places/search`, {
        params: {
            query,
        },
    })
    return response.data
}
