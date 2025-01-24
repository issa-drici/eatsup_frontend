'use client'

import { useParams } from 'next/navigation'
import { Skeleton } from '@/shadcn-components/ui/skeleton'
import { BreadcrumbCustom } from '@/components/BreadcrumbCustom'
import { Button } from '@/shadcn-components/ui/button'
import { useFindAllMenuItemsByMenuCategoryId } from '@/services/menu-item/useFindAllMenuItemsByMenuCategoryId'
import { useFindMenuCategoryById } from '@/services/menu-category/useFindMenuCategoryById'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import MenuItem from '@/components/MenuItem'
import { useQueryClient } from '@tanstack/react-query'

const Category = () => {
    const { restaurantId, menuId, categoryId } = useParams()
    const queryClient = useQueryClient()
    const {
        data: menuCategory,
        isLoading: isLoadingMenuCategory,
        isFetching: isFetchingMenuCategory,
    } = useFindMenuCategoryById(categoryId)

    const {
        data: menuItems,
        isLoading: isLoadingMenuItems,
        isFetching: isFetchingMenuItems,
    } = useFindAllMenuItemsByMenuCategoryId(categoryId)

    const handleCallbackSuccess = () => {
        queryClient.invalidateQueries(['menuItems', categoryId])
    }

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                {!isLoadingMenuCategory || !isFetchingMenuCategory ? (
                    <BreadcrumbCustom
                        items={[
                            {
                                title: 'Dashboard',
                                href: '/admin/dashboard',
                            },
                            {
                                title: 'Menu',
                                href: `/admin/restaurant/${restaurantId}/menu/${menuId}`,
                            },
                            {
                                title: 'Catégories',
                                href: `/admin/restaurant/${restaurantId}/menu/${menuId}/categories`,
                            },
                            {
                                title: menuCategory?.name?.fr,
                                href: `/admin/restaurant/${restaurantId}/menu/${menuId}/categories`,
                            },
                        ]}
                    />
                ) : null}
                <Link href={`/admin/restaurant/${restaurantId}/menu/${menuId}/category/${categoryId}/item/create`}>
                    <Button>
                        <Plus /> Nouveau
                    </Button>
                </Link>
            </div>

            <div className="flex flex-col flex-wrap gap-4">
                {isLoadingMenuItems || isFetchingMenuItems ? (
                    <>
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                    </>
                ) : (
                    menuItems?.map(item => (
                        <MenuItem
                            key={item.id}
                            item={item}
                            category={item.category_id}
                            menuId={menuId}
                            restaurantId={restaurantId}
                            handleCallbackSuccess={handleCallbackSuccess}
                        />
                    ))
                )}
            </div>
        </>
    )
}

export default Category
