import axios from '@/lib/axios'

export const fetchMenusByRestaurantId = async restaurantId => {
    const response = await axios.get(`/api/restaurant/${restaurantId}/menus`)
    return response.data
}
