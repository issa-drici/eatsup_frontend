import axios from '@/lib/axios'

export async function getMenusByRestaurantId(restaurantId) {
    const response = await axios.get(`/api/restaurant/${restaurantId}/menus`)
    return response.data
}

export async function getMenuCategoriesByMenuIdCount(menuId) {
    const response = await axios.get(`/api/menu/${menuId}/menuCategories/count`)
    return response.data
}

export async function getMenuItemsByMenuIdCount(menuId) {
    const response = await axios.get(`/api/menu/${menuId}/menuItems/count`)
    return response.data
}
