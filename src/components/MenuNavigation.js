'use client'

import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/shadcn-components/ui/button'
import {
    ChefHat,
    FolderOpen,
    Plus,
    Settings,
    Eye,
    Home
} from 'lucide-react'
import { useFindMenuById } from '@/services/menu/useFindMenuById'
import { useCountMenuCategoriesByMenuId } from '@/services/menu-category/useCountMenuCategoriesByMenuId'
import { useCountMenuItemsByMenuId } from '@/services/menu-item/useCountMenuItemByMenuId'

const MenuNavigation = () => {
    const { restaurantId, menuId } = useParams()
    const pathname = usePathname()

    const { data: menu } = useFindMenuById(menuId)
    const { data: categoriesCount } = useCountMenuCategoriesByMenuId(menuId)
    const { data: itemsCount } = useCountMenuItemsByMenuId(menuId)

    const isMenuPage = pathname === `/admin/restaurant/${restaurantId}/menu/${menuId}`
    const isCategoriesPage = pathname.includes('/categories') && !pathname.includes('/category/')
    const isItemsPage = pathname.includes('/items')
    const isCategoryPage = pathname.includes('/category/') && !pathname.includes('/item/')
    const isItemPage = pathname.includes('/item/')

    const getCurrentSection = () => {
        if (isMenuPage) return 'Vue d\'ensemble'
        if (isCategoriesPage) return 'Catégories'
        if (isItemsPage) return 'Tous les articles'
        if (isCategoryPage) return 'Articles de la catégorie'
        if (isItemPage) return 'Modifier l\'article'
        return 'Menu'
    }

    return (
        <div className="bg-white border-b border-gray-100 sticky top-16 z-10">
            <div className="max-w-5xl mx-auto px-4">
                {/* Navigation principale */}
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/dashboard">
                            <Button variant="ghost" size="sm" className="gap-2">
                                <Home size={16} />
                                Accueil
                            </Button>
                        </Link>

                        <div className="flex items-center gap-2 text-muted-foreground">
                            <ChefHat size={16} />
                            <span className="text-sm">Menu</span>
                        </div>

                        {menu && (
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">
                                    {typeof menu.name === 'object' ? menu.name.fr || menu.name.en || 'Menu' : menu.name}
                                </span>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span>{categoriesCount?.count || 0} catégories</span>
                                    <span>{itemsCount?.count || 0} articles</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <Link href={`/admin/restaurant/${restaurantId}/menu/${menuId}`}>
                            <Button variant="ghost" size="sm" className="gap-2">
                                <Eye size={16} />
                                Aperçu
                            </Button>
                        </Link>
                        <Button variant="ghost" size="sm" className="gap-2">
                            <Settings size={16} />
                            Paramètres
                        </Button>
                    </div>
                </div>

                {/* Navigation contextuelle */}
                <div className="flex items-center gap-1 pb-4">
                    <Link href={`/admin/restaurant/${restaurantId}/menu/${menuId}`}>
                        <Button
                            variant={isMenuPage ? "default" : "ghost"}
                            size="sm"
                            className="gap-2"
                        >
                            <ChefHat size={16} />
                            Vue d'ensemble
                        </Button>
                    </Link>

                    <Link href={`/admin/restaurant/${restaurantId}/menu/${menuId}/categories`}>
                        <Button
                            variant={isCategoriesPage ? "default" : "ghost"}
                            size="sm"
                            className="gap-2"
                        >
                            <FolderOpen size={16} />
                            Catégories
                        </Button>
                    </Link>

                    <Link href={`/admin/restaurant/${restaurantId}/menu/${menuId}/items`}>
                        <Button
                            variant={isItemsPage ? "default" : "ghost"}
                            size="sm"
                            className="gap-2"
                        >
                            <Plus size={16} />
                            Tous les articles
                        </Button>
                    </Link>
                </div>

                {/* Indicateur de section actuelle */}
                <div className="pb-2">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {getCurrentSection()}
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default MenuNavigation
