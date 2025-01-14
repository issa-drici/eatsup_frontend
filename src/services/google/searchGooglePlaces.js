import axios from 'axios'

export const searchGooglePlaces = async (query) => {
    try {
        const response = await axios.get(`/api/google/places/search`, {
            params: {
                query
            }
        })
        return response.data
    } catch (error) {
        console.error('Erreur lors de la recherche Google Places:', error)
        throw error
    }
} 