'use client'

import { useParams } from 'next/navigation'

import { Skeleton } from '@/shadcn-components/ui/skeleton'

import { Plus } from 'lucide-react'
import { BreadcrumbCustom } from '@/components/BreadcrumbCustom'
import { Button } from '@/shadcn-components/ui/button'
import { useFindAllMenuCategoriesByMenuId } from '@/services/menu-category/useFindAllMenuCategoriesByMenuId'
import Link from 'next/link'
import MenuCategory from '@/components/MenuCategory'
import { useQueryClient } from '@tanstack/react-query'

const Categories = () => {
    const { menuId } = useParams()
    const queryClient = useQueryClient()

    const {
        data: menuCategories,
        isLoading: isLoadingMenuCategories,
        isFetching: isFetchingMenuCategories,
    } = useFindAllMenuCategoriesByMenuId(menuId)

    const handleCallbackSuccess = async () => {
        await queryClient.invalidateQueries(['menuCategories', menuId])
    }

    return (
        <>
            <div className="flex justify-between items-center mb-4">
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
                            title: 'Catégories',
                            href: `/admin/menu/${menuId}/categories`,
                        },
                    ]}
                />
                <Link href={`/admin/menu/${menuId}/category/create`}>
                    <Button>
                        <Plus /> Nouveau
                    </Button>
                </Link>
            </div>
            <div className="flex flex-col flex-wrap gap-4">
                {/* <div className="flex gap-4">
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
                </div> */}
                {isLoadingMenuCategories || isFetchingMenuCategories ? (
                    <>
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                    </>
                ) : (
                    menuCategories?.map(category => (
                        <MenuCategory
                            key={category.id}
                            category={category}
                            menuId={menuId}
                            handleCallbackSuccess={handleCallbackSuccess}
                        />
                    ))
                )}
            </div>
        </>
    )
}

export default Categories
