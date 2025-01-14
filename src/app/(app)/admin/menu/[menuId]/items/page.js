'use client'

import { useParams } from 'next/navigation'
import CardStats from '@/components/CardStats'
import { Skeleton } from '@/shadcn-components/ui/skeleton'
import { TableProperties } from 'lucide-react'
import { BreadcrumbCustom } from '@/components/BreadcrumbCustom'
import { useCountMenuCategoriesByMenuId } from '@/services/menu-category/useCountMenuCategoriesByMenuId'
import { useFindAllMenuItemsByMenuIdGroupedByCategoryName } from '@/services/menu-item/useFindAllMenuItemsByMenuIdGroupedByCategoryName'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { CookingPot } from 'lucide-react'
import { useCountMenuItemsByMenuId } from '@/services/menu-item/useCountMenuItemByMenuId'
import { useQueryClient } from '@tanstack/react-query'
import MenuItem from '@/components/MenuItem'

const Categories = () => {
    const { menuId } = useParams()
    const queryClient = useQueryClient()

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

    const {
        data: menuItems,
        isLoading: isLoadingMenuItems,
        isFetching: isFetchingMenuItems,
    } = useFindAllMenuItemsByMenuIdGroupedByCategoryName(menuId)

    const handleCallbackSuccess = async () => {
        await queryClient.invalidateQueries(['menuItems', menuId])
    }

    return (
        <>
            <div className="mb-4">
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
                        {
                            title: 'Éléments',
                            href: `/admin/menu/${menuId}/items`,
                        },
                    ]}
                />
            </div>
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
                            title="Éléments"
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
                {isLoadingMenuItems || isFetchingMenuItems ? (
                    <>
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                    </>
                ) : (
                    menuItems?.map(({ category, items }) => (
                        <div key={category.id} className="flex flex-col gap-4">
                            <div className="flex items-center gap-5 font-medium">
                                {category.name?.fr}
                            </div>
                            <div className="flex flex-col gap-2">
                                {items.map(item => (
                                    <MenuItem
                                        key={item.id}
                                        item={item}
                                        category={category}
                                        itemsLength={items.length}
                                        menuId={menuId}
                                        handleCallbackSuccess={handleCallbackSuccess}
                                    />
                                ))}

                                <Link
                                    href={`/admin/category/${category.id}/item/create`}
                                    className="w-full"
                                    asChild>
                                    <div className="h-fit border border-dashed bg-slate-50 hover:bg-slate-100 border-slate-200 rounded-md p-3 flex flex-col gap-3 cursor-pointer w-full">
                                        <div className="flex flex-row gap-1 items-center">
                                            <Plus width={15} />
                                            <p className="text-sm text-slate-900 font-normal">
                                                Ajouter un élément ici
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}

export default Categories
