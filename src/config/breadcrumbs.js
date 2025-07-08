export const breadcrumbsConfig = {
  '/admin/dashboard': [
    { label: 'Accueil', href: '/admin/dashboard' },
  ],
  '/admin/restaurant/[restaurantId]/menu/[menuId]': [
    { label: 'Accueil', href: '/admin/dashboard' },
    { label: 'Gérer le menu', href: null },
  ],
  '/admin/restaurant/[restaurantId]/menu/[menuId]/categories': [
    { label: 'Accueil', href: '/admin/dashboard' },
    { label: 'Gérer le menu', href: '/admin/restaurant/[restaurantId]/menu/[menuId]' },
    { label: 'Gérer les catégories', href: null },
  ],
  '/admin/restaurant/[id]/update': [
    { label: 'Accueil', href: '/admin/dashboard' },
    { label: 'Mes infos resto', href: null },
  ],
  '/admin/qr-code': [
    { label: 'Accueil', href: '/admin/dashboard' },
    { label: 'QR Code', href: null },
  ],
  // Ajoute d'autres routes ici selon tes besoins
}
