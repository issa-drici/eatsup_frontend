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

/**
 * Récupère le premier menu d'un restaurant
 * @param {string} restaurantId - ID du restaurant
 */
export async function getFirstMenuByRestaurantId(restaurantId) {
    const response = await axios.get(`/api/public/restaurant/${restaurantId}/menu/first`)
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
 * Met à jour une catégorie
 * @param {object} data - Données de la catégorie
 * @param {string} categoryId - ID de la catégorie
 */
export async function putUpdateMenuCategory(data, categoryId) {
    const response = await axios.put(
        `/api/menuCategory/${categoryId}/update`,
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

/**
 * Met à jour un item
 * @param {object} data - Données de l'item
 * @param {string} categoryId - ID de la catégorie
 */
export async function putMenuCategoryMoveUp(data, categoryId) {
    const response = await axios.put(
        `/api/menuCategory/${categoryId}/moveUp`,
        data,
    )
    return response.data
}

/**
 * Met à jour un item
 * @param {object} data - Données de l'item
 * @param {string} categoryId - ID de la catégorie
 */
export async function putMenuCategoryMoveDown(data, categoryId) {
    const response = await axios.put(
        `/api/menuCategory/${categoryId}/moveDown`,
        data,
    )
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
 * @param {FormData} data - Données de l'item
 * @param {string} categoryId - ID de la catégorie
 */
export async function postCreateMenuItem(data, categoryId) {
    const response = await axios.post(
        `/api/menuCategory/${categoryId}/item/create`,
        data,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        },
    )
    return response.data
}

/**
 * Met à jour un item
 * @param {FormData} data - Données de l'item
 * @param {string} itemId - ID de l'item
 */
export async function postUpdateMenuItem(data, itemId) {
    const response = await axios.post(`/api/menuItem/${itemId}/update`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    return response.data
}

/**
 * Met à jour un item
 * @param {object} data - Données de l'item
 * @param {string} itemId - ID de l'item
 */
export async function putMenuItemMoveUp(data, itemId) {
    const response = await axios.put(`/api/menuItem/${itemId}/moveUp`, data)
    return response.data
}

/**
 * Met à jour un item
 * @param {object} data - Données de l'item
 * @param {string} itemId - ID de l'item
 */
export async function putMenuItemMoveDown(data, itemId) {
    const response = await axios.put(`/api/menuItem/${itemId}/moveDown`, data)
    return response.data
}

/**
 * Récupère un item par son ID
 * @param {string} itemId - ID de la catégorie
 */
export async function getMenuItemById(itemId) {
    const response = await axios.get(`/api/menuItem/${itemId}`)
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

/**
 * Récupère le site web d'un restaurant par son ID
 * @param {string} restaurantId - ID du restaurant
 */
export async function getWebsiteByRestaurantId(restaurantId) {
    const response = await axios.get(`/api/restaurant/${restaurantId}/website`)
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

/**
 * Met à jour un restaurant
 * @param {FormData} data - Données du restaurant (incluant le logo)
 * @param {string} restaurantId - ID du restaurant
 */
export async function postUpdateRestaurant(data, restaurantId) {
    const response = await axios.post(
        `/api/restaurant/${restaurantId}/update`,
        data,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        },
    )
    return response.data
}

/**
 * Récupère un menu par son ID
 * @param {string} menuId - ID du menu
 */
export async function getMenuById(menuId) {
    const response = await axios.get(`/api/menu/${menuId}`)
    return response.data
}

/**
 * Met à jour le site web d'un restaurant
 * @param {FormData} data - Données du site web
 * @param {string} restaurantId - ID du restaurant
 */
export async function postUpdateWebsite(data, restaurantId) {
    const response = await axios.post(
        `/api/restaurant/${restaurantId}/website/update`,
        data,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        },
    )
    return response.data
}

/**
 * Récupère le site web public d'un restaurant
 * @param {string} restaurantId - ID du restaurant
 */
export async function getPublicWebsiteByRestaurantId(restaurantId) {
    const response = await axios.get(`/api/public/restaurant/${restaurantId}/website`)
    return response.data
}

/**
 * Récupère le site web public d'un restaurant par ses slugs
 * @param {string} typeSlug - Slug du type de restaurant
 * @param {string} citySlug - Slug de la ville
 * @param {string} nameSlug - Slug du nom du restaurant
 */
export async function getPublicWebsiteBySlug(typeSlug, citySlug, nameSlug) {
    const response = await axios.get(
        `/api/public/type/${typeSlug}/ville/${citySlug}/name/${nameSlug}/website`
    )
    return response.data
}

// ====== SUBSCRIPTION ENDPOINTS ======

/**
 * Récupère les plans d'abonnement disponibles
 */
export async function getSubscriptionPlans() {
    const response = await axios.get('/api/subscription/plans')
    return response.data
}

/**
 * Crée un nouvel abonnement
 * @param {string} priceId - ID du prix Stripe
 * @param {string} paymentMethodId - ID de la méthode de paiement Stripe
 */
export async function subscribe(priceId, paymentMethodId) {
    const response = await axios.post('/api/subscribe', {
        price_id: priceId,
        payment_method_id: paymentMethodId
    })
    return response.data
}

export async function postUpdateMenu(data, menuId, restaurantId) {
    const response = await axios.post(
        `/api/restaurant/${restaurantId}/menu/${menuId}/update`,
        data,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        },
    )
    return response.data
}


/**
 * Crée une nouvelle session pour un site web
 * @param {object} data - Données de la session (scanned_at, ip_address, user_agent, location)
 * @param {string} websiteId - ID du site web
 */
export async function postCreateWebsiteSession(data, websiteId) {
    const response = await axios.post(
        `/api/website/${websiteId}/websiteSession/create`,
        data,
    )
    return response.data
}

export async function getWebsiteSessionsCountByRestaurantId(restaurantId) {
    const response = await axios.get(
        `/api/restaurant/${restaurantId}/websiteSessions/count`,
    )
    return response.data
}

/**
 * Récupère les informations du menu pour la page d'accueil
 * @param {string} restaurantId - ID du restaurant
 */
export async function getMenuInfosHomeByRestaurantId(restaurantId) {
    const response = await axios.get(
        `/api/restaurant/${restaurantId}/menu-infos-home`,
    )
    return response.data
}
