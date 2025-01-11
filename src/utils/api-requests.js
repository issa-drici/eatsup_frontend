import axios from '@/lib/axios'

// ====== MENU ENDPOINTS ======
/**
 * Récupère tous les menus d'un restaurant
 * @param {string} restaurantId - ID du restaurant
 */
export async function getMenusByRestaurantId(restaurantId) {
    const response = await axios.get(`/api/restaurant/${restaurantId}/menus`)
    return response.data
}

// ====== MENU CATEGORY ENDPOINTS ======
/**
 * Récupère le nombre de catégories d'un menu
 * @param {string} menuId - ID du menu
 */
export async function getMenuCategoriesByMenuIdCount(menuId) {
    const response = await axios.get(`/api/menu/${menuId}/menuCategories/count`)
    return response.data
}

/**
 * Récupère toutes les catégories d'un menu
 * @param {string} menuId - ID du menu
 */
export async function getAllMenuCategoriesByMenuId(menuId) {
    const response = await axios.get(`/api/menu/${menuId}/menuCategories`)
    return response.data
}

/**
 * Crée une nouvelle catégorie dans un menu
 * @param {object} data - Données de la catégorie
 * @param {string} menuId - ID du menu
 */
export async function postCreateMenuCategory(data, menuId) {
    const response = await axios.post(
        `/api/menu/${menuId}/menuCategory/create`,
        data,
    )
    return response.data
}

/**
 * Récupère une catégorie par son ID
 * @param {string} categoryId - ID de la catégorie
 */
export async function getMenuCategoryById(categoryId) {
    const response = await axios.get(`/api/menuCategory/${categoryId}`)
    return response.data
}

// ====== MENU ITEM ENDPOINTS ======
/**
 * Récupère tous les items d'une catégorie
 * @param {string} categoryId - ID de la catégorie
 */
export async function getMenuItemsByMenuCategoryId(categoryId) {
    const response = await axios.get(`/api/menuCategory/${categoryId}/items`)
    return response.data
}

/**
 * Récupère tous les items d'un menu, groupés par nom de catégorie
 * @param {string} menuId - ID du menu
 */
export async function getAllMenuItemsByMenuIdGroupedByCategoryName(menuId) {
    const response = await axios.get(
        `/api/menu/${menuId}/menuItems/groupedByCategoryName`,
    )
    return response.data
}

/**
 * Récupère le nombre d'items dans un menu
 * @param {string} menuId - ID du menu
 */
export async function getMenuItemsByMenuIdCount(menuId) {
    const response = await axios.get(`/api/menu/${menuId}/menuItems/count`)
    return response.data
}

/**
 * Crée un nouvel item dans une catégorie
 * @param {object} data - Données de l'item
 * @param {string} categoryId - ID de la catégorie
 */
export async function postCreateMenuItem(data, categoryId) {
    const response = await axios.post(
        `/api/menuCategory/${categoryId}/item/create`,
        data,
    )
    return response.data
}

// ====== RESTAURANT ENDPOINTS ======
/**
 * Récupère tous les restaurants qui n'ont pas de QRCode lié
 */
export async function getAllRestaurantsWithoutQRCode() {
    const response = await axios.get(`/api/restaurants/without-qr-code`)
    return response.data
}

/**
 * Récupère un restaurant par son ID
 * @param {string} restaurantId - ID du restaurant
 */
export async function getRestaurantById(restaurantId) {
    const response = await axios.get(`/api/restaurant/${restaurantId}`)
    return response.data
}

/**
 * Récupère tous les restaurants avec le nombre de QR codes liés
 */
export async function getAllRestaurantsWithQRCodeCount() {
    const response = await axios.get(`/api/restaurants/with-qr-code-count`)
    return response.data
}

// ====== QR CODE ENDPOINTS ======
/**
 * Associe un qr code à un restaurant
 */
export async function putAssociateQrCode(qrId, data) {
    const response = await axios.put(`/api/associate-qr/qr-code/${qrId}`, data)
    return response.data
}

export async function getQrCodesByRestaurantId(restaurantId) {
    const response = await axios.get(`/api/qr-code/restaurant/${restaurantId}`)
    return response.data
}

export async function getAllRestaurants({ name, page, perPage }) {
    const params = new URLSearchParams()
    if (name) params.append('name', name)
    if (page) params.append('page', page)
    if (perPage) params.append('per_page', perPage)

    const response = await axios.get(`/api/restaurants?${params.toString()}`)
    return response.data
}

/**
 * Récupère un QrCode par son ID
 * @param {string} qrcodeId - ID du QrCode
 */
export async function getQrCodeById(qrcodeId) {
    const response = await axios.get(`/api/qr-code/${qrcodeId}`)
    return response.data
}

export async function deleteMenuItemById(menuItemId) {
    const response = await axios.delete(`/api/menuItem/${menuItemId}/delete`)
    return response.data
}

export async function deleteMenuCategoryById(menuCategoryId) {
    const response = await axios.delete(
        `/api/menuCategory/${menuCategoryId}/delete`,
    )
    return response.data
}

export async function getQrCodeSessionsCountByRestaurantId(restaurantId) {
    const response = await axios.get(
        `/api/restaurant/${restaurantId}/qrCodeSessions/count`,
    )
    return response.data
}

/**
 * Crée une nouvelle session pour un QR code
 * @param {object} data - Données de la session (scanned_at, ip_address, user_agent, location)
 * @param {string} qrCodeId - ID du QR code
 */
export async function postCreateQrCodeSession(data, qrCodeId) {
    const response = await axios.post(
        `/api/qr-code/${qrCodeId}/qrCodeSession/create`,
        data,
    )
    return response.data
}
