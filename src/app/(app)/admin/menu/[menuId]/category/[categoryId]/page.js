'use client'

import { useParams } from 'next/navigation'

import { Skeleton } from '@/shadcn-components/ui/skeleton'

import { EllipsisVertical, Pen, Trash } from 'lucide-react'
import CardButton from '@/components/CardButton'
import { BreadcrumbCustom } from '@/components/BreadcrumbCustom'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItems,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/shadcn-components/ui/dropdown-menu'
import { Button } from '@/shadcn-components/ui/button'
import { useFindAllMenuItemsByMenuCategoryId } from '@/services/menu-item/useFindAllMenuItemsByMenuCategoryId'
import { useFindMenuCategoryById } from '@/services/menu-category/useFindMenuCategoryById'

const Category = () => {
    const { menuId, categoryId } = useParams()

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

    return (
        <>
            {!isLoadingMenuCategory || !isFetchingMenuCategory ? (
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
                        {
                            title: menuCategory?.name?.fr,
                            href: `/admin/menu/${menuId}/categories`,
                        },
                    ]}
                />
            ) : null}

            <div className="flex flex-col flex-wrap gap-4">
                {isLoadingMenuItems || isFetchingMenuItems ? (
                    <>
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                    </>
                ) : (
                    menuItems?.map(category => (
                        <div
                            key={category.id}
                            className="flex items-center gap-5">
                            <CardButton
                                title={category.name?.fr}
                                url={`/admin/menu/${menuId}/category/${category.id}`}
                                widthFull
                            />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="shadow-md border bg-white hover:shadow-inner hover:bg-white border-slate-200">
                                        <EllipsisVertical />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItems>
                                        Modifier
                                        <DropdownMenuShortcut>
                                            <Pen width={10} />
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItems>
                                    <DropdownMenuItems>
                                        Supprimer
                                        <DropdownMenuShortcut>
                                            <Trash width={10} />
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItems>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}

export default Category
