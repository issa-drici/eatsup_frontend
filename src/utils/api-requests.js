import axios from '@/lib/axios'

export async function getMenusByRestaurantId(restaurantId) {
    const response = await axios.get(`/api/restaurant/${restaurantId}/menus`)
    return response.data
}

export async function getMenuCategoriesByMenuIdCount(menuId) {
    const response = await axios.get(`/api/menu/${menuId}/menuCategories/count`)
    return response.data
}

export async function getAllMenuCategoriesByMenuId(menuId) {
    const response = await axios.get(`/api/menu/${menuId}/menuCategories`)
    return response.data
}

export async function getMenuCategoryById(categoryId) {
    const response = await axios.get(`/api/menuCategory/${categoryId}`)
    return response.data
}

export async function getMenuItemsByMenuCategoryId(categoryId) {
    const response = await axios.get(`/api/menuCategory/${categoryId}/items`)
    return response.data
}

export async function getMenuItemsByMenuIdCount(menuId) {
    const response = await axios.get(`/api/menu/${menuId}/menuItems/count`)
    return response.data
}
