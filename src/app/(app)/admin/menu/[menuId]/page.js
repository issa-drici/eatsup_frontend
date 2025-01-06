'use client'

import { useParams } from 'next/navigation'
import CardStats from '@/components/CardStats'

import { Skeleton } from '@/shadcn-components/ui/skeleton'

import { PaintRoller, TableProperties } from 'lucide-react'
import { CookingPot } from 'lucide-react'
import CardButton from '@/components/CardButton'
import { BreadcrumbCustom } from '@/components/BreadcrumbCustom'
import { useCountMenuCategoriesByMenuId } from '@/services/menu-category/useCountMenuCategoriesByMenuId'
import { useCountMenuItemsByMenuId } from '@/services/menu-item/useCountMenuItemByMenuId'

const Menu = () => {
    const { menuId } = useParams()

    const {
        data: menuCategoriesCount,
        isLoading: isLoadingMenuCategoriesCount,
        isFetching: isFetchingMenuCategoriesCount,
    } = useCountMenuCategoriesByMenuId(menuId)

    const {
        data: menuItemsCount,
        isLoading: isLoadingMenuItemsCount,
        isFetching: isFetchingMenuItemsCount,
    } = useCountMenuItemsByMenuId(menuId)

    return (
        <>
            <BreadcrumbCustom
                items={[
                    {
                        title: 'Dashboard',
                        href: '/admin/dashboard',
                    },
                    {
                        title: 'Menu',
                        href: `/admin/menu/${menuId}`,
                    },
                ]}
            />
            <div className="flex flex-col flex-wrap gap-4">
                <div className="flex gap-4">
                    {isLoadingMenuCategoriesCount ||
                    isFetchingMenuCategoriesCount ? (
                        <Skeleton className="h-20 w-full" />
                    ) : (
                        <CardStats
                            title="Catégories"
                            progression="30 derniers jours"
                            value={menuCategoriesCount?.count}
                            icon={
                                <TableProperties
                                    size={16}
                                    className="text-slate-400"
                                />
                            }
                        />
                    )}
                    {isLoadingMenuItemsCount || isFetchingMenuItemsCount ? (
                        <Skeleton className="h-20 w-full" />
                    ) : (
                        <CardStats
                            title="Élements"
                            value={menuItemsCount?.count}
                            icon={
                                <CookingPot
                                    size={16}
                                    className="text-slate-400"
                                />
                            }
                        />
                    )}
                </div>
                <CardButton
                    title="Catégories"
                    subtitle="Gérer les catégories du menu"
                    url={`/admin/menu/${menuId}/categories`}
                    icon={
                        <TableProperties size={16} className="text-slate-900" />
                    }
                />
                <CardButton
                    title="Élements"
                    subtitle="Gérer les élements du menu"
                    url={`/admin/menu/${menuId}/items`}
                    icon={<CookingPot size={16} className="text-slate-900" />}
                />
                <CardButton
                    title="Apparence"
                    subtitle="Changer l'apparence du menu"
                    url={`/admin/menu/${menuId}/appearance`}
                    icon={<PaintRoller size={16} className="text-slate-900" />}
                />
            </div>
        </>
    )
}

export default Menu
